<template>
    <form>
        <p>半角英数字のみで入力してください</p>
        <div class="form-floating">
            <input id="name" class="form-control" type="text" v-model="username"  @input="validateInput">
            <label for="floatingInput">ユーザー名</label>
        </div>
        <div class="form-floating">
            <input id="password" class="form-control" type="password" placeholder="Password" v-model="pass">
            <label for="floatingPassword">パスワード</label>
        </div>
        <div class="checkbox mb-3">
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit" @click="actionChangeButton">{{ buttonText }}</button>
    </form>
</template>
<script>
export default {
    name: 'AuthenticationForm',
    data () {
        return {
            username: '',
            pass: '',
        }
    },
    props: [
        'buttonText'
    ],
    methods: {
        // ページ名に応じて、動かすメソッドを変える
        actionChangeButton() {
            if (this.$route.name === 'login') {
                this.login()
            } else if (this.$route.name === 'signup') {
                this.registration()
            }
        },
        // ログインするためのメソッド
        login(){
            let userContent = {
                username: this.username,
                pass: this.pass,            
            }
            // 入力された内容をLoginView.vueファイルのメソッドに渡す。
            this.$emit('clicked', userContent)
        },
        // ユーザー登録をするメソッド
        registration(){
            let userContent = {
                username: this.username,
                pass: this.pass,            
            }
            if(userContent.username === ""){
                window.alert('ユーザー名が入力されていません')
                return
            }
            if(userContent.pass === ""){
                window.alert('パスワードが入力されていません')
                return
            }
            // 入力された内容をSignUpView.vueファイルのメソッドに渡す。
            this.$emit('clicked', userContent)
        },
        validateInput() {
            this.username = this.username.replace(/[^a-zA-Z0-9]/g, '');
        }
    },
}
</script>