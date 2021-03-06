import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import allStore from './store'
import {setGlobal} from './util/globalData'
import Index from './pages/index/index'
import './app.scss'
import './icon/iconfont.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/purchase/purchase',
      'pages/purchaseOrder/purchaseOrder',
      'pages/index/index',
      'pages/order/order',
      'pages/shop/shop',
      'pages/shopConfirm/shopConfirm',
    
      'pages/purchaseInfo/purchaseInfo',
      'pages/login/login'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentWillMount () {
    this.globalData()
  }
  
  //设置全局变量
  globalData(){
    //设置http
    setGlobal('url','http://10.0.1.190:8091/cgb')
    //设置登录状态
    if(Taro.getStorageSync('loginStatus') === ''){
      Taro.setStorageSync('loginStatus',false)
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={allStore}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
