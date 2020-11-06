//1.引入vue
import Vue from 'vue'
// 2.引入路由文件
import VueRouter from 'vue-router'


//实现懒加载模式
const Home = () =>
    import ('../views/home/Home')
const Cart = () =>
    import ('../views/cart/Cart')
const Category = () =>
    import ('../views/category/Category')
const Profile = () =>
    import ('../views/profile/Profile')
const Detail = () =>
    import ('../views/detail/Detail')
    // 1.安装插件
Vue.use(VueRouter)
    //2.创建VueRouter对象
const routes = [{
        //    重定向
        path: '',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    }, {
        path: '/cart',
        component: Cart
    }, {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]
const router = new VueRouter({
    routes,
    //设置为history模式
    mode: 'history'
})

//将router对象传入到Vue实例中
export default router