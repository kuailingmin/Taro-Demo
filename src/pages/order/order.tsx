import { ComponentType } from "react"
import { View,Text,Input,ScrollView } from '@tarojs/components'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
//引用数据源
import purchaseStore from '../../store/purchase/purchaseStore'
//引用css
import './order.scss'

type props = {
    purchaseStore:purchaseStore
}
interface Order {
    props: props
}

//连接数据源
@inject('purchaseStore')
@observer
class Order extends PureComponent{
    config: Config = {
      navigationBarTitleText: '采购单'
    }
    constructor(){
        super(...arguments)
    }

    componentWillMount () {
     
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
    onInputEvent(){
        
    }
  
    render(){
        const { orderList,isOpenEnd,context } = this.props.purchaseStore
        let listItem = orderList.slice().map((item,index) => {
            let children = item.list.map((list,index) => {
                return (
                    <View className='children' key={index}>
                        <View className='title'>
                           {list.name}
                        </View>
                        <View className='node' style='margin-bottom:6px;'>
                            <Text>数量: {list.number}</Text>
                            <Text>单价: {list.price}元</Text>
                        </View>
                        <View className='node'>
                            <Text>去损: {list.sun}%</Text>
                            <Text>小计: {list.count}元</Text>
                        </View>
                    </View>
                )
            })

            return (
                <View className='list' key={index}>
                    <View className='title'>
                       供应商名称:  <Text style='color:#8A73FF;'>{item.name}</Text>
                    </View>
                    {children}
                </View>
            )
        })
        return(
            <View className='order'>
                <View className='find'>
                        <View className='left' style='width:100%;'>
                            <View className='iconfont iconsearch icon'></View>
                            <Input type='text'
                            placeholder='搜索农户供应商名称'
                            placeholderStyle='font-size:13px;color:#bbb;' className='inputfont'
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
                         {listItem}
                </ScrollView>
            </View>
        )
    }
}

export default Order as ComponentType<props>