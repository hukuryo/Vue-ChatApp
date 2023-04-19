import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'


const vuexPersist = new VuexPersistence({
  storage: localStorage
})

export default createStore({
  state: {
    messageCount: 0,
    messages: [],
    userCount: 0,
    users: [],
    username: null,
    pass: null
  },
  getters: {
    getCount: (state) => {
      return state.messages.length
    },
    getAll: (state) => {
      return state.messages
    },
    getMessageById: (state) => (id) => {
      return state.messages.find(messages => messages.id === id)
    },
    loggedIn: (state) => {
      return Boolean(state.username)
    }
  },
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
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
  plugins: [vuexPersist.plugin]
})