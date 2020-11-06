import axios from 'axios'
export function request(config) {
    //1.创建axios的实例 
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout: 3000
    })

    //2.axios的拦截器
    instance.interceptors.request.use(config => {
            //成功，比如config的一些信息不符合服务器的要求
            // console.log(config);
            return config;
        }, err => {
            // console.log(err);
        })
        // 3.发送真正的网络请求
    return instance(config)
}