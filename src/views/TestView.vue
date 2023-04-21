<template>
  <form action="http://localhost:3000/api/v1/quiz" method="POST" >
    <input type="text" name="name">
    <input type="text" name="text">
    <button type="submit">送信</button>
  </form>
</template>

<script>
export default {
    // methods: {
    //     migration(){
    //         this.$router.push({path: '/'})
    //     }
    // }
}

</script>