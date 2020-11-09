import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// 将vue实例作为事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')