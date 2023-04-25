<template>
  <div class="edit">
    <h2><i class="fas fa-edit"></i>メッセージ編集</h2>
    <ChatForm v-if="messageExists" :message="setMessages"/>
    <p v-else>指定されたメッセージはありません</p>
    
  </div>
</template>

<script>
import ChatForm from '../components/ChatForm.vue'
import axios from 'axios'

export default {
  name: 'EditView',
  components: {
    ChatForm
  },
  data() {
    return {
      messageExists: false,
      setMessages: []
    }
  },
  async created() {
    // URLからIDを受け取る
    const id = parseInt(this.$route.params.id)
    try {
      // APIからメッセージ一覧を取得
      const response = await axios.get("http://localhost:3000/api/message/get")
      // メッセージ一覧からIDと一致するメッセージがあるか確認
      this.messageExists = response.data.some(message => message.id === id)
      for(let i=0; i <= response.data.length; i++){
        if(id === response.data[i].id){
          this.setMessages = response.data[i].messageText
          break
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    message() {
      // URLからIDを受け取る
      const id = parseInt(this.$route.params.id)
      return this.$store.getters.getMessageById(id)
    }
  },
  methods: {
   
  }
}
</script>

<style scoped>
  h2{
    text-align: left;
    margin: 0 0 30px 10px;
  }
  .fa-edit{
    padding-right: 7px;
  }
  .post-username{
    font-weight: bold;
    text-align: left;
    margin-left: 10px;
  }
</style>