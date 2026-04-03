const axios = require('axios');

async function addStoryViaServer() {
  try {
    console.log('Starting server and adding test story...');
    
    // Start server first
    const { spawn } = require('child_process');
    
    const server = spawn('npm', ['run', 'start:dev'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: process.cwd()
    });
    
    console.log('Waiting for server to start...');
    
    // Wait for server to start (look for port ready message)
    await new Promise((resolve, reject) => {
      let hasStarted = false;
      const timeout = setTimeout(() => {
        if (!hasStarted) {
          server.kill();
          reject(new Error('Server took too long to start'));
        }
      }, 30000);
      
      server.stdout.on('data', (data) => {
        const output = data.toString();
        console.log('Server output:', output);
        if (output.includes('Application is running on') || output.includes('Mapped')) {
          hasStarted = true;
          clearTimeout(timeout);
          resolve();
        }
      });
      
      server.stderr.on('data', (data) => {
        const error = data.toString();
        console.log('Server error:', error);
        if (error.includes('EADDRINUSE')) {
          hasStarted = true;
          clearTimeout(timeout);
          resolve(); // Server is already running
        }
      });
    });
    
    console.log('Server is ready! Adding story via API...');
    
    // Create story using the language stories endpoint
    const storyData = {
      title: 'Test Story for Completion',
      author: 'Test Author',
      level: 'beginner',
      language_code: 'es',
      category: 'fiction',
      estimated_time: 10,
      words_count: 100,
      difficulty: 1,
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
      metadata: {}
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZGU4YzJlMC1jZWQyLTQ5NDQtOTU5My1mYmY0ZTk5OWQ3MzMiLCJlbWFpbCI6InVzZXIzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjpudWxsLCJuYW1lIjoiU29oYWciLCJpYXQiOjE3NTc5MjQ0NDQsImV4cCI6MTc1ODUyOTI0NH0.EYuFy31Yzg0-sXhUn4LielQ0kzPyQuHH4V4LRMI3B-k';
    
    const response = await axios.post(
      'http://localhost:3001/api/v1/language/stories',
      storyData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Test story added successfully via API!');
    console.log('Story ID:', response.data.id);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    server.kill();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error adding test story:', error.response?.data || error.message);
    process.exit(1);
  }
}

addStoryViaServer();