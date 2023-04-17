<template>
  <div class="edit">
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