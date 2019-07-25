import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        count: 1
    },
    getters: {
        countPlus: state => state.count + 1,
        countReduce: (state, getters) => {
            return getters.countPlus -10
        }
            
    },
    mutations: {
        reduce(state, v) {
            state.count = 15 + v
        }
    },
    actions: {
        kkkk(context, v) {
            return new Promise((resolve, reject) => {
                context.commit('reduce', v)
                    resolve('b')
                
            })
            
        }
    }
})

export default store