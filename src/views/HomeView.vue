<template>
  <p class="loginName"><strong>{{ this.username }}</strong>でログイン中</p>
  <div class="index" role="alert" aria-live="assertive" aria-atomic="true">
    <h2> <i class="fas fa-list-ul"></i>メッセージ一覧</h2>
    <!-- メッセージの一覧を表示 -->
    <div class="message-item" v-for="item in data" :key="item.id">
        <div class="toast-header">
          <strong class="me-auto"><i class="far fa-clock" style="margin-right: 5px;"></i>{{ item.time }}<i class="fas fa-user"></i>{{ item.username }}</strong>
          <small>{{ item.day }}</small>
        </div>
        <div class="toast-body" >
          {{ item.messageText }}
          <!-- ログインしているユーザーと送信者の名前が不一致の場合、編集ボタンを表示しない -->
          <div class="edit-btn" v-if="item.username === this.username">
            <router-link :to= "{name: 'edit', params: {id: item.id}}">
              <button class="btn btn-success" id="edit-btn" type="button">編集<i class="fas fa-edit" style="margin-left: 3px;"></i></button>
            </router-link>
          </div>
        </div>
    </div>
  </div>
  <!-- メッセージがない場合のみ表示する -->
  <p>{{ this.errorMessage }}</p>
  <button id="page-top" href="#"><span><i class="fas fa-chevron-right"></i></span></button>
  <div class="fix">
    <ChatForm message="" @clicked="playSave" :propMessage="propMessage"/>
  </div>
</template>

<script>
import ChatForm from '../components/ChatForm.vue'
import axios from 'axios'
// ローカルストレージからユーザー情報を取得
const postUserName = JSON.parse(localStorage.getItem("vuex"))

export default {
  name: 'HomeView',
  data(){
    return{
      data: {},
      username: postUserName.username,
      errorMessage: "",
      propMessage: "送信"
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
  },
  computed: {    
    HasMessages() {
      return this.$store.getters.getCount
    },
    messages() {
      return this.$store.getters.getAll
    },
  },
  created(){
    this.getMessages()
  },
  methods: {
    // メッセージ一覧を取得する
    getMessages() {  
      axios.get("http://localhost:3000/api/message/get")
        .then(response => {
          // メッセージが一件もない場合に以下のメッセージを表示する。
          if(response.data.length === 0){
            this.errorMessage = "メッセージはありません。"
          }
          this.data = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    // メッセージを送信する
    // Valueはコンポーネント化したChatForm.vueから$emitで入力された内容を取得している
    playSave(value){
      axios.post('http://localhost:3000/api/message/post', value)
          .then((response) => {
              console.log(response);
              if(this.message.id){
                  value.id = this.message.id
              }
              this.$store.commit('save', value)
          })
          .catch((error) => {
              console.error(error);
      });
      this.$router.push('/');
    },
  },
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
    padding: 0 5px 0 10px;
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