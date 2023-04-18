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
export default {
    name: 'ChatForm',
    props: [
        'message'
    ],
    data() {
        return {
            content: this.message.content
        }
    },
    methods: {
        save(){
            let message = {
                content: this.content
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