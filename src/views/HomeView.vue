<template>
  <div role="alert" aria-live="assertive" aria-atomic="true" v-if="HasMessages">
    <h2> <i class="fas fa-list-ul"></i>メッセージ一覧</h2>
    <div class="message-item" v-for="message in messages" :key="message.id">
        <div class="toast-header">
          <i class="fas fa-user"></i>
          <strong class="me-auto">{{this.data.username}}</strong>
          <small id="setName" class="text-muted"> <i class="far fa-clock"></i>TODO:時間を表示</small>
        </div>
      <router-link :to= "{name: 'edit', params: {id: message.id}}" class="link">
        <div class="toast-body" >
          {{ message.content }}
        </div>
      </router-link>
    </div>
  </div>
  <p v-else>メッセージはありません</p>
  <div >
    
    <h2 class="message-title"><i class="far fa-comments"></i>メッセージ作成</h2>
    <ChatForm message=""/>
  </div>
</template>

<script>
import ChatForm from '../components/ChatForm.vue'

export default {
  name: 'HomeView',
  data(){
    return{
      data: {}
    } 
  },
  components: {
    ChatForm
  },
  mounted(){
    this.data = JSON.parse(localStorage.getItem("userData"))
  },
  computed: {
    HasMessages() {
      return this.$store.getters.getCount
    },
    messages() {
      return this.$store.getters.getAll
    },
  },
  methods: {
    getName() {
      return this.localStorage.getItem("username")
    },
    setName() {
      const name = this.data.username
      console.log(name)
    }
  }
}
</script>
<style scoped>
  h2{
    text-align: left;
    margin: 0 0 15px 10px;
  }
  .message-title{
    margin-top: 100px;
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
  .toast{
    margin-bottom: 10px;
    box-shadow: none;
  }
  .fa-comments{
    margin-right: 10px;
  }
  .fa-user{
    padding-right: 10px;
  }
  .fa-list-ul{
    padding-right: 5px;
  }
  .toast-body{
    text-align: left;
  }
  .home{
    margin-bottom: 200px;
  }
  .message-item{
    margin-bottom: 20px;
  }

</style>