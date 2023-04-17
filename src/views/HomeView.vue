<template>
  <div class="home">
    <h2>メッセージ一覧</h2>
     <ul class="list-group" v-if="HasMessages">
      <li class="list-group-item" v-for="message in messages" :key="message.id">
        <router-link :to= "{name: 'edit', params: {id: message.id}}">
          {{ message.content }}
        </router-link>
      </li>
    </ul>
    <p v-else>メッセージはありません</p>
  </div>
  <div>
    <h2>メッセージ作成</h2>
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
h2{
  text-align: left;
}
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
  .list-group{
    width: 40%;
  }
  .home{
    margin-bottom: 200px;
  }
</style>