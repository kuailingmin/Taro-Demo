import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton,AtMessage } from 'taro-ui'
import loginStore from '../../store/loginStore'

import './login.scss'

type loginStateProps = {
  loginStore: loginStore
}

interface Login {
  props: loginStateProps
}

@inject('loginStore')
@observer
class Login extends PureComponent {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '采购宝'
  }
  data = {
    
  }
  componentWillMount () {
   
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  // 获取输入的账号
  getInputPhone (e) {
    this.props.loginStore.account = e.detail.value
  }
  // 获取密码
  getPassWord (e) {
    this.props.loginStore.passWord = e.detail.value
  }
  // 登录操作
  loginEvent () {
    this.props.loginStore.loginEvent()
  }
  render () {
    return (
      <View className='login'>
        <View className='main'>
          <View className='welcome'>欢迎来到采购宝</View>
          <View className='header'>账号</View>
          <Input type='text' placeholder='请输入手机号' placeholderClass='input_placeholder' onInput={this.getInputPhone} className='inpText'/>
          <View className='header'>密码</View>
          <Input password placeholder='请输入密码' placeholderClass='input_placeholder' onInput={this.getPassWord} className='inpText'/>
        </View>
        <AtButton type='primary' className='loginBtn' onClick={this.loginEvent} >登录</AtButton>
        <AtMessage />
      </View>
    )
  }
}

export default Login as ComponentType
 