<template>
  <div class="login-form text-center form-signin" >
    <form>
      <h1 class="h3 mb-3 fw-normal">ログイン</h1>
      <div class="form-floating">
        <input id="name" class="form-control" type="text" v-model="username">
        <label for="floatingInput">ユーザー名</label>
      </div>
      <div class="form-floating">
        <input id="password" class="form-control" type="password" placeholder="Password" v-model="pass">
        <label for="floatingPassword">パスワード</label>
      </div>

      <div class="checkbox mb-3">
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit" @click="login()" :disabled="!username">ログイン</button>
    </form>
    <router-link class="signin-link btn btn-success"  to="/signup">ユーザー登録</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      pass: '',
      data: {}
    }
  },
  mounted(){
    this.data = JSON.parse(localStorage.getItem("userData"))
  },
  methods: {
    login () {
      const name = this.data.username
      const pass = this.data.password
      console.log(name)
      console.log(pass)
      console.log(this.username)
      console.log(this.pass)
      if(this.username === name && this.pass === pass){
        this.$store.commit('setUsername', this.username)
        this.$router.push({path: '/'}) 
      } else {
          window.alert('ユーザー名かパスワードが違います。')
      }
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

