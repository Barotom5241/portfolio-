const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Endpoint for form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // In a real application, you would save this to a database or send an email.
    // Here we'll just log it and send a success response.
    console.log(`Received contact form submission:
    Name: ${name}
    Email: ${email}
    Message: ${message}
    `);

    // Add a slight delay to simulate server processing for frontend animations
    setTimeout(() => {
        res.status(200).json({ success: true, message: 'Message received successfully!' });
    }, 1000);
});

// Fallback to index.html for HTML requests (SPA behavior), otherwise 404
app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
