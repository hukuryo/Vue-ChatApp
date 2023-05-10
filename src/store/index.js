import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'

// Vuex-persistを使えるようにするための記述
const vuexPersist = new VuexPersistence({
  storage: localStorage
})

export default createStore({
  state: {
    messageCount: 0,
    messages: [],
    userCount: 0,
    users: []
  },
  getters: {
    getCount: (state) => {
      return state.messages.length
    },
    getUsername: (state) => {
      return state.users
    },
    getAll: (state) => {
      return state.messages
    },
    getMessageById: (state) => (id) => {
      return state.messages.find(messages => messages.id === id)
    },
    loggedIn: (state) => {
      return Boolean(state.username)
    },
  },
  mutations: {
    // Vuex-persistを使えるようにするための記述
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    // メッセージ内容を保存
    save(state, newMessage) {
      if(newMessage.id){
        let x = state.messages.find(messages => messages.id === newMessage.id)
        x.content = newMessage.content
      }else{
        newMessage.id = ++state.messageCount
        state.messages.unshift(newMessage)
      }
    },
    userSave(state, newUser){
      if(newUser.id){
        let x = state.users.find(users => users.id === newUser.id)
        x.username = newUser.username
      }else{
        newUser.id = ++state.messageCount
        state.users.unshift(newUser)
      }
    },
    delete(state, id){
      state.messages = state.messages.filter(message => message.id !== id)
    },
    setUsername(state, username) {
      state.username = username
    },
    setPass(state, pass) {
      state.pass = pass
    }
  },
  actions: {
  },
  modules: {
  },
  
  // Vuex-persistを使えるようにするための記述
  plugins: [vuexPersist.plugin]
})