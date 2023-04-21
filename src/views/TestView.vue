<template>
  <form action="http://localhost:3000/api/v1/quiz" method="POST" >
    <input type="text" name="name">
    <input type="text" name="text">
    <button type="submit">送信</button>
  </form>
  <button @click="reception">JSONデータをもらう</button>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    // JSONデータをもらう
    reception(){
      axios.get("http://localhost:3000/api/v1/quiz")
        .then(response => {
          console.log(response)
          console.log('iddiiii')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>