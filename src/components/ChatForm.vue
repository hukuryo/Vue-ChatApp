<template>
    <div class="center">
    <textarea v-model="content"></textarea>
        <button @click="save">送信</button>
    </div>
</template>
<script>
export default {
    name: 'ChatForm',
    data() {
        return {
            content: "Memo"
        }
    },
    methods: {
        save(){
            let ChatData = {
                Message: this.content
            }
            this.$store.commit('save', ChatData)
            this.$router.push('/')
        },
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