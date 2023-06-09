const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { default: axios } = require('axios');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//
// メッセージに関するAPI
//  
// メッセージの取得
app.get('/api/message/get', (req, res) => {
    try{
        //message.jsonファイルからメッセージを取りだす
        const bufferData = fs.readFileSync('messages.json');
        // データを文字列に変換
        const dataJSON = bufferData.toString();
        //JSONのデータをJavascriptのオブジェクトに
        const data = JSON.parse(dataJSON);
        res.send(data);
    }catch(e){
        fs.writeFileSync('messages.json', JSON.stringify([]));
    }
})

// メッセージにIDを振るために、メッセージのlengthを取得するメソッド
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
            // 入力された内容を取得して、message.jsonの配列にプッシュする
            fs.readFile('messages.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // ファイルをJSONパースして配列に変換する
                let arr = JSON.parse(data);
                // 新しいオブジェクトを作成して配列に追加する
                arr.push({
                    id: messagesArrayLength + 1,
                    messageText: req.body.messageText,
                    username: req.body.username,
                    time: req.body.time,
                    day: req.body.day
                });
                // 配列をJSON文字列に変換する
                let newData = JSON.stringify(arr, null, '\t');
                // ファイルに書き込む
                fs.writeFile('messages.json', newData, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            });
        });
    }catch(e){
        console.log(e)
    }
});

// メッセージ編集
app.put('/api/message/edit', (req, res) => {
    try{
        const id = req.body.id - 1;
        const bufferData = fs.readFileSync('messages.json');
        let data = JSON.parse(bufferData);
        data[id].messageText = req.body.messageText;
        const updatedJsonData = JSON.stringify(data);
        fs.writeFileSync('messages.json', updatedJsonData);
    }catch(e){
        console.log(e);
    }
});

// メッセージ削除
app.delete('/api/message/delete', (req, res) => {
    const messageData = fs.readFileSync('messages.json');
    const messages = JSON.parse(messageData);
    const deleteIndex = messages.findIndex(message => message.id === req.body.id);
    messages.splice(deleteIndex, 1);
    fs.writeFileSync('messages.json', JSON.stringify(messages));
})

// 
// ログイン、ユーザー登録に関するAPI
// 
// ユーザーが誰も登録されていない場合に、初期データを書き込む関数
async function initializeUsers(username, pass) {
    try {
        const data = await fs.promises.writeFile('users.json', `[{"id":1,"username":"${username}","pass":"${pass}"}]`, 'utf8');
        return data;
    } catch (error) {
        console.error(error);
    }
}

// ユーザー登録
app.post('/api/user/registration', (req, res) => {
    try {
        async function getUserArrayLength() {
            try {
                const data = await fs.promises.readFile('users.json', 'utf8');
                const myData = JSON.parse(data);
                const arrayLength = myData.length;
                return arrayLength;
            } catch (error) {
                console.error(error);
                // ファイルが存在しない場合、配列を作成して、入力された内容を保存する。
                 initializeUsers(req.body.username, req.body.pass);
                return 1;
            }
        }
        getUserArrayLength().then((usersArrayLength) => {
            fs.readFile('users.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // ファイルをJSONパースして配列に変換する
                let arr = JSON.parse(data);
                // 新しいオブジェクトを作成して配列に追加する
                arr.push({
                    id: usersArrayLength + 1,
                    username: req.body.username,
                    pass: req.body.pass
                });
                // 配列をJSON文字列に変換する
                let newData = JSON.stringify(arr, null, '\t');
                // ファイルに書き込む
                fs.writeFile('users.json', newData, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            });
        });
    } catch (e) {
        console.log(e);
    }
});

// ログイン認証
app.post('/api/user/login', (req, res) => {
    try {
      const userData = fs.readFileSync('users.json');
      const userDataJSON = userData.toString();
      const getData = req.body;
      const data = JSON.parse(userDataJSON);
      //ユーザーを一人ずつ取り出して、入力された内容と比較する。   
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === getData.username && data[i].pass === getData.pass) {
        // フロント側に成功メッセージを送る
          return res.status(200).send('Success');
        }
      }
    //入力された内容と一致するユーザーがいなければ、失敗メッセージを返す。   
      res.status(401).send('Authentication failed');
    } catch (e) {
      console.log(e);
      res.status(500).send('Internal server error');
    }
  });

// 3000番ポートで実行
app.listen(3000, () => 
    console.log('3000番ポートで実行')
);