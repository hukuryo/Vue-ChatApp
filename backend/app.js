// const express = require('express')
// const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(3000, () => console.log('Example app listening on port 3000!'))


const express = require('express');
const cors = require('cors');
const app = express();

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
    const answer = req.body.text;
    res.send(answer);
});

app.listen(3000, () => console.log('Server running on port 3000'));