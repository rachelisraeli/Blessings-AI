# AI Blessings Generator

Welcome to the **GPT Blessings Generator**!

This Node.js application interfaces with OpenAI's GPT-3.5-turbo model to generate personalized greetings for different occasions.

The server receives input from a client-side form and creates a request to OpenAI's API to produce a blessing tailored to the user's specifications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Prompt Testing](#prompt-testing)
- [Technologies Used](#technologies-used)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   
   `git clone https://github.com/yourusername/gpt-blessings-generator.git
   cd gpt-blessings-generator`
   


2. Install the dependencies:
   ```
   npm install
   ```

3. Set up environment variables:

   Ensure you have a .env file with the following variables:
   ```
   PORT=8000
   OPEN_AI_KEY=your_openai_api_key_here
   ```

   Replace your_openai_api_key_here with your actual OpenAI API key.

4. Run the application:
   ```
   node app.js
   ```

**Visit the application:**

Open your browser and navigate to http://localhost:3000.

## Usage
This application allows users to generate blessings by specifying several parameters like event type, age, mood, and length.

### Home Page:

Navigate to the home page, where you can fill out a form with the desired specifications for the blessing.

### Form Fields:

Fill out the following fields:

`Event` : The occasion for which the blessing is generated (e.g., Birthday, Wedding).

`Age` : (Optional) Age of the recipient.

`Type` : The style of the blessing (e.g., Poem, Letter).

`Mood` : The desired mood of the blessing (e.g., Funny, Joyful).

`Length` : (Optional) The length of the blessing (e.g., Short, Long).

**Generate Blessings:**
Click the "Generate" button to receive three different blessing options.

**Review Blessings:**
Choose the one you like best and enjoy!

## Environment Variables

The application uses environment variables for configuration. Set these in a .env file in the root of your project:

`PORT` :The port number on which the server will run.

`OPEN_AI_KEY` : Your OpenAI API key for authentication

Example:
```
PORT=3000
OPEN_AI_KEY=your_openai_api_key_here
```

## API Endpoints

## GET /
Description: Renders the homepage.

Response: HTML page with a form for inputting blessing specifications.

## POST /generate-blessing

Description: Generates a blessing based on user input.

### Request Body:

`event (string)` : The event for which the blessing is generated.

`age (number)` optional: The age of the recipient.

`type (string)` : The type of blessing (e.g., poem, letter).

`mood (string)` : The mood of the blessing (e.g., funny, joyful).

`length (string)` (optional): The length of the blessing (e.g., short, long).

### Response:

blessings (array): An array of three generated blessing options.

## Prompt Testing
### Example Request:
POST /generate-blessing

Content-Type: application/json
```
{
  "event": "Birthday",
  "age": 30,
  "type": "Poem",
  "mood": "Funny",
  "length": "Short"
}
```

### Example Response:
```
{
  "blessings": [
    "Here's a funny little rhyme for your 30th birthday...",
    "Happy 30th! May your day be filled with joy and laughter...",
    "Turning 30 is just the start, may it be filled with blessings..."
  ]
}
```
## Technologies Used
Node.js: JavaScript runtime environment for server-side applications.

Express.js: Web application framework for building RESTful APIs.

OpenAI: Integration with OpenAI's GPT-3.5-turbo for generating creative text.

EJS: Embedded JavaScript templating for rendering HTML views.

dotenv: Module for loading environment variables from a .env file.


