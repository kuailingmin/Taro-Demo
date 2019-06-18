import { ComponentType } from "react"
import { View,Text,ScrollView} from '@tarojs/components'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { AtButton} from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
//引用数据源
import purchaseStore from '../../store/purchase/purchaseStore'
//引用css
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
      navigationBarTitleText: ''
    }
    constructor(){
        super(...arguments)
    }

    componentWillMount () {
      const name = this.$router.preload.name;
      Taro.setNavigationBarTitle({
        title: name || '加载中...'
      })
    }

    // 下拉刷新数据
    onScrollToLower(){
      const { productList } = this.props.purchaseStore
      let arr = productList.concat(productList)
      this.props.purchaseStore.setpProductList(arr)
    }

    againEvent(){
      Taro.navigateTo({
        url:'/pages/shop/shop?'
      })
    }
  
    render(){
        const { productList} = this.props.purchaseStore
        let listItem = productList.slice().map((item,index) => {
            return (
                <View className='list' key={index}>
                    <View className='title'>
                        <Text>供应商名称:{item.name}</Text>
                    </View>
                    <View className='node' style='margin-bottom:6px;'>
                        <Text>数量: {item.number}</Text>
                        <Text>单价: {item.price}元</Text>
                    </View>
                    <View className='node'>
                        <Text>去损: {item.sun}%</Text>
                        <Text>小计: {item.count}元</Text>
                    </View>
                    <View className='node' style='margin-top:18px; justify-content: center;'>
                        <AtButton type='primary' circle className='btn' onClick={this.againEvent}>重新分配门店</AtButton>
                    </View>
                </View>
            )
        })
        return(
            <View className='purchaseInfo'>
               <ScrollView className='scrollview'
                        scrollY
                        scrollWithAnimation
                        scrollTop={0}
                        style={{height: '100vh'}}
                        lowerThreshold={50}
                        onScrollToLower={this.onScrollToLower}
                        >
                         {listItem}
                </ScrollView>
            </View>
        )
    }
}

export default PurchaseInfo as ComponentType<props>