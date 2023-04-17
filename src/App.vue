<template>
  <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <div class="d-flex align-items-center mb-3 ml-4 mb-md-0 me-md-auto text-dark text-decoration-none" style="margin-left: 50px;">
        <span class="fs-4">Vue-Chat</span>
      </div>
      <ul class="nav nav-pills">
        <li class="nav-item"><router-link class="nav-link active" aria-current="page" to="/">トップページ</router-link></li>
        <li class="nav-item"><button class="nav-link btn btn-denger" @click="logout()" v-if="$store.getters.loggedIn">ログアウト</button>
        </li>
      </ul>
    </header>
  <router-view/>
</template>
<script>
  export default {
    methods: {
      logout () {
        this.$store.commit('setUserId', '')
        if (this.$route.meta.requiresAuth) {
          this.$router.push({
            path: '/login',
            query: { redirect: this.$route.fullPath }
          })
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
  text-align: center;
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
</style>
