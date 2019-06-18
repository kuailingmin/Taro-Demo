import { ComponentType } from "react"
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { AtButton, AtModal } from 'taro-ui'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import purchaseStore from '../../store/purchase/purchaseStore'

import './purchase.scss'

type props = {
    purchaseStore: purchaseStore
}

interface Purchase {
    props: props
}

@inject('purchaseStore')
@observer
class Purchase extends PureComponent{
    config: Config = {
        navigationBarTitleText: '商品采购列表'
    }
    constructor () {
        super()
    }
    // 搜索事件
    onInputEvent(){

    }
    // 下拉刷新数据
    onScrollToLower(){
        const { infoList } = this.props.purchaseStore
        let arr = infoList.concat(infoList)
        this.props.purchaseStore.setInfoList(arr)
    }

    // 跳转详情页
    goToInfo(t){
        this.$preload('name', t)
        Taro.navigateTo({
            url:'/pages/purchaseInfo/purchaseInfo'
        })
    }

    //结束采购操作
    endEvent(n,v){
        this.setEndFrame(true)
        this.props.purchaseStore.setContext(n,v)
    }

    //结束采购提示框
    endClose(){
        this.setEndFrame(false)
    }
    endConfirm(){
        this.setEndFrame(false)
    }
    setEndFrame(v){
        this.props.purchaseStore.setEndFrame(v)
    }
    // 跳转商品采购
    goToOrder(t){
        this.$preload('name',t)
        Taro.navigateTo({
            url:'/pages/purchaseOrder/purchaseOrder'
        })
    }
    render(){
       const { infoList,isOpenEnd,context } = this.props.purchaseStore
       let findItem = infoList.slice().map((item,index) => {
           return (
               <View className='list' key={index}>
                   <View className='title'>
                        <Text>{item.title}</Text>
                        <Text className='unit'>{item.unit}</Text>
                    </View>
                   <View className='node' style='margin-bottom:6px;'>
                       <Text>最高: {item.hight}</Text>
                       <Text>最低: {item.low}</Text>
                       <Text>平均: {item.ping}</Text>
                   </View>
                   <View className='node'>
                       <Text>要货门店: {item.shopCount}</Text>
                       <Text>未下单门店: {item.noCount}</Text>
                   </View>
                   <View className='node' style='margin-top:18px;'>
                        <AtButton disabled={item.flag} type={item.flag === true ? 'secondary' : 'primary'} circle className='btn' onClick={this.endEvent.bind(this,item.title,'22')} >结束采购</AtButton>
                        <AtButton disabled={item.flag} type={item.flag === true ? 'secondary' : 'primary'} circle className='btn' onClick={this.goToInfo.bind(this,item.title)}>采购单</AtButton>
                        <AtButton type='primary' circle className='btn' onClick={this.goToOrder.bind(this,item.title)}>商品采购</AtButton>
                   </View>
               </View>
           )
       })
       
       return (
            <View>
                <View className='context'>
                    <View className='find'>
                        <View className='left' style='width:100%;'>
                            <View className='iconfont iconsearch icon'></View>
                            <Input type='text'
                            placeholder='搜索货品' 
                            placeholderStyle='font-size:13px;color:#777;' className='inputfont'
                            onInput={this.onInputEvent}
                            />
                        </View>
                    </View>
                    <ScrollView className='scrollview'
                        scrollY
                        scrollWithAnimation
                        scrollTop={0}
                        style={{height: '90vh'}}
                        lowerThreshold={50}
                        onScrollToLower={this.onScrollToLower}
                        >
                         {findItem}
                    </ScrollView>
                </View>

                <AtModal isOpened={isOpenEnd} cancelText='取消' confirmText='确认'
                  onClose={ this.endClose }
                  onCancel={ this.endClose }
                  onConfirm={ this.endConfirm }
                  content= {context}
                />
            </View>
       )
    }
}

export default Purchase as ComponentType<props>