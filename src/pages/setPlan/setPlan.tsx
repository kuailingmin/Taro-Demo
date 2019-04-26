import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import setPlanStore from '../../store/plan/setPlanStore'
import './setPlan.scss'

type setPlanProps = {
    setPlanStore: setPlanStore
}
interface SetPlan {
    props: setPlanProps
}

@inject('setPlanStore')
@observer
class SetPlan extends PureComponent{
    config: Config = {
      navigationBarTitleText: '制定采购计划'
    }
    render(){
        return(
            <View></View>
        )
    }
}

export default SetPlan as ComponentType