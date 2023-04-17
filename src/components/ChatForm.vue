<template>
    <div class="center">
    <textarea v-model="content"></textarea>
        <button @click="save">メッセージを送信</button>
        <button @click="remove" v-if="message.id">メッセージを削除</button>
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
    textarea {
        width: 30%;
        height: 100px;
    }
    button{
        width: 5em;
        margin: 3px;
    }
    
</style>