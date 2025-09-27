// index.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
console.log(__dirname, "dirname");

const publicDir = path.join(__dirname, 'client', 'public')

app.use(express.static(publicDir));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Fallback route to serve index.html for SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'landing.html'))
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});