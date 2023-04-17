<template>
  <div class="home">
     <ul v-if="HasMessages">
      <li v-for="message in messages" :key="message.id">
        <router-link :to= "{name: 'edit', params: {id: message.id}}">
          {{ message.content }}
        </router-link>
      </li>
    </ul>
    <p v-else>メッセージはありません</p>
    <ChatForm message=""/>
  </div>
</template>

<script>
import ChatForm from '../components/ChatForm.vue'

export default {
  name: 'HomeView',
  components: {
    ChatForm
  },
  computed: {
    HasMessages() {
      return this.$store.getters.getCount
    },
    messages() {
      return this.$store.getters.getAll
    }
  }
}
</script>
<style scoped>
   ul{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
    border-bottom: 1px solid#ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
    text-align: left;
  }
  li a{
    color: #999;
    text-decoration: none;
    width: 100%;
    display: block;
  }
  .home{
    margin-bottom: 200px;
  }
</style>