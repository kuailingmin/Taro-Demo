import {action, observable } from 'mobx'
import Taro from '@tarojs/taro'

class loginStore {
  @observable
  // 账号
  account:string = ''
  // 密码
  passWord:string = ''

  // 登录事件
  @action
  loginEvent= (account:string,passWord:string) =>{
    if(account === ''){
      Taro.atMessage({
        'message': '账号不能为空',
        'type': 'error',
      })
      return false
    }
    if(passWord === '') {
      Taro.atMessage({
        'message': '密码不能为空',
        'type': 'error',
      })
      return false
    }
    
    Taro.login({
      success: function(res){
        console.log(res)
      }
    })

     console.log(account)
     console.log(passWord)
  }
}

export default loginStore