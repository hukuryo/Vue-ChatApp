<template>
    <div class="center">
        <div class="input">
            <textarea class="form-control" aria-label="With textarea" v-model="content" placeholder="メッセージを入力" minlength="1"></textarea>           
        </div>
        <button type="submit" class="btn btn-outline-success" @click="save">メッセージを送信</button>
        <button type="button" class="btn btn-outline-danger" @click.prevent="submitForm" @click="remove" v-if="message.id">メッセージを削除</button>
    </div>
</template>

<script>
// 現在の時間を取得する処理
const getTime = () => {
    let clock = new Date();  
    let hour = clock.getHours();
    let min = clock.getMinutes();
    return hour + ":" + min
}
const postUserName = JSON.parse(localStorage.getItem("vuex"))
export default {
    name: 'ChatForm',
    // 一覧画面からメッセージ内容を取得
    props: [
        'message'
    ],
    // メッセージ内容、ユーザー名、送信時間をセット
    data() {
        return {
            content: this.message.content,
            username: postUserName.username,
            time: getTime()
        }
    },
    mounted(){
        this.username = postUserName
    },
    methods: {
        // メッセージを保存する
        save(){
            if(this.content == "undefined"){
                window.alert("メッセージを入力してください")
            } 
            let message = {
                // メッセージ内容
                content: this.content,
                // 送信者
                username: postUserName.username,
                // 送信時間
                time: getTime()
            }
            console.log(this.content)
            if(this.message.id){
                message.id = this.message.id
            }
            this.$store.commit('save', message)
            this.content = ""
            this.$router.push('/')
            
        },
        // メッセージを削除する
         remove() {
            const result = window.confirm('メッセージを削除してよろしいですか？')
            if(result){
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