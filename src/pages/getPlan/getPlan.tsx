import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View,Text,Radio,ScrollView} from '@tarojs/components'
import { AtActionSheet,AtActionSheetItem,AtButton,AtModal} from "taro-ui"
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
          isOpen: false, //是否打开类型选择框
          isOpenModal: false, //是否打开Modal框
          count:20, //货品数量
          time:'2019/05/01 17:28:29', // 汇总时间
          checked:false, //全选
          number: 0, //采购数量
          planList:[
            {
              title:'精品红富士',
              cont: 30,
              unit: 'kg',
              shopCount:2330,
              guige: '约500g',
              checked:false
            },
            {
              title:'精品红富士',
              cont: 30,
              unit: 'kg',
              shopCount:2330,
              guige: '约500g',
              checked:false
            },
            {
              title:'精品红富士',
              cont: 30,
              unit: 'kg',
              shopCount:2330,
              guige: '约500g',
              checked:false
            },
            {
              title:'精品红富士',
              cont: 30,
              unit: 'kg',
              shopCount:2330,
              guige: '约500g',
              checked:false
            },
            {
              title:'精品红富士',
              cont: 30,
              unit: 'kg',
              shopCount:2330,
              guige: '约500g',
              checked:false
            },
            {
              title:'精品红富士',
              cont: 30,
              unit: 'kg',
              shopCount:2330,
              guige: '约500g',
              checked:false
            },
            {
              title:'精品红富士',
              cont: 30,
              unit: 'kg',
              shopCount:2330,
              guige: '约500g',
              checked:false
            },
            {
              title:'精品红富士',
              cont: 30,
              unit: 'kg',
              shopCount:2330,
              guige: '约500g',
              checked:false
            }
          ],
          allcheck:false
        }
    }
    componentWillMount(){
      this.setState({
        typeVal:this.props.getPlanStore.type[1]
      })
    }

    componentDidMount() { }

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

    //全选选
    allSelectEvent(){
      let list = this.state.planList.map(item => {
         item.checked = !item.checked
         return item
      })
     
      this.setState({
        planList: list,
        allcheck: !this.state.allcheck
      })
      console.log(this.state.allcheck)
    }

    //选择
    scrollToLowerEvent(){
      
    }
    goToInfoEvent(){
      Taro.navigateTo({
          url:'/pages/planInfo/planInfo'
      })
    }
    checkEvent(id,e){
      console.log(e)
      // 获取修改索引
      let sid = id
      // 根据索引处理数据
      let list = this.state.planList.map((item,index) => {
        if(index === sid){
          item.checked = !item.checked
        }
        return item
      })
      // 判断是否全部选择
      let isCheck = ''
      for(let i = 0; i < list.length; i++){
        if(!list[i].checked){
          isCheck = false
        } else {
          isCheck = true
        }
      }
      
      this.setState({
        planList: list,
        allcheck: isCheck
      })
    }
    
    // 提示框关闭
    handleCloseEvent(){
      this.setState({
        isOpenModal:false
      })
    }

    handleConfirmEvent(){
      this.handleCloseEvent()
    }

    //创建采购任务
    createPlanEvent(){
      this.setState({
        isOpenModal:true
      })
    }

    render(){
        //类型列表数据渲染
       let sheetItem = this.props.getPlanStore.type.map((item,index) => {
            return (
              <AtActionSheetItem key={String(index)}>{item}</AtActionSheetItem>
            )
        })
        let shopItem = this.state.planList.map((item,index) => {
            return(
               <View className='list' key={index}>
                    <View className='header'>
                      <View className='header_left'>
                        <Radio value='选中' color='#8a73ff' checked={item.checked} onClick={this.checkEvent.bind(this,index)} ></Radio>
                        <Text className='title'>{item.title}</Text>
                      </View>
                      <View className='header_right' onClick={this.goToInfoEvent} >
                        <Text className='info'>门店明细</Text>
                        <View className='iconfont iconmore1 more'></View>
                      </View>
                    </View>
                    <View className='item'>
                      <Text className='txt'>要货数量：{item.cont}</Text>
                      <Text className='txt'>门店数量：{item.shopCount}</Text>
                    </View>
                    <View className='item'>
                      <Text className='txt'>货品单位：{item.unit}</Text>
                      <Text className='txt'>货品规格：{item.guige}</Text>
                    </View>
               </View>
            )
        })
        return(
            <View className='getPlan'>
                {/* <View className="iconfont icon-dingwei1 font_size"></View> */}
              <View className='top'>
                <View className='header'>
                  <View className='typebtn' onClick={this.typeEvent} >
                   <Text>{this.state.typeVal}</Text>
                   <View className="iconfont icon-dingwei1"></View>
                  </View>
                  <Text className='count'>门店要货品项（{this.state.count}）种</Text>
                </View>
                <View className='time'>
                  当前汇总时间：{this.state.time}
                </View>
              </View>
              <ScrollView 
                   scrollY 
                   scrollWithAnimation
                   scrollTop={0}
                   className='scrollView'
                   style='margin-top:80px;'
                   onScrollToLower={this.scrollToLowerEvent}
               >
                 {shopItem}
              </ScrollView>

              <View className='bottom_bar'>
                  <Radio value='选中' checked={this.state.allcheck} color='#8a73ff' className='all_sel' onClick={this.allSelectEvent} >全选</Radio>
                  <AtButton type='primary' size='small' className='create_plan' onClick={this.createPlanEvent}>创建采购任务({this.state.number})</AtButton>
              </View>

              <AtActionSheet isOpened={this.state.isOpen} cancelText='取消' onCancel={ this.handleCancelEvent }
                onClose={ this.handleCancelEvent }>
                  {sheetItem}
              </AtActionSheet>
              <AtModal 
                 isOpened={this.state.isOpenModal}
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

export default GetPlan as ComponentType