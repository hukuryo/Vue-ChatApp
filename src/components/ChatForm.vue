<template>
    <div class="center">
        <form>
            <div class="input">
                <textarea class="form-control" aria-label="With textarea"  name="messageText" v-model="messageText" placeholder="メッセージを入力"></textarea>           
            </div>
            <button type="submit" class="btn btn-outline-success" @click="buttonChange">メッセージを{{ propMessage }}</button>
            <button type="button" class="btn btn-outline-danger" @click.prevent="submitForm" @click="remove" v-if="this.message">メッセージを削除</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

// 現在の時間を取得する処理
const getTime = () => {
    let clock = new Date();  
    let hour = clock.getHours();
    let min = clock.getMinutes();
    const formattedMinutes = (min < 10 ? '0' : '') + min;
    return hour + ":" + formattedMinutes
}
// 日付を取得する
const getDay = () => {
    let clock = new Date();  
    let month = clock.getMonth()
    let day = clock.getDate()
    return month + 1 + "/" + day
}
// ローカルストレージからログインしているユーザーの情報を取得
const postUserName = JSON.parse(localStorage.getItem("vuex"))

export default {
    name: 'ChatForm',
    // 一覧画面からメッセージ内容を取得
    props: [
        'message',
        'propMessage'
    ],
    // メッセージ内容、ユーザー名、送信時間をセット
    data() {
        return {
            messageText: this.message,
            username: postUserName.username,
            time: getTime(),
            day: getDay()
        }
    },
    mounted(){
        this.username = postUserName
    },
    methods: {
        // ファイルの名前によってボタンを押したときに呼び出すメソッドを変える
        buttonChange() {
            if (this.$route.name === 'home') {
                this.save()
            } else if (this.$route.name === 'edit') {
                this.messageEdit()
            }
        },
        // メッセージを保存
        save(){
            let message = {
                // メッセージ内容
                messageText: this.messageText,
                // 送信者
                username: postUserName.username,
                // 送信時間
                time: getTime(),
                // 送信日
                day: getDay()
            }
            if(message.messageText === ""){
                window.alert('メッセージを入力してください')
            }else{
                this.$emit('clicked', message);
            }
        },
        // メッセージを編集
        messageEdit(){
            const id = parseInt(this.$route.params.id)
            let editMessageData  = {
                id: id,
                messageText: this.messageText,
                username: postUserName.username,
                time: getTime()
            }
            if(editMessageData.messageText === ""){
                window.alert('メッセージを入力してください')
            }else{
               this.$emit('clicked', editMessageData);
            }
        },
        // メッセージを削除
        remove() {
            const result = window.confirm('メッセージを削除してよろしいですか？')
            if(result){
                // URLのパスからIDを取得
                const id = parseInt(this.$route.params.id)
                axios.delete("http://localhost:3000/api/message/delete", id)
                .then(response => {
                    this.data = response.data
                })
                .catch(error => {
                    console.log(error)
                })
                this.$store.commit('delete', this.message.id)
                this.$router.push('/')
            }else{
                return
            }
        }
    }
}
</script>

<style scoped>
    .center{
        text-align: left;
    }
    .input{
        margin-bottom: 10px;
    }
    textarea {
        width: 60%;
    height: 41px;
    }
    .btn-outline-danger{
        margin-left: 10px;
    } 
</style>