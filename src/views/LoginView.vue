<template>
  <div class="login-form text-center form-signin" >
    <form>
    <h1 class="h3 mb-3 fw-normal">ログイン</h1>

    <div class="form-floating">
      <input id="name" class="form-control" type="text" v-model="userId">
      <label for="floatingInput">ユーザー名</label>
    </div>
    <div class="form-floating">
      <input id="password" class="form-control" type="password" placeholder="Password" v-model="pass">
      <label for="floatingPassword">パスワード</label>
    </div>

    <div class="checkbox mb-3">
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit" @click="login()" :disabled="!userId">ログイン</button>
  </form>
   <a class="signin-link btn btn-success" >ユーザー登録</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: '',
      pass: ''
    }
  },
  methods: {
    login () {
      if(this.userId === "fuku" && this.pass === "vue"){
        this.$store.commit('setUserId', this.userId)
        this.$router.push({path: '/'}) 
      } else {
        window.alert('ログイン失敗')
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

