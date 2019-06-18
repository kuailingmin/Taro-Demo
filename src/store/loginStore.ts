import {action, observable } from 'mobx'

class loginStore {
  // 账号
  @observable account:string = ''
  // 密码
  @observable passWord:string = ''
  // 用户手机信息
  @observable systemInfo = {
      benchmarkLevel: '',
      brand: '',
      language: '',
      model: '',
      pixelRatio: '',
      platform: '',
      screenHeight: '',
      screenWidth: '',
      sdkversion: '',
      system: '',
      version: ''
  }
}

export default loginStore