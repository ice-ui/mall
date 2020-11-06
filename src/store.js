import Vue from 'vue'
import Vuex from 'vuex'
import getters from './router/store/getters'
// 安装插件
Vue.use(Vuex)
    //创建store对象
const store = new Vuex.Store({
        state: {
            // 存储购物车添加进来的信息
            cartList: []
        },
        mutations: {
            // 数据的修改都在这里面进行
            //mutations中的每个方法尽可能完成的事件比较单一一点
            addCounter(state, payload) {
                payload.count++
            },
            addToCart(state, payload) {
                state.cartList.push(payload)
            }

        },

        actions: {
            addCart(context, payload) {
                //1.查找之前数组中是否有该商品
                let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                    //2.判断oldProduct
                if (oldProduct) {
                    // oldProduct.count += 1
                    context.commit('addCounter', oldProduct)
                } else {
                    payload.count = 1
                        // context.state.cartList.push(payload)
                    context.commit('addToCart', payload)
                }
            }
        },
        getters
    })
    // 挂载到vue实例上
export default store