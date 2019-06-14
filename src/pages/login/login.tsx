import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton,AtMessage } from 'taro-ui'
import {getGlobal} from '../../util/globalData'
import {taroAjax} from '../../util/utils'
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
class Login extends Component {

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

  componentWillUnmount(){

  }
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
    // 判断参数
    if(this.props.loginStore.account === ''){
      Taro.atMessage({
        'message': '账号不能为空',
        'type': 'error',
      })
      return false
    }
    if(this.props.loginStore.passWord === '') {
      Taro.atMessage({
        'message': '密码不能为空',
        'type': 'error',
      })
      return false
    }
    //调微信登录
    Taro.login({
      success: (res) => {
        // 返回成功操作
        if(res.errMsg === 'login:ok'){
          this.getLogin(res.code)
        }
      }
    })
  }

  getLogin(code){
    // 设置参数
    let data = {
      channel: 'CGB_WEB_CHANNdisposeEL',
      login: this.props.loginStore.account,
      miniProgramCode: code,
      password: this.props.loginStore.passWord
    }

    taroAjax(Taro,getGlobal('url') + '/login',data).then(res => {
      console.log(res)
      if(res.success){
        Taro.setStorageSync('loginStatus',true)
        Taro.setStorageSync('token',res.model.token)
        //登录成功跳转首页
        Taro.reLaunch({
          url:'/pages/index/index?id=1'
        })
      } else {
        console.log(1)
        Taro.showToast({
          title: res.errorMessage,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
 
  render () {
    return (
      <View className='login'>
        <View className='main'>
          <View className='welcome'>欢迎来到采购宝！</View>
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
 