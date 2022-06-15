//对于axios进行二次封装
import axios from "axios"

//底下的代码也是创建axios实例
let requests = axios.create({
  //基础路径
  baseURL: "/api",
  //请求不能超过5S
  timeout: 5000,
})

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  //config是配置对象，放入请求头中
  //用户首次访问，如果本地已经有了uuid_token
//   if(store.state.detail.uuid_token){
//     //请求头添加一个字段(userTempId):需要后台配合
//     config.headers.userTempId = store.state.detail.uuid_token;
//   }
//   //当用户不是首次登录时，本地会有一个token,需要携带token带给服务器再次登录验证访问数据
//   if(store.state.user.token){
//     config.headers.token = store.state.user.token;
//   }
  return config
})

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {
    //相应成功做的事情
    return res.data
  },
  (err) => {
    // alert("服务器响应数据失败");
    console.log("服务器响应数据失败",err)
  }
)
//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
export default requests
