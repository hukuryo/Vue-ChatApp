<template>
  <div class="login-form text-center form-signin" >
    <h1 class="h3 mb-3 fw-normal"><i class="fas fa-sign-in-alt" style="margin-right: 5px;"></i>ログイン</h1>
    <AuthenticationForm  @clicked="login" :buttonText="buttonText"/>
    <router-link class="signin-link btn btn-success"  to="/signup">ユーザー登録</router-link>
  </div>
</template>

<script>
import AuthenticationForm from '../components/AuthenticationForm.vue'
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      pass: '',
      buttonText: 'ログイン'
    }
  },
  components: {
      AuthenticationForm
  },
  created(){
    console.log(this.$route.name)
  },
  methods: {
    // ログインする処理
    login (userContent) {
      try{
        axios.get("http://localhost:3000/api/user/login")
          .then(response => {
            this.userData = response.data;
            const sentUsername = userContent.username;
            const sentPass = userContent.pass;
            for(let i = 0; i <= this.userData.length; i++){
              if(this.userData[i].username === sentUsername && this.userData[i].pass === sentPass){
                this.$store.commit('setUsername', userContent.username);
                this.$router.push('/');
                break
              } else {
                continue
              }
            }
          })
      }catch(e){
        console.log("e")
      }
      setTimeout(function() {
          location.reload();
      }, 1);
    }
  }
}
</script>

<style scoped>
  .login-form {
    width: 70%;
    margin: auto;
    margin-top: 200px;
  }
  .signin-link{
    margin-top: 30px;
  }
</style>

