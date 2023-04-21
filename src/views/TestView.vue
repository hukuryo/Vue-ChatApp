<template>
  <form action="http://localhost:3000/api/v1/quiz" method="POST">
    <input type="text" name="text">
    <button type="submit">送信</button>
  </form>
  <a href="http://localhost:3000/">ddddd</a>
</template>

<script>
// import axios from 'axios';

// export default {
//   data() {
//     return {
//       text: "",
//     };
//   },
//   methods: {
//     submitForm() {
//       axios
//         .post("http://localhost:3000/submit-form", {
//           mytext: this.text,
//         })
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     },
//   },
// };
</script>