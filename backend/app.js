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


//
// メッセージに関するAPI
//  
// メッセージの取得
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

// メッセージにIDを振るために、メッセージのlengthを取得
async function getMessageArrayLength() {
    try {
      const data = await fs.promises.readFile('messages.json', 'utf8');
      const myData = JSON.parse(data);
      const arrayLength = myData.length;
      return arrayLength;
    } catch (error) {
      console.error(error);
    }
}

// メッセージの保存
app.post('/api/message/post', (req, res) => {
    try{
        getMessageArrayLength()
        .then((messagesArrayLength) => {
            fs.readFile('messages.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // ファイルをJSONパースして配列に変換する
                let arr = JSON.parse(data);
                // 新しいオブジェクトを作成して配列に追加する
                arr.push({id: messagesArrayLength + 1, messageText: req.body.messageText, username: req.body.username, time: req.body.time });
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

// メッセージを編集
// app.put('/api/message/edit', (req, res) => {
//     const messageData = JSON.stringify(req.body.messageText, null, 2);
//     fs.writeFileSync('messages.json', messageData)
//     res.send('updata');
// });


// 
// ログイン、ユーザー登録に関するAPI
// 
// ユーザー登録
async function getUserArrayLength() {
    try {
      const data = await fs.promises.readFile('users.json', 'utf8');
      const myData = JSON.parse(data);
      const arrayLength = myData.length;
      return arrayLength;
    } catch (error) {
      console.error(error);
    }
}
app.post('/api/user/registration', (req, res) => {
    try{
        getUserArrayLength()
        .then((usersArrayLength) => {
            fs.readFile('users.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // ファイルをJSONパースして配列に変換する
                let arr = JSON.parse(data);
                // 新しいオブジェクトを作成して配列に追加する
                arr.push({id: usersArrayLength + 1, usename: req.body.username, pass: req.body.pass});
                // 配列をJSON文字列に変換する
                let newData = JSON.stringify(arr);
                // ファイルに書き込む
                fs.writeFile('users.json', newData, 'utf8', (err) => {
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
})

// ログイン認証
app.get('/api/user/login', (req, res) => {
    try{
        const fs = require('fs')
        //データを取りだす
        const userData = fs.readFileSync('users.json')
        // データを文字列に変換
        const userDataJSON = userData.toString()
        //JSONのデータをJavascriptのオブジェクトに
        const data = JSON.parse(userDataJSON)
        res.send(data)
    }catch(e){
        console.log("error")
    }
})


// 3000番ポートで実行
app.listen(3000, () => 
    console.log('Server running on port 3000')
);