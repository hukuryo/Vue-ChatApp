<template>
  <div class="login-form text-center form-signin" >
    <h1 class="h3 mb-3 fw-normal"><i class="fas fa-user-plus" style="margin-right: 3px;"></i>ユーザー登録</h1>
    <AuthenticationForm  @clicked="signup" :buttonText="buttonText"/>
    <router-link class="signin-link btn btn-success"  to="/login">ログイン</router-link>
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
      buttonText: 'ユーザー登録'
    }
  },
  components: {
    AuthenticationForm
  },
  methods: {
    // ユーザー情報を保存する処理
    // 引数のuserContentはAuthenticationFormファイルから$emitで入力された内容が渡されている。
    signup(userContent){
      // axiosを使ってNode.jsにAPIリクエストを送る
      axios.post('http://localhost:3000/api/user/registration', userContent)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
      });
      window.alert('ユーザー登録が完了しました。')
      this.$router.push('/login');
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