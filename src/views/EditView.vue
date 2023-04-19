<template>
  <div class="edit">
    <h2><i class="fas fa-edit"></i>メッセージ編集</h2>
    <p class="post-username" v-if="showMessage">{{ message.username }}</p>
    <div v-if="showMessage">
      <ChatForm :message="message"/>
    </div>
    <p v-else>指定されたメッセージはありません</p>
  </div>
</template>
<script>
import ChatForm from '../components/ChatForm.vue'

export default {
  name: 'EditView',
  components: {
    ChatForm
  },
  data() {
    return {
      postUserName: JSON.parse(localStorage.getItem('vuex')),
      showMessage: true
    }
  },
  computed: {
    message() {
      const id = parseInt(this.$route.params.id)
      return this.$store.getters.getMessageById(id)
    }
  },
  watch: {
    postUserName: function() {
      const postUser = document.getElementById('post-username')
      if (postUser && postUser.innerText !== this.postUserName.username) {
        this.showMessage = false
      }
    }
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