import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './plan.scss'
class Plan extends PureComponent{
    config: Config = {
      navigationBarTitleText: '采购计划'
    }
    getPlanEvent(){
      Taro.navigateTo({
          url:'/pages/getPlan/getPlan'
      })
    }
    setPlanEvent(){
      Taro.navigateTo({
          url:'/pages/setPlan/setPlan'
      })
    }
    render() {
        return(
           <View className='planIndex'>
               <AtButton type='primary' className='btn' onClick={this.getPlanEvent} >获取采购计划</AtButton>
               <AtButton type='secondary' onClick={this.setPlanEvent} >制定采购计划</AtButton>
           </View>
        )
    }
}

export default Plan as ComponentType