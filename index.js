// index.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const questions = require("./server/data/questions.json")

// Serve static files from the "public" folder
console.log(__dirname, "dirname");

const publicDir = path.join(__dirname, 'client', 'public')

app.use(express.static(publicDir));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'server', 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Fallback route to serve index.html for SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'landing.html'))
});

app.get("/response{/:test}", (req, res)=>{
    const questionIndex = Number(req.params.test)
    res.render("response", {question:questions[questionIndex]})
}) 

app.post("/response", (req, res)=>{
    console.log(req.body);
    const isCorrect = req.body.selectedAnswer === req.body.correctAnswer;
    const message = isCorrect ? "Congrats! That was the right answer" : "Not quite! Try again!"
    
    res.json({message, isCorrect})

})

app.get("/response:test")

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});