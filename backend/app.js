const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { default: axios } = require('axios');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORSでhttp://localhost:8080からのリクエストを許可
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));


app.get('/api/message/get', (req, res) => {
    try{
        const fs = require('fs')
        //データを取りだす
        const bufferData = fs.readFileSync('messages.json')
        // データを文字列に変換
        const dataJSON = bufferData.toString()
        //JSONのデータをJavascriptのオブジェクトに
        const data = JSON.parse(dataJSON)
        res.send(data)
    }catch(e){
        console.log("error")
    }
})

async function getArrayLength() {
    try {
      const data = await fs.promises.readFile('messages.json', 'utf8');
      const myData = JSON.parse(data);
      const arrayLength = myData.length;
      return arrayLength;
    } catch (error) {
      console.error(error);
    }
}

// POSTメソッドでフォームの値を受け取る
app.post('/api/message/post', (req, res) => {
    try{
        getArrayLength()
        .then((arrayLength) => {
            fs.readFile('messages.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // ファイルをJSONパースして配列に変換する
                let arr = JSON.parse(data);
                console.log(arrayLength)
                // 新しいオブジェクトを作成して配列に追加する
                arr.push({id: arrayLength + 1, messageText: req.body.content, username: req.body.username, time: req.body.time });
                // 配列をJSON文字列に変換する
                let newData = JSON.stringify(arr);
                // ファイルに書き込む
                fs.writeFile('messages.json', newData, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('JSONデータを追加!');
                });
            });
        });
    }catch(e){
        console.log("error")
    }
});



app.listen(3000, () => console.log('Server running on port 3000'));