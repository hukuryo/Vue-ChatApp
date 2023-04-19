<template>
    <div class="center">
        <div class="input">
            <textarea class="form-control" aria-label="With textarea" v-model="content" placeholder="メッセージを入力"></textarea>           
        </div>
        <button type="button" class="btn btn-outline-success" @click="save">メッセージを送信</button>
        <button type="button" class="btn btn-outline-danger" @click="remove" v-if="message.id">メッセージを削除</button>
    </div>
</template>
<script>
// 時間を取得する処理
const getTime = () => {
    let clock = new Date();  
    let hour = clock.getHours();
    let min = clock.getMinutes();
    return hour + ":" + min
}
export default {
    name: 'ChatForm',
    props: [
        'message'
    ],
    data() {
        return {
            content: this.message.content,
            username: "",
            time: getTime()
        }
    },
    methods: {
        save(){
            let message = {
                content: this.content,
                username: this.username,
                time: getTime()
            }
            if(this.message.id){
                message.id = this.message.id
            }
            this.$store.commit('save', message)
            this.content = ""
            this.$router.push('/')
        },
         remove() {
            this.$store.commit('delete', this.message.id)
            this.$router.push('/')
        },
        
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