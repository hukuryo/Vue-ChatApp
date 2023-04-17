<template>
  <div class="edit">
    <h2>メッセージ編集</h2>
    <ChatForm v-if="message" :message="message"/>
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
  computed: {
    message() {
      const id = parseInt(this.$route.params.id)
      return this.$store.getters.getMessageById(id)
    }
  }
}
</script>
<style scoped>
  h2{
    text-align: left;
    margin-bottom: 30px;
  }
</style>