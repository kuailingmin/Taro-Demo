import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import getPlanStore from '../../store/plan/getPlanStore'
import './getPlan.scss'

type getPlanProps = {
    getPlanStore: getPlanStore
}
interface GetPlan {
    props: getPlanProps
}
  

@inject('getPlanStore')
@observer
class GetPlan extends PureComponent{
    config: Config = {
      navigationBarTitleText: '获取采购计划'
    }
    constructor(){
        super(...arguments)
        this.state = {
          typeVal: '',
          isOpen: false,
          count:20
        }
    }
    componentWillMount(){
      this.setState({
        typeVal:this.props.getPlanStore.type[1]
      })
    }

    componentDidMount () { }

    typeEvent(){
      this.setState({
        isOpen: true
      })
    }
    handleCancelEvent(){
      this.setState({
        isOpen: false
      })
    }
    render(){
        //类型列表数据渲染
       let sheetItem = this.props.getPlanStore.type.map((item,index) => {
            return (
              <AtActionSheetItem key={String(index)}>{item}</AtActionSheetItem>
            )
        })
        return(
            <View className='getPlan'>
                {/* <View className="iconfont icon-dingwei1 font_size"></View> */}
                <View className='header'>
                  <View className='typebtn' onClick={this.typeEvent} >
                   <Text>{this.state.typeVal}</Text>
                   <View className="iconfont icon-dingwei1"></View>
                  </View>
                  <Text className='count'>门店要货品项（{this.state.count}）种</Text>
                </View>

                <AtActionSheet isOpened={this.state.isOpen} 
                  cancelText='取消'
                  onCancel={ this.handleCancelEvent }
                  onClose={ this.handleCancelEvent }
                  >
                  {sheetItem}
                </AtActionSheet>
            </View>
        )
    }
}

export default GetPlan as ComponentType