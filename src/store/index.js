import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'


const vuexPersist = new VuexPersistence({
  storage: localStorage
})

export default createStore({
  state: {
    count: 0,
    messages: [],
    userId: ''
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
      return Boolean(state.userId.trim())
    }
  },
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    save(state, newMessage) {
      if(newMessage.id){
        let x = state.messages.find(messages => messages.id === newMessage.id)
        x.content = newMessage.content
      }else{
        newMessage.id = ++state.count
        state.messages.unshift(newMessage)
      }
    },
    delete(state, id){
      state.messages = state.messages.filter(message => message.id !== id)
    },
    setUserId(state, userId) {
      state.userId = userId
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})