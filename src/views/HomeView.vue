<template>
  <p class="loginName"><strong>{{ this.data.username }}</strong>でログイン中</p>
  <div class="index" role="alert" aria-live="assertive" aria-atomic="true" v-if="HasMessages">
    <h2> <i class="fas fa-list-ul"></i>メッセージ一覧</h2>
    <div class="message-item" v-for="message in messages" :key="message.id">
        <div class="toast-header">
          <i class="fas fa-user"></i>
          <strong class="me-auto">{{ message.username }}</strong>
          <small id="setTime" class="text-muted"> <i class="far fa-clock" style="margin-right: 2px;"></i>{{ message.time }}</small>
        </div>
        <div class="toast-body" >
          {{ message.content }}
          <!-- ログインしているユーザーと送信者の名前が不一致の場合、編集ボタンを表示しない -->
          <div class="edit-btn" v-if="message.username === this.data.username">
            <router-link :to= "{name: 'edit', params: {id: message.id}}">
              <button class="btn btn-success" id="edit-btn" type="button">編集<i class="fas fa-edit" style="margin-left: 3px;"></i></button>
            </router-link>
          </div>
        </div>
    </div>
  </div>
  <p v-else>メッセージはありません</p>
  <button id="page-top" href="#"><span><i class="fas fa-chevron-right"></i></span></button>
  <div class="fix">
    <ChatForm message=""/>
  </div>
</template>


<script>
import ChatForm from '../components/ChatForm.vue'


export default {
  name: 'HomeView',
  // ユーザーデータを格納する変数を準備
  data(){
    return{
      data: {},
      username: ""
    } 
  },
  components: {
    ChatForm
  },
  mounted(){
    // ローカルストレージからユーザーデータを取得
    this.data = JSON.parse(localStorage.getItem("vuex"))
    // 画面のトップへ戻るボタンの実装
    const windowTop = document.body.scrollTop;
    const pageTop = document.getElementById('page-top');
    pageTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: windowTop, 
        behavior: 'smooth'
      });
    });
  //   setTimeout(function() {
  //   location.reload();
    
  // }, 50);
  },
  computed: {    
    HasMessages() {
      return this.$store.getters.getCount
    },
    messages() {
      return this.$store.getters.getAll
    }
  }
  // watch: {
  //   data: function (newName, oldName){
  //     this.username
  //   }
  // }
}

</script>
<style scoped>
  h2{
    text-align: left;
    margin: 0 0 15px 10px;
  }
  .loginName{
    text-align: right;
    margin-right: 10px;
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
  .index{
    padding-bottom: 110px;
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
  .edit-btn{
    display: flex;
    justify-content: flex-end;
  }
  .message-item{
    margin-bottom: 20px;
  }
  #page-top{
    position: fixed;
    bottom: 40px;
    right: 4%;
    height: 59px;
    width: 58px;
    color: #FFF;
    font-size: 32px;
    background-color: #9E9E9E;
    border: none;
    border-radius: 50%;
    outline: none;
    opacity: 1;
    transform: rotate(-90deg);
    transition-duration: 0.5s;
  }
  .fix{
    position: fixed;
    bottom: 20px;
    left: 5%;
    width: 80%;
  }
</style>