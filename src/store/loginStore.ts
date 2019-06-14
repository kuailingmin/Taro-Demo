import {action, observable } from 'mobx'

class loginStore {
  // 账号
  @observable account:string = ''
  // 密码
  @observable passWord:string = ''

}

export default loginStore