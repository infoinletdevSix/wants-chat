const axios = require('axios');

const APPATONCE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiJjbWVzMDZ0bjkwMDAwb2EwMW9yZDZpcGk1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsInBlcm1pc3Npb25zIjpbIioiXX0.lQg0i9ZmDy2AfwQ-DdumVLHjVeqCQv_izVbiwt2Wuis';
const APPATONCE_BASE_URL = 'https://api.appatonce.com';

async function addTestStory() {
  try {
    const storyData = {
      id: '8d249d3c-6c40-4d76-9504-9ec756fb1367',
      user_id: '2de8c2e0-ced2-4944-9593-fbf4e999d733',
      title: 'Test Story for Completion',
      author: 'Test Author',
      level: 'beginner',
      language_code: 'es',
      category: 'fiction',
      estimated_time: 10,
      words_count: 100,
      difficulty: 1,
      thumbnail: null,
      preview: 'This is a test story for completion testing...',
      content: [
        {
          type: 'text',
          text: 'Hola mundo',
          translation: 'Hello world',
          audio_url: null,
          metadata: {}
        }
      ],
      vocabulary: [
        {
          word: 'hola',
          translation: 'hello',
          definition: 'A greeting',
          audio_url: null
        }
      ],
      is_completed: false,
      completion_rate: 0,
      rating: null,
      metadata: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Adding test story...');
    
    const response = await axios.post(
      `${APPATONCE_BASE_URL}/tables/language_stories/rows`,
      storyData,
      {
        headers: {
          'Authorization': `Bearer ${APPATONCE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Test story added successfully!');
    console.log('Story ID:', storyData.id);
    console.log('User ID:', storyData.user_id);
    
  } catch (error) {
    console.error('❌ Error adding test story:', error.response?.data || error.message);
  }
}

addTestStory();