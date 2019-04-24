import {action, observable } from 'mobx'
import Taro from '@tarojs/taro'
import {isPoneAvailable,interceptor} from '../util/utils'
import {getGlobal} from '../util/globalData'
class loginStore {
  // 账号
  @observable account:string = ''
  // 密码
  @observable passWord:string = ''

  // 登录事件
  @action
  loginEvent= () =>{
    console.log(this.account)
    let isph = isPoneAvailable(this.account)
    console.log(isph)
    if(this.account === ''){
      Taro.atMessage({
        'message': '账号不能为空',
        'type': 'error',
      })
      return false
    }
    if(this.passWord === '') {
      Taro.atMessage({
        'message': '密码不能为空',
        'type': 'error',
      })
      return false
    }
    
    Taro.addInterceptor(interceptor)

    Taro.request({
      url: getGlobal('url') + '/shopRead/getCityFirstShopAndNearByShopList',
      data: {
        cityCode: ''
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => console.log(res.data))
    
    // Taro.login({
    //   success: function(res){
    //     console.log(res)
    //     Taro.reLaunch({
    //       url:'/pages/index/index?id=1'
    //     })
    //   }
    // })
  }
}

export default loginStore