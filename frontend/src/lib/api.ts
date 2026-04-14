/**
 * API client for Wants Frontend
 * Connects to Wants Backend with enhanced error handling, interceptors, and token refresh
 */

// Import Recipe type for proper typing
import type { Recipe } from '../hooks/useRecipes';

// API Configuration
export const API_BASE_URL = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:3001';
export const API_VERSION = '/api/v1';
export const API_URL = `${API_BASE_URL}${API_VERSION}`;

// Token storage keys - matches fluxez pattern
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// API Error types
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
}

export class ApiErrorResponse extends Error {
  public statusCode: number;
  public code?: string;
  public details?: any;

  constructor(message: string, statusCode: number, code?: string, details?: any) {
    super(message);
    this.name = 'ApiErrorResponse';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing: boolean = false;
  private failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
  }> = [];

  constructor() {
    // Load tokens from localStorage on initialization
    this.initializeTokens();
  }

  // Initialize or reinitialize tokens from localStorage
  initializeTokens() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      this.refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    }
  }

  // Enhanced Token management
  setTokens(accessToken: string | null, refreshToken?: string | null) {
    this.accessToken = accessToken;
    if (refreshToken !== undefined) {
      this.refreshToken = refreshToken;
    }

    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    if (refreshToken !== undefined) {
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      } else {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    }
  }

  // Legacy method for backward compatibility
  setToken(token: string | null) {
    this.setTokens(token);
  }

  getToken(): string | null {
    // Check localStorage as fallback like appatonce does
    return this.accessToken || localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    // Check localStorage as fallback
    return this.refreshToken || localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  // Token refresh logic
  private async refreshAccessToken(): Promise<string> {
    const currentRefreshToken = this.getRefreshToken();
    if (!currentRefreshToken) {
      throw new ApiErrorResponse('No refresh token available', 401, 'NO_REFRESH_TOKEN');
    }

    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
      });

      if (!response.ok) {
        throw new ApiErrorResponse('Token refresh failed', response.status, 'REFRESH_FAILED');
      }

      const data = await response.json();
      const { accessToken, refreshToken: newRefreshToken } = data;

      this.setTokens(accessToken, newRefreshToken);
      return accessToken;
    } catch (error) {
      // Clear tokens on refresh failure
      this.setTokens(null, null);
      throw error;
    }
  }

  // Process failed queue after token refresh
  private processQueue(error: any = null, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else if (token) {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  // Enhanced request method with interceptors and retry logic
  async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${API_URL}${endpoint}`;
    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    // Only set Content-Type for non-FormData requests
    // FormData needs browser to set boundary automatically
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }

    // Add authorization header if token exists
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'include',
        headers,
      });

      // Handle different response types
      if (response.status === 204) {
        return null; // No content
      }

      // Handle 401 Unauthorized - attempt token refresh
      if (response.status === 401 && this.getToken() && endpoint !== '/auth/refresh') {
        return this.handleUnauthorized(endpoint, options);
      }

      // Handle other error responses
      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new ApiErrorResponse(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          errorData.code,
          errorData.details,
        );
      }

      // Parse successful response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      if (error instanceof ApiErrorResponse) {
        throw error;
      }

      // Handle network errors
      throw new ApiErrorResponse(
        error instanceof Error ? error.message : 'Network request failed',
        0,
        'NETWORK_ERROR',
      );
    }
  }

  // Handle unauthorized responses with token refresh
  private async handleUnauthorized(endpoint: string, options: RequestInit) {
    if (this.isRefreshing) {
      // If refresh is in progress, queue this request
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      }).then((token) => {
        return this.request(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      });
    }

    this.isRefreshing = true;

    try {
      const newToken = await this.refreshAccessToken();
      this.processQueue(null, newToken);

      // Retry the original request with new token
      return this.request(endpoint, options);
    } catch (refreshError) {
      this.processQueue(refreshError, null);
      throw refreshError;
    } finally {
      this.isRefreshing = false;
    }
  }

  // Parse error response with better error handling
  private async parseErrorResponse(response: Response): Promise<ApiError> {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        const text = await response.text();
        return { message: text || 'Request failed' };
      }
    } catch {
      return { message: 'Failed to parse error response' };
    }
  }

  // HTTP method convenience functions
  async get(endpoint: string, options: RequestInit = {}): Promise<any> {
    return this.request(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  async post(endpoint: string, body?: any, options: RequestInit = {}): Promise<any> {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  async put(endpoint: string, body?: any, options: RequestInit = {}): Promise<any> {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  async patch(endpoint: string, body?: any, options: RequestInit = {}): Promise<any> {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  async delete(endpoint: string, options: RequestInit = {}): Promise<any> {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }

  // Special method for blob responses (downloads, PDFs, etc.)
  async blob(endpoint: string, options: RequestInit = {}): Promise<Blob> {
    const url = `${API_URL}${endpoint}`;
    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    // Add authorization header if token exists
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'include',
        headers,
      });

      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new ApiErrorResponse(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          errorData.code,
          errorData.details,
        );
      }

      return await response.blob();
    } catch (error) {
      if (error instanceof ApiErrorResponse) {
        throw error;
      }

      throw new ApiErrorResponse(
        error instanceof Error ? error.message : 'Network request failed',
        0,
        'NETWORK_ERROR',
      );
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Handle both new token structure and legacy
    // Backend returns access_token (underscore), not accessToken (camelCase)
    if (response.access_token) {
      this.setTokens(response.access_token, response.refresh_token);
    } else if (response.accessToken && response.refreshToken) {
      this.setTokens(response.accessToken, response.refreshToken);
    } else if (response.token) {
      this.setToken(response.token); // Legacy support
    } else {
    }

    return response;
  }

  async register(email: string, password: string, name?: string) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    // Handle both new token structure and legacy
    // Backend returns access_token (underscore), not accessToken (camelCase)
    if (response.access_token) {
      this.setTokens(response.access_token, response.refresh_token);
    } else if (response.accessToken && response.refreshToken) {
      this.setTokens(response.accessToken, response.refreshToken);
    } else if (response.token) {
      this.setToken(response.token); // Legacy support
    }

    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST', body: JSON.stringify({}) });
    } catch (error) {
      console.warn('Logout request failed:', error);
      // Continue with local cleanup even if server request fails
    } finally {
      this.setTokens(null, null);
    }
  }

  async getProfile() {
    // Backend uses /auth/me endpoint
    return this.request('/auth/me');
  }

  async updateProfile(data: any) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.post('/auth/avatar', formData);
  }

  async removeAvatar() {
    return this.request('/users/avatar', {
      method: 'DELETE',
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/password/change', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async deleteAccount(password?: string) {
    return this.request('/users/me', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });
  }

  // Health & Fitness
  async getHealthProfile() {
    return this.request('/health/profile');
  }

  async updateHealthProfile(data: any) {
    return this.request('/health/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getFitnessActivities(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/fitness/activities${queryString}`);
  }

  async createFitnessActivity(data: any) {
    return this.request('/fitness/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getNutritionLogs(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/nutrition/logs${queryString}`);
  }

  async createNutritionLog(data: any) {
    return this.request('/nutrition/logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getHealthMetrics(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/health/metrics${queryString}`);
  }

  async createHealthMetric(data: any) {
    return this.request('/health/metrics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Financial Management
  async getFinancialAccounts() {
    return this.request('/finance/accounts');
  }

  async createFinancialAccount(data: any) {
    return this.request('/finance/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getExpenses(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/finance/transactions${queryString}`);
  }

  async createExpense(data: any) {
    return this.request('/finance/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteExpense(id: string) {
    return this.request(`/finance/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  async getBudgets() {
    return this.request('/finance/budget');
  }

  async getFinancialSummary() {
    return this.request('/finance/analytics');
  }

  async createBudget(data: any) {
    return this.request('/finance/budget', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Meditation & Mental Health
  async getMeditationSessions(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/meditation/sessions${queryString}`);
  }

  async createMeditationSession(data: any) {
    return this.request('/meditation/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMentalHealthLogs(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/mental-health/logs${queryString}`);
  }

  async createMentalHealthLog(data: any) {
    return this.request('/mental-health/logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Travel Planning
  async getTravelPlans() {
    return this.request('/travel/plans');
  }

  async createTravelPlan(data: any) {
    return this.request('/travel/plans', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTravelPlan(id: string, data: any) {
    return this.request(`/travel/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async toggleTravelPlanFavorite(planId: string, isFavorite: boolean) {
    return this.request('/travel/favourite', {
      method: 'POST',
      body: JSON.stringify({
        plan_id: planId,
        is_favourite: isFavorite,
      }),
    });
  }

  async getFavoriteTravelPlans() {
    return this.request('/travel/favourites');
  }

  // Todo Management
  async getTodoLists(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/todos/lists${queryString}`);
  }

  async createTodoList(data: any) {
    return this.request('/todos/lists', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTodoList(id: string, data: any) {
    return this.request(`/todos/lists/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTodoList(id: string) {
    return this.request(`/todos/lists/${id}`, {
      method: 'DELETE',
    });
  }

  async getTodos(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/todos${queryString}`);
  }

  async createTodo(data: any) {
    return this.request('/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTodo(id: string, data: any) {
    return this.request(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTodo(id: string) {
    return this.request(`/todos/${id}`, {
      method: 'DELETE',
    });
  }

  async completeTodo(id: string) {
    return this.request(`/todos/${id}/complete`, {
      method: 'PUT',
    });
  }

  async incompleteTodo(id: string) {
    return this.request(`/todos/${id}/incomplete`, {
      method: 'PUT',
    });
  }

  // Habit Management
  async getHabits(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/habits${queryString}`);
  }

  async getHabitById(id: string) {
    return this.request(`/habits/${id}`);
  }

  async createHabit(data: any) {
    return this.request('/habits', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateHabit(id: string, data: any) {
    return this.request(`/habits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteHabit(id: string) {
    return this.request(`/habits/${id}`, {
      method: 'DELETE',
    });
  }

  async getHabitCompletions(habitId: string, params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/habits/${habitId}/completions${queryString}`);
  }

  async markHabitComplete(habitId: string, data?: any) {
    return this.request(`/habits/${habitId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data || {}),
    });
  }

  async unmarkHabitComplete(habitId: string, completionId: string) {
    return this.request(`/habits/${habitId}/completions/${completionId}`, {
      method: 'DELETE',
    });
  }

  async getHabitStreak(habitId: string) {
    return this.request(`/habits/${habitId}/streak`);
  }

  async getHabitStats(habitId: string, params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/habits/${habitId}/stats${queryString}`);
  }

  async getHabitAnalytics(habitId: string, period?: 'week' | 'month' | 'year') {
    const queryString = period ? `?period=${period}` : '';
    return this.request(`/habits/${habitId}/analytics${queryString}`);
  }

  async getUserHabitStatistics() {
    return this.request('/habits/statistics/overview');
  }

  async getHabitCategories() {
    return this.request('/habits/categories/list');
  }

  async getHabitFrequencyTypes() {
    return this.request('/habits/frequency-types/list');
  }

  // Language Learning
  async getLanguages() {
    return this.request('/language/languages');
  }

  async getUserLanguages() {
    return this.request('/language/user-languages');
  }

  async addUserLanguage(data: any) {
    return this.request('/language/user-languages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUserLanguage(id: string, data: any) {
    return this.request(`/language/user-languages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async removeUserLanguage(id: string) {
    return this.request(`/language/user-languages/${id}`, {
      method: 'DELETE',
    });
  }

  async getLessons(languageId: string, params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/language/lessons/${languageId}${queryString}`);
  }

  async getLesson(id: string) {
    return this.request(`/language/lessons/${id}`);
  }

  async completeLesson(lessonId: string, data: any) {
    return this.request(`/language/lessons/${lessonId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getVocabulary(languageId: string, params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/language/vocabulary/${languageId}${queryString}`);
  }

  async addVocabulary(data: any) {
    return this.request('/language/vocabulary', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateVocabulary(id: string, data: any) {
    return this.request(`/language/vocabulary/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteVocabulary(id: string) {
    return this.request(`/language/vocabulary/${id}`, {
      method: 'DELETE',
    });
  }

  async practiceVocabulary(languageId: string, params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/language/practice/${languageId}${queryString}`);
  }

  async submitPracticeResult(data: any) {
    return this.request('/language/practice', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getLanguageProgress(languageId: string) {
    return this.request(`/language/progress/${languageId}`);
  }

  // Currency Management
  // External API calls for Frankfurter currency data
  // Note: These use direct fetch() because they call an external API (not our backend)
  // and don't require authentication or backend-specific interceptors
  async getCurrencyRates(params?: { base_currency?: string; currencies?: string[] }) {
    const base = params?.base_currency || 'USD';
    const to = params?.currencies?.join(',');
    const url = `https://api.frankfurter.app/latest?from=${base}${to ? `&to=${to}` : ''}`;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => ({
        data: Object.entries(data.rates).map(([code, rate]) => ({
          code,
          rate: rate as number,
          name: code, // We could add a currency name mapping if needed
          symbol: code,
          lastUpdated: data.date,
        })),
        page: 1,
        limit: Object.keys(data.rates).length,
        total: Object.keys(data.rates).length,
        total_pages: 1,
      }));
  }

  async convertCurrencyExternal(from: string, to: string, amount: number) {
    const url = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new ApiErrorResponse('Failed to convert currency', response.status);
    }

    const result = await response.json();
    const rate = result.rates[to];
    const convertedAmount = amount * rate;

    return {
      from,
      to,
      amount,
      convertedAmount,
      rate,
      timestamp: result.date
    };
  }

  async convertCurrency(data: any) {
    return this.request('/currency/convert', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrencyHistory(
    from: string,
    to: string,
    params?: { startDate?: string; endDate?: string },
  ) {
    if (params?.startDate && params?.endDate) {
      return fetch(
        `https://api.frankfurter.app/${params.startDate}..${params.endDate}?from=${from}&to=${to}`,
      ).then((res) => res.json());
    }
    // Fallback to latest rates if no dates provided
    return fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`).then((res) =>
      res.json(),
    );
  }

  async getCurrencyAlerts(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/currency/alerts${queryString}`);
  }

  async createCurrencyAlert(data: any) {
    return this.request('/currency/alerts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCurrencyAlert(id: string, data: any) {
    return this.request(`/currency/alerts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCurrencyAlert(id: string) {
    return this.request(`/currency/alerts/${id}`, {
      method: 'DELETE',
    });
  }

  async getFavoriteCurrencies() {
    return this.request('/currency/favorites');
  }

  async addFavoriteCurrency(data: any) {
    return this.request('/currency/favorites', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async removeFavoriteCurrency(id: string) {
    return this.request(`/currency/favorites/${id}`, {
      method: 'DELETE',
    });
  }

  // Recipe Management
  async getRecipes(params?: any): Promise<{ data: Recipe[]; total: number; page: number; limit: number }> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/recipes${queryString}`);
  }

  async getPublicRecipes(params?: any): Promise<{ data: Recipe[]; total: number; page: number; limit: number; total_pages: number }> {
    if (!params) {
      return this.request('/recipes/public');
    }

    // Build query string manually to handle arrays properly
    const queryParts: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return; // Skip empty values
      }

      if (Array.isArray(value)) {
        // Handle arrays - add each item separately
        value.forEach(item => {
          if (item) {
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
          }
        });
      } else {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    });

    const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    return this.request(`/recipes/public${queryString}`);
  }

  async getRecipe(id: string) {
    return this.request(`/recipes/${id}`);
  }

  async createRecipe(data: any) {
    return this.request('/recipes', {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  async updateRecipe(id: string, data: any) {
    return this.request(`/recipes/${id}`, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  async deleteRecipe(id: string) {
    return this.request(`/recipes/${id}`, {
      method: 'DELETE',
    });
  }

  async getRecipeStats(): Promise<{
    total_recipes: number;
    total_users: number;
    average_rating: number;
    most_popular_cuisine: string;
    recipes_by_difficulty: { easy: number; medium: number; hard: number };
  }> {
    return this.request('/recipes/stats/overall');
  }

  async favoriteRecipe(id: string) {
    return this.request(`/recipes/${id}/favorite`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async unfavoriteRecipe(id: string) {
    return this.request(`/recipes/${id}/favorite`, {
      method: 'DELETE',
    });
  }

  async rateRecipe(id: string, data: any) {
    return this.request(`/recipes/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRecipeRatings(id: string, params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/recipes/${id}/ratings${queryString}`);
  }

  async getFavoriteRecipes() {
    return this.request('/recipes/user/favorites');
  }

  async getPopularRecipes(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/recipes/popular${params}`);
  }

  // Meal Plans
  async getMealPlans(params?: any) {
    // Set default pagination parameters
    const defaultParams = {
      page: '1',
      limit: '6',
      ...params
    };
    const queryString = `?${new URLSearchParams(defaultParams).toString()}`;
    return this.request(`/recipes/meal-plans${queryString}`);
  }

  async getMealPlan(id: string) {
    return this.request(`/recipes/meal-plans/${id}`);
  }

  async createMealPlan(data: any) {
    return this.request('/recipes/meal-plans', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMealPlan(id: string, data: any) {
    // Clean the data to remove any unwanted properties
    const cleanData = { ...data };
    
    // Remove any properties that might cause issues
    delete cleanData.is_favorited;
    delete cleanData.isFavorited;
    delete cleanData.userId;
    delete cleanData.user_id;
    delete cleanData.createdAt;
    delete cleanData.created_at;
    delete cleanData.updatedAt;
    delete cleanData.updated_at;
    delete cleanData.id;
    
    // Clean nested properties if they exist
    if (cleanData.meals && Array.isArray(cleanData.meals)) {
      cleanData.meals = cleanData.meals.map((meal: any) => {
        const cleanMeal = { ...meal };
        delete cleanMeal.is_favorited;
        delete cleanMeal.isFavorited;
        delete cleanMeal.recipe; // Remove full recipe object if it exists
        delete cleanMeal.id;
        return cleanMeal;
      });
    }
    
    console.log('API updateMealPlan - cleaned data:', cleanData);
    
    return this.request(`/recipes/meal-plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cleanData),
    });
  }

  async deleteMealPlan(id: string) {
    return this.request(`/recipes/meal-plans/${id}`, {
      method: 'DELETE',
    });
  }

  // Shopping Lists
  async getShoppingLists(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/recipes/shopping-lists${queryString}`);
  }

  async getShoppingList(id: string) {
    return this.request(`/recipes/shopping-lists/${id}`);
  }

  async createShoppingList(data: any) {
    return this.request('/recipes/shopping-lists', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async generateShoppingListFromMealPlan(mealPlanId: string) {
    return this.request(`/recipes/shopping-lists/from-meal-plan/${mealPlanId}`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async updateShoppingList(id: string, data: any) {
    return this.request(`/recipes/shopping-lists/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteShoppingList(id: string) {
    return this.request(`/recipes/shopping-lists/${id}`, {
      method: 'DELETE',
    });
  }

  async addItemToShoppingList(listId: string, data: any) {
    return this.request(`/recipes/shopping-lists/${listId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateShoppingListItem(listId: string, itemId: string, data: any) {
    return this.request(`/recipes/shopping-lists/${listId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async removeItemFromShoppingList(listId: string, itemId: string) {
    return this.request(`/recipes/shopping-lists/${listId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // AI Services
  async generateContent(type: string, prompt: string, options?: any) {
    return this.request('/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ type, prompt, ...options }),
    });
  }

  // Notifications
  async getNotifications(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/notifications${queryString}`);
  }

  async markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  // Reminders
  async getReminders(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/reminders${queryString}`);
  }

  async createReminder(data: any) {
    return this.request('/reminders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateReminder(id: string, data: any) {
    return this.request(`/reminders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteReminder(id: string) {
    return this.request(`/reminders/${id}`, {
      method: 'DELETE',
    });
  }
}

// Create and export the API client instance
export const api = new ApiClient();

// Export as apiClient for compatibility
export const apiClient = api;

// Error type is already exported as interface above

// Utility function to check if error is an API error
export const isApiError = (error: any): error is ApiErrorResponse => {
  return error instanceof ApiErrorResponse;
};

// Utility function to get error message
export const getErrorMessage = (error: any): string => {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
