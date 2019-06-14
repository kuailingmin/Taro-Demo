//拦截器
const interceptor = (chain):object => {
  const requestParams = chain.requestParams
  return chain.proceed(requestParams)
    .then(res => {
      // 如果未登录跳转登录页
      // wx.reLaunch({
      //   url:'/pages/login/login'
      // })
      return res
    })
}

//Ajax封装
export const taroAjax = (Taro,url:string,data) => {
   // 添加拦截器
   Taro.addInterceptor(interceptor)
   return new Promise(function(resolve, reject){
      Taro.request({
        url: url,
        data:data,
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'token': Taro.getStorageSync('token') || ''
        },
        success: function (res) {
          resolve(res.data)
        }
      })
   })
}

//手机号验证
export const isPoneAvailable = (phone:string):boolean => {
  const myreg = /^[1][0-9][0-9]{9}$/;
  if (!myreg.test(phone)) {
   return false;
  }
 return true;
}