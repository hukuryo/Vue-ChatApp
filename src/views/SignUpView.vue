<template>
  <div class="login-form text-center form-signin" >
    <form>
        <h1 class="h3 mb-3 fw-normal">ユーザー登録</h1>
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
        <button class="w-100 btn btn-lg btn-primary" type="submit" @click="signup()">ユーザー登録</button>
    </form>
    <router-link class="signin-link btn btn-success"  to="/login">ログイン</router-link>
  </div>
</template>
<script>
export default {
    
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