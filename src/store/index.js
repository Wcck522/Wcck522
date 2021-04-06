import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: sessionStorage.getItem('token') || null,
        userInfo: sessionStorage.getItem('userInfo') || null
    },
    getters: {
        getToken(state) {
            if (!state.token) {
                state.token = sessionStorage.getItem('token')
            }
            return state.token;
        },

    },
    mutations: {
        setToken(state, payload) {
            state.token = payload;
        },
        setUser(state,payload){
            state.userInfo=payload;
            sessionStorage.userInfo = payload;
        }
    },
    actions: {
        getUser(context){
            if(!context.state.token){
                context.state.token=sessionStorage.getItem('token')
            }
            let token=context.state.token;
            axios({
                method: 'GET',
                url:'http://47.115.51.185/api/user',
                headers: {
                    'Authori-zation': 'Bearer ' + token
                }
            }).then(d=>{
                console.log(d)
                context.commit('setUser',d.data.data)
                sessionStorage.setItem("setUser", d.data.data)
            })
        },

    },
    modules: {}
})
