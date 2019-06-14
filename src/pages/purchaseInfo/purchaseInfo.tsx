import { ComponentType } from "react"
import { View,Text,Button,Input } from '@tarojs/components'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtIcon, } from 'taro-ui'

import { observer, inject } from '@tarojs/mobx'

//使用数据源
import purchaseStore from '../../store/purchase/purchaseStore'

import './purchaseInfo.scss'

type props = {
    purchaseStore:purchaseStore
}
interface PurchaseInfo {
    props: props
}

//连接数据源
@inject('purchaseStore')
@observer
class PurchaseInfo extends PureComponent{
    config: Config = {
      navigationBarTitleText: '查看明细'
    }
    constructor(){
        super(...arguments)
        this.state = {
            isOpen:false,
            isClose:false,
            isUpdate:false,
            shopName:'',
            count:0,
            index: 0,
            upCount:0 //修改数量
        }
    }

    componentWillMount () {
        
       console.log(this.props.purchaseStore.current)
    }
    //创建采购任务
    createPlanEvent(){
        this.setState({
          isOpen:true
        })
    }
    handleCloseEvent(){
        this.setState({
          isOpen:false,
          isClose:false,
          isUpdate:false
        })
    }
    handleConfirmEvent(){
         this.handleCloseEvent()
    }
    // 修改
    updateEvent(item){
       console.log(item)
       this.setState({
           isUpdate:true,
           shopName: item.shop,
           count: item.count
       })
    }
    // 关闭采购任务
    closeEvent(){
        this.setState({
            isClose:true
        })
    }
    close(){
        console.log('关闭')
        this.handleCloseEvent()
    }
    updateCount (e) {
        console.log(e.detail.value)
        this.setState({
            upCount: e.detail.value
        })
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    }
    // 修改数量确定
    okEvent(){
      
    }
    // 新增要货
    addEvent(){
      Taro.navigateTo({
        url:'/pages/addShop/addShop'
      })

    }
    render(){
        let countList = this.props.purchaseStore.infoList.map((item,index) => {
            return (
                <View className='li' key={index}>
                  <View className='li_left'>
                    <View className='index'>{index + 1}</View>
                    <Text className='txt'>{item.shop}</Text>
                  </View>
                  <View className='update-div'>
                     <Text className='txt'>{item.count}</Text>
                     { (this.props.purchaseStore.current === 0) && <Text className='update' onClick={this.updateEvent.bind(this,item)}>修改</Text>}
                  </View>
                </View>
            )
        })
        
        return(
            <View className='purchaseInfo'>
              <View className='card'>
                <View className='top'>
                 <Text className='code'>asdasdsadaweawe</Text>
                 {
                    (this.props.purchaseStore.current === 0) && <Text className='close' onClick={this.closeEvent}>关闭采购任务</Text>
                 }
                 
                </View>
                <View className='title'>伊利安慕希高端酸奶230g*10瓶</View>
                <View className='list'>
                  <Text className='txt'>要货数量：288909</Text>
                  <Text className='txt'>货品条码：231123123</Text>
                </View>
                <View className='list'>
                  <Text className='txt'>货品单位：瓶</Text>
                  <Text className='txt'>规格/单位：1*10</Text>
                </View>
                <View className='list'>
                  <Text className='txt'>近期采购价：29.90</Text>
                  <Text className='txt'>近期商户：大润发</Text>
                </View>
              </View>

              <View className='goods'>
                <Text className='count'>要货数量</Text>
                { (this.props.purchaseStore.current === 0) &&
                  <View className='add'>
                    <AtIcon value='add' className='icons' size='12' color='#6A4CFF'></AtIcon>
                    <Text className='addtxt' onClick={this.addEvent}>新增要货信息</Text>
                  </View> 
                }
              </View>
              {countList}
              
              {
                (this.props.purchaseStore.current === 1) &&
                <View className='goods'>
                  <Text className='count'>已采订货单</Text>
                </View>
              }
              

              <View className='footer'>
                { (this.props.purchaseStore.current === 0) && <View className='one'>
                      <AtButton type='primary' onClick={this.createPlanEvent}>创建采购任务</AtButton>
                  </View>
                }
                 { (this.props.purchaseStore.current === 1) && 
                   <View className='two twobtn'>
                     <View className='btn'>
                       <AtButton type='primary' onClick={this.createPlanEvent}>创建采购</AtButton>
                     </View>
                     <View className='btn'>
                        <AtButton type='secondary'>结束采购</AtButton>
                     </View>
                  </View>
                }
                
              </View>

              <AtModal
                 isOpened={this.state.isClose}
                 cancelText='取消'
                 confirmText='确认'
                 onClose={ this.handleCloseEvent }
                 onCancel={ this.handleCloseEvent }
                 onConfirm={ this.close }
                 content='\n\r关闭当前任务，则无法开启请确认是否要关闭?'
               >
              </AtModal>

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

              <AtModal isOpened={this.state.isUpdate}>
                <AtModalHeader>{this.state.shopName}</AtModalHeader>
                <AtModalContent>
                   <View className='update-alert'>
                       <Text>要货数量</Text>
                       <Text>{this.state.count}</Text>
                   </View>
                   <View className='update-alert' style='margin-top:10px;'>
                       <Text>修改数量</Text>
                        <Input type='number'
                            placeholder='请输入数量'
                            placeholderStyle='font-size:13px;color:#777;' className='inputfont'
                            onInput={this.updateCount.bind(this)}
                            />
                   </View>
                </AtModalContent>
                <AtModalAction> <Button onClick={this.handleCloseEvent}>取消</Button> <Button onClick={this.okEvent}>确定</Button> </AtModalAction>
               </AtModal>
            </View>
        )
    }
}

export default PurchaseInfo as ComponentType