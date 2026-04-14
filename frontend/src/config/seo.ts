export const SEO_CONFIG = {
  siteName: 'Wants',
  siteUrl: import.meta.env.VITE_SITE_URL || '',
  defaultTitle: 'Wants - The AI Where Intent Becomes Interface',
  defaultDescription:
    'Every AI talks. We render. Wants is the first AI platform where you say what you want and get the tool instantly. 500+ contextual tools for business, healthcare, legal, education, and more.',
  defaultImage: '/og-image.png',
  twitterHandle: '@InfoInlet2019',
  twitterImageUrl: '/twitter-image.png',
};

export const PAGE_SEO = {
  // Public Pages
  home: {
    title: 'Wants - The AI Where Intent Becomes Interface',
    description:
      'Every AI talks. We render. Wants is the first AI platform where you say what you want and get the tool instantly. 500+ contextual tools for business, healthcare, legal, education, and more.',
    url: '/',
  },
  features: {
    title: 'Features - Wants',
    description:
      'Discover the power of intent-driven AI. 500+ contextual tools, instant rendering, zero learning curve. See why Wants is the future of productivity.',
    url: '/features',
  },
  tools: {
    title: 'All Tools - Wants',
    description:
      'Explore 500+ AI-powered tools across business, healthcare, legal, education, finance, and more. Every tool you need, rendered instantly.',
    url: '/tools',
  },

  // Legal Pages

  // Auth Pages (noindex)
  login: {
    title: 'Login - Wants',
    description: 'Sign in to your Wants account to access 500+ AI-powered tools.',
    url: '/login',
    noindex: true,
  },
  signup: {
    title: 'Sign Up - Wants',
    description: 'Create your free Wants account and experience the AI where intent becomes interface.',
    url: '/signup',
    noindex: true,
  },

  // Dashboard (noindex)
  chat: {
    title: 'Chat - Wants',
    description: 'Your Wants AI assistant. Say what you want, get the tool instantly.',
    url: '/chat',
    noindex: true,
  },

  // Integrations
  integrations: {
    title: 'Integrations - Wants',
    description:
      'Connect Wants with your favorite tools. Seamless integrations for enhanced productivity.',
    url: '/integrations',
  },

  // Changelog
  changelog: {
    title: 'Changelog - Wants',
    description:
      'See what\'s new in Wants. Latest updates, new tools, and improvements to the platform.',
    url: '/changelog',
  },
};
