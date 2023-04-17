import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'


const vuexPersist = new VuexPersistence({
  storage: localStorage
})

export default createStore({
  state: {
    count: 0,
    messages: []
  },
  getters: {
    getCount: (state) => {
      return state.messages.length
    },
    getAll: (state) => {
      return state.messages
    },
    getMessageById: (state) => (id) => {
      // IDと一致したメモを取り出す処理
      return state.messages.find(messages => messages.id === id)
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
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})