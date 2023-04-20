<template>
  <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <div class="d-flex align-items-center mb-3 ml-4 mb-md-0 me-md-auto text-dark text-decoration-none" style="margin-left: 50px;">
        <span class="fs-4"><i class="far fa-comment-dots"></i>Vue-Chat</span>
      </div>
      <ul class="nav nav-pills">
        <li class="nav-item"><router-link class="btn btn-primary" aria-current="page" v-if="$store.getters.loggedIn" to="/"><i class="fas fa-home"></i>トップページ</router-link></li>
        <li class="nav-item"><button class="btn btn-danger" @click="logout()" v-if="$store.getters.loggedIn" style="margin: 0 20px;"><i class="fas fa-sign-out-alt" style="margin-right: 5px;"></i>ログアウト</button>
        </li>
      </ul>
    </header>
  <router-view/>
</template>

<script>
  export default {
    methods: {
      logout () {
        const confirm = window.confirm("ログアウトしてもよろしいですか？")
        if(confirm){
          this.$store.commit('setUsername', '')
          if (this.$route.meta.requiresAuth) {
            this.$router.push({
              path: '/login',
              query: { redirect: this.$route.fullPath }
            })
          }
        }else{
          return
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
a{
  list-style: none;
}
.fa-comment-dots{
  padding-right: 5px;
}
</style>
