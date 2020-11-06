import Vue from 'vue'
import Vuex from 'vuex'


import state from './state'
import mutations from './mutations'
import getters from './getters'
// 安装插件
Vue.use(Vuex)
    //创建store对象
const store = new Vuex.Store({
        state: {

        },
        mutations: {

        },
        actions: {

        }
    })
    // 挂载到vue实例上
export default store