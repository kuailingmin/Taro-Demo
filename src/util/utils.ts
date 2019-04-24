//拦截器

export const interceptor = (chain):object => {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  console.log(`http ${method || 'GET'} --> ${url} data: `, data)
  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${url} result:`, res)
      return res
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