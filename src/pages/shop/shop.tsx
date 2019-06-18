import { ComponentType } from 'react'
import { View,Text,Radio,ScrollView } from '@tarojs/components'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { AtButton } from 'taro-ui'
//使用数据源
import shopStore from '../../store/shop/shopStore'
//引用css
import './shop.scss'

type props = {
    shopStore:shopStore
}
interface Shop {
    props: props
}

//连接数据源
@inject('shopStore')
@observer
class Shop extends PureComponent{
    config: Config = {
        navigationBarTitleText: '分配门店'
    }
    constructor(){
        super()
    }
    componentWillMount(){
        console.log(this.$router.params)
    }
    
    radioChange(i){
        this.props.shopStore.updateShopList(i)
    }
    onScrollToLower(){
        const { shopList } = this.props.shopStore
        let arr = shopList.concat(shopList)
        this.props.shopStore.setShopList(arr)
    }
    //完成分配操作
    goToDone(){
        Taro.navigateTo({
          url:'/pages/shopConfirm/shopConfirm'
        })
    }
    render(){
        const {cg,fp,scale,shopList} = this.props.shopStore
        let listItem = shopList.slice().map((item,index) => {
            return (
                <View className='list' key={index}>
                    <View>
                        <Text style='color:#8A73FF; margin-right:10px;'>{item.code}</Text>
                        <Text>{item.name}</Text>
                    </View>
                    <View>
                       <Text>{item.total}</Text>
                       <Radio checked={item.flag} color='#8A73FF' className='radiocss' onClick={this.radioChange.bind(this,index)}></Radio>
                    </View>
                   
                </View>
            )
        })
        return(
            <View className='shop'>
                <View className='header'>
                     <Text>采购:{cg}</Text>
                     <Text>分配:{fp}</Text>
                     <Text>{scale}%</Text>
                </View>
                <ScrollView className='scrollview'
                        scrollY
                        scrollWithAnimation
                        scrollTop={0}
                        style={{height: '92vh'}}
                        lowerThreshold={50}
                        onScrollToLower={this.onScrollToLower}
                        >
                         {listItem}
                </ScrollView>
                <View className='bottom'>
                    <AtButton type='primary' className='bottom-btn' onClick={this.goToDone}>完成分配</AtButton>
                </View>
            </View>
        )
    }
}

export default Shop as ComponentType<props>