
const { log } = require('console');
const express = require('express');
const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate-blessing', async (req, res) => {
    const { event, age, type, mood, length } = req.body;

    let prompt = `Generate a ${type} greeting for a ${event}`;
    if (age) prompt += ` for age ${age}`;
    prompt += ` with a ${mood} mood`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
            temperature: 0.7,
            n: 3 // בקשה ל-3 אפשרויות
        });

        const blessings = response.choices.map(choice => choice.message.content.trim());

        res.json({ blessings });
    } catch (error) {
        console.error('Error generating blessing:', error);
        res.status(500).json({ error: 'Failed to generate blessing' });
    }
});

function testPromptConstruction() {
    const testCases = [
        { event: 'יום הולדת', age: 4, type: 'שיר', mood: 'מצחיקה', length: 'קצר', expected: 'כתוב לי ברכה ליום הולדת לגיל 4 באוירה מצחיקה באורך קצר כשיר' },
        { event: 'חתונה', type: 'מכתב', mood: 'שמחה', length: 'ארוך', expected: 'כתוב לי ברכה לחתונה באוירה שמחה באורך ארוך כמכתב' },
    ];

    testCases.forEach(testCase => {
        const { event, age, type, mood, length, expected } = testCase;
        let prompt = `כתוב לי ברכה ל${event}`;
        if (age) prompt += ` לגיל ${age}`;
        prompt += ` באוירה ${mood} באורך ${length} כ${type}`;
        console.assert(prompt === expected, `Expected "${expected}" but got "${prompt}"`);
    });

    console.log('All test cases passed!');
}

testPromptConstruction();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
