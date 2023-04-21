

const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORSでhttp://localhost:8080からのリクエストを許可
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.options('/api/v1/quiz', cors());

// POSTメソッドでフォームの値を受け取る

app.post('/api/v1/quiz', (req, res) => {
    const person = {
        body: req.body.name,
        content: req.body.text
    }   
    const personJSON = JSON.stringify(person)
    fs.writeFileSync('info.json', personJSON)
});


app.listen(3000, () => console.log('Server running on port 3000'));