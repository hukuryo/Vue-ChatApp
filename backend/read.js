const fs = require('fs')

//データを取りだす
const bufferData = fs.readFileSync('info.json')

// データを文字列に変換
const dataJSON = bufferData.toString()

//JSONのデータをJavascriptのオブジェクトに
const data = JSON.parse(dataJSON)

console.log(data)