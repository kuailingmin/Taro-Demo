import { ComponentType } from "react"
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { AtTabs,AtIcon,AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import purchaseStore from '../../store/purchase/purchaseStore'

import './purchase.scss'

type purchaseStateProps = {
    purchaseStore: purchaseStore
}

interface Purchase {
    props: purchaseStateProps
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
    goToInfo(){
        Taro.navigateTo({
            url:'/pages/purchaseInfo/purchaseInfo'
        })
    }
    render(){
       const { infoList } = this.props.purchaseStore
       console.log(infoList)
       let findItem = infoList.slice().map((item,index) => {
           return (
               <View className='list' key={index} onClick={this.goToInfo}>
                   <View className='code'>{item.code}</View>
                   <View className='title'>{item.title}</View>
                   <View className='node' style='margin-bottom:6px;'>
                       <Text className='nodetxt'>要货数量: {item.count}</Text>
                       <Text className='nodetxt'>门店数量: {item.shopCount}</Text>
                   </View>
                   <View className='node'>
                       <Text className='nodetxt'>货品单位: {item.unit}</Text>
                       <Text className='nodetxt'>货品规格: {item.hunit}</Text>
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
            </View>
       )
    }
}

export default Purchase as ComponentType<purchaseStateProps>