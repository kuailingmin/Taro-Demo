import { ComponentType } from 'react'
import Taro, { PureComponent,Config } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton, AtModal } from 'taro-ui'
import indexStore from '../../store/indexStore'
import './index.scss'

type indexStateProps = {
    indexStore: indexStore
}
interface Index {
    props: indexStateProps
}

@inject('indexStore')
@observer
class Index extends PureComponent {
    config: Config = {
      navigationBarTitleText: '选择采购分类'
    }
    constructor(){
        super()
    }
    componentWillMount(){
      console.log(this.$router.params)
    }
    // 选择城市
    onCityChange = e => {
      this.props.indexStore.setCity(this.props.indexStore.city[e.detail.value])
    }
    // 选择类型
    onTypeChange = e => {
      this.props.indexStore.setType(this.props.indexStore.type[e.detail.value])
    }
    // 选择日期
    onDateChange = e => {
      this.props.indexStore.setDateSel(e.detail.value)
    }
    // 显示登录提示框
    showLogin(){
      this.props.indexStore.setLogin(true)
    }
    hiddenLogin(){
      this.props.indexStore.setLogin(false)
    }
    // 返回登录页
    goToLogin() {
      Taro.navigateTo({
        url:'/pages/login/login'
      })
      this.hiddenLogin()
    }
    // 去采购任务
    goToPurchase() {
      Taro.navigateTo({
        url:'/pages/purchase/purchase'
      })
    }
    // 采购单查询
    goToOrder(){
      Taro.navigateTo({
        url:'/pages/order/order'
      })
    }

    render(){
        const {city,selectorCity,dateSel,type,selectorType,isLogin} = this.props.indexStore
        
        return (
            <View className='index'>
                <Picker mode='selector' range={city} onChange={this.onCityChange}>
                    <View className='itemdiv'>
                          <Text className='txt'>选择城市</Text>
                          <View className='picker'>
                             {selectorCity}
                          </View>
                    </View>
                </Picker>
                {
                  selectorCity !== '' && <Picker mode='selector' range={type} onChange={this.onTypeChange}>
                    <View className='itemdiv'>
                          <Text className='txt'>选择分类</Text>
                          <View className='picker'>
                              {selectorType}
                          </View>
                    </View>
                  </Picker>
                }
                {
                  selectorType !== '' && <Picker mode='date' onChange={this.onDateChange}>
                      <View className='itemdiv'>
                            <Text className='txt'>汇总日期</Text>
                            <View className='picker'>
                                  {dateSel}
                            </View>
                      </View>
                  </Picker>
                }
                
                <View className='btncss'>
                    <AtButton type='primary' disabled={dateSel === '' ? true : false} onClick={this.goToPurchase}>进入采购任务</AtButton>
                </View>
                <View className='bottomcss'>
                     <AtButton circle  className='btncom left' onClick={this.showLogin}>退出登录</AtButton>
                     <AtButton circle type='secondary' className='btncom right' onClick={this.goToOrder} >采购单查询</AtButton>
                </View>

                <AtModal
                    isOpened = {isLogin}
                    title=''
                    cancelText='取消'
                    confirmText='确认'
                    onClose={ this.hiddenLogin }
                    onCancel={ this.hiddenLogin }
                    onConfirm={ this.goToLogin }
                    content='\r\n请确认是否退出登录？'
                    />
            </View>
        )
    }
}

export default Index as ComponentType<indexStateProps>