const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { default: axios } = require('axios');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORSでhttp://localhost:8080からのリクエストを許可
app.use(cors());
// app.use(cors({
//   origin: ['http://localhost:8080', 'https://vue-chat-app-zm49-cijw0zjp5-hukuryo.vercel.app'],
//   credentials: true
// }));

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
                    console.log('メッセージをJSONデータに追加!');
                });
            });
        });
    }catch(e){
        console.log(e)
    }
});

// メッセージを編集
app.put('/api/message/edit', (req, res) => {
    try{
        const id = req.body.id - 1
        const bufferData = fs.readFileSync('messages.json')
        //JSONのデータをJavascriptのオブジェクトに
        let data = JSON.parse(bufferData)
        data[id].messageText = req.body.messageText
        const updatedJsonData = JSON.stringify(data);
        fs.writeFileSync('messages.json', updatedJsonData)
        console.log(req.body)
    }catch(e){
        console.log(e);
    }
});

// メッセージ削除
app.delete('/api/message/delete', (req, res) => {
    const messageData = fs.readFileSync('messages.json')
    const messages = JSON.parse(messageData)
    const deleteIndex = messages.findIndex(message => message.id === req.body.id)
    messages.splice(deleteIndex, 1)
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
                // ファイルが存在しない場合、初期データを書き込む
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
                let newData = JSON.stringify(arr);
                // ファイルに書き込む
                fs.writeFile('users.json', newData, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('ユーザー情報をJSONデータに追加!');
                });
            });
        });
    } catch (e) {
        console.log(e);
    }
});

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
        console.log(e)
    }
})


// 3000番ポートで実行
app.listen(3000, () => 
    console.log('Server running on port 3000')
);