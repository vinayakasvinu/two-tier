import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const frontendPort = 80;
const backendUrl = 'http://backend:3000/api/data';

app.get('/', async (req, res) => {
    try {
        const response = await fetch(backendUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Simple Frontend</title>
            </head>
            <body>
                <h1>Simple Frontend</h1>
                <p id="backend-response">${data.message}</p>
            </body>
            </html>
        `;
        res.send(htmlContent);
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Error</title>
            </head>
            <body>
                <h1>Internal Server Error</h1>
                <p>There was an error fetching data from the backend.</p>
            </body>
            </html>
        `);
    }
});

app.listen(frontendPort, () => {
    console.log(`Frontend server running on http://localhost:${frontendPort}`);
});
