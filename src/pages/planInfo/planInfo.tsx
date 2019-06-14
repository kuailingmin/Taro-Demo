import { ComponentType } from "react"
import { View,Text } from '@tarojs/components'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { AtButton, AtModal } from 'taro-ui'

import { observer, inject } from '@tarojs/mobx'

//使用数据源
import planInfoStore from '../../store/plan/planInfoStore'
import getPlanStore from '../../store/plan/getPlanStore'

import './planInfo.scss'

type planInfoProps = {
    planInfoStore: planInfoStore,
    getPlanStore:getPlanStore
}
interface PlanInfo {
    props: planInfoProps
}

//连接数据源
@inject('planInfoStore')
@inject('getPlanStore')
@observer
class PlanInfo extends PureComponent{
    config: Config = {
      navigationBarTitleText: '查看明细'
    }
    constructor(){
        super(...arguments)
        this.state = {
            isOpen:false
        }
    }

    componentWillMount () {
       console.log(this.props.planInfoStore.info)
       console.log(this.props.getPlanStore.type[0])
    }
    //创建采购任务
    createPlanEvent(){
        this.setState({
          isOpen:true
        })
    }
    handleCloseEvent(){
        this.setState({
          isOpen:false
        })
    }
    handleConfirmEvent(){
         this.handleCloseEvent()
    }
   
    render(){
        let countList = this.props.planInfoStore.infoList.map((item,index) => {
            return (
                <View className='li' key={index}>
                  <View className='li_left'>
                    <View className='index'>{index + 1}</View>
                    <Text className='txt'>{item.shop}</Text>
                  </View>
                  <Text className='txt'>{item.count}</Text>
                </View>
            )
        })
        
        return(
            <View className='info'>
              <View className='card'>
                <View className='title'>伊利安慕希高端酸奶230g*10瓶</View>
                <View className='list'>
                  <Text className='txt'>要货数量：288909</Text>
                  <Text className='txt'>门店数量：2323</Text>
                </View>
                <View className='list'>
                  <Text className='txt'>货品单位：瓶</Text>
                  <Text className='txt'>货品规格：1*10</Text>
                </View>
                <View className='list'>
                  <Text className='txt'>货品编码：6924115086039</Text>
                  <Text className='txt'>货品条码：6924115086039</Text>
                </View>
              </View>

              <View className='goods'>要货数量</View>
              {countList}

              <View className='footer'>
                 <View className='main'>
                   <AtButton type='primary' onClick={this.createPlanEvent}>创建采购任务</AtButton>
                 </View>
              </View>

              <AtModal 
                 isOpened={this.state.isOpen}
                 cancelText='取消'
                 confirmText='立刻创建'
                 onClose={ this.handleCloseEvent }
                 onCancel={ this.handleCloseEvent }
                 onConfirm={ this.handleConfirmEvent }
                 content='\n\r确认创建采购任务？'
               >
              </AtModal>
            </View>
        )
    }
}

export default PlanInfo as ComponentType