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


// POSTメソッドでフォームの値を受け取る
app.post('/api/v1/quiz', (req, res) => {
    try{
        fs.readFile('info.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            // ファイルをJSONパースして配列に変換する
            let arr = JSON.parse(data);
            
            // 新しいオブジェクトを作成して配列に追加する
            arr.push({ body: req.body.name, content: req.body.text });
            
            // 配列をJSON文字列に変換する
            let newData = JSON.stringify(arr);
            
            // ファイルに書き込む
            fs.writeFile('info.json', newData, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('JSONデータを追加！');
            });
        });
    }catch(e){
        console.log("error")
    }
});
app.listen(3000, () => console.log('Server running on port 3000'));