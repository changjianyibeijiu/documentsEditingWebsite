import axios from 'axios'  //http://www.axios-js.com/zh-cn/docs/#axios-create-config
import {getToken,setToken,reMoveToken} from './auth';
import {Modal,Button} from 'antd';



//创建请求实例
const service = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    timeout: 5000
})


//实例方法，拦截请求
service.interceptors.request.use(
    (config) =>{
            config.headers['authorization'] = getToken() //将口令加入请求头中
        return config;
    },
    (error)=>{
        console.log(error)
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response)=>{
        const data = response.data
        console.log(data);
        if(data.code==200){  //服务器返回200表示正确，否则出错
            if(data.staus == 700){
                //登录成功保持token
                console.log(response.headers);
                console.log(response.headers.authorization);
                setToken(response.headers.authorization);
            }
            return data;
        }
        else if(data == 201){
            const modal = Modal.info({});

        }
        else{
            return Promise.reject(new Error(data.mesage|| 'Error')) //抛出错误
        }
    },
    (error)=>{
        console.log(error)
        return Promise.reject(error)
    }
)

export default service;