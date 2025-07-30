const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Initialize OpenAI client with OpenRouter configuration
const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
        'X-Title': process.env.SITE_NAME || 'CosmosChat'
    }
});

// System prompt for concise astronomy/cosmology responses
const SYSTEM_PROMPT = `You are CosmosChat, a fast and concise expert on astronomy and cosmology.

Rules:
1. Give extremely brief, direct answers
2. No explanations or citations
3. 1-2 sentences max
4. Use "Space-only" for non-space questions
5. Focus: cosmos, stars, planets, space tech`;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || typeof message !== 'string') {
            res.json({ reply: "Please ask a question about astronomy or space." });
            return;
        }

        console.log('Sending request to OpenRouter API...');
        const completion = await client.chat.completions.create({
            model: 'openai/gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            temperature: 0.3,
            max_tokens: 100,
            headers: {
                'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
                'X-Title': process.env.SITE_NAME || 'CosmosChat'
            }
        });

        console.log('Received response from OpenRouter API');
        
        if (!completion.choices || !completion.choices[0]) {
            throw new Error('Invalid response from API');
        }

        const reply = completion.choices[0].message.content;
        console.log('Reply:', reply);
        res.json({ reply });

    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ 
            error: 'Error processing request. Please try again.',
            details: error.message 
        });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`CosmosChat server running on port ${PORT}`);
});


