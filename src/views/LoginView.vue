<template>
  <div class="login-form text-center form-signin" >
    <form>
      <h1 class="h3 mb-3 fw-normal"><i class="fas fa-sign-in-alt" style="margin-right: 5px;"></i>ログイン</h1>
      <div class="form-floating">
        <input id="name" class="form-control" type="text" v-model="username">
        <label for="floatingInput">ユーザー名</label>
      </div>
      <div class="form-floating">
        <input id="password" class="form-control" type="password" placeholder="Password" v-model="pass">
        <label for="floatingPassword">パスワード</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit" @click="login" :disabled="!username">ログイン</button>
    </form>
    <router-link class="signin-link btn btn-success"  to="/signup">ユーザー登録</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      pass: '',
    }
  },
  methods: {
    login () {
      try{
        axios.get("http://localhost:3000/api/user/login")
          .then(response => {
            this.userData = response.data
            const sentUsername = this.username
            const sentPass = this.pass
            // console.log(this.userData.length)
            for(let i = 0; i <= this.userData.length; i++){
              if(this.userData[i].username === sentUsername && this.userData[i].pass === sentPass){
                this.$store.commit('setUsername', this.username)
                this.$router.push('/')
                break
              } else {
                continue
              }
            }
          })
      }catch(e){
         window.alert('ユーザー名かパスワードが違います。')
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

