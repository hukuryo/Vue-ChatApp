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
    return hour + ":" + min
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
    props: [
        'message',
        'propMessage'
    ],
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
        save(){
            let message = {
                messageText: this.messageText,
                username: postUserName.username,
                time: getTime(),
                day: getDay()
            }
            if(message.messageText === ""){
                window.alert('メッセージを入力してください')
            }else{
                this.$emit('clicked', message);
            }
        },
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