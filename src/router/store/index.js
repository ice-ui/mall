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
            cartList: []
        },
        mutations: {
            addCounter(state, payload) {
                payload.count++;
            },
            addToCart(state, payload) {
                state.cartList.push(payload);
            }
        },
        actions: {
            addCart(context, payload) {
                //payload新添加的商品
                // 查找之前数组中是否有该商品
                let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                if (oldProduct) {
                    // oldProduct.count += 1;
                    context.commit('addCounter', oldProduct)
                } else {
                    payload.count = 1;
                    // context.state.cartList.push(payload);
                    context.commit('addToCart', payload);
                }
            }
        }
    })
    // 挂载到vue实例上
export default store