import { ComponentType } from 'react'
import { View,Text,ScrollView} from '@tarojs/components'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { AtButton,AtModal } from 'taro-ui'
//使用数据源
import shopStore from '../../store/shop/shopStore'
//引用css
import './shopConfirm.scss'

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
        navigationBarTitleText: '门店确认'
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
    // 显示分配弹出框
    showEvent(){
       this.props.shopStore.setOpened(true)
    }
    // 关闭弹出框
    colseEvent(){
        this.props.shopStore.setOpened(false)
    }
    // 确认分配操作
    okEvent(){
        this.colseEvent()
    }
    
    render(){
        const {cg,fp,scale,shopList,isOpened} = this.props.shopStore
        let listItem = shopList.slice().map((item,index) => {
            return (
                <View className='list' key={index}>
                    <View>
                        <Text style='color:#8A73FF; margin-right:10px;'>{item.code}</Text>
                        <Text>{item.name}</Text>
                    </View>
                    <View>
                       <Text>{item.total}</Text>
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
                <ScrollView className='scroll-view'
                        scrollY
                        scrollWithAnimation
                        scrollTop={0}
                        style={{height: '80vh'}}
                        lowerThreshold={50}
                        >
                         {listItem}
                         <View className='total'>共{shopList.length}家门店</View>
                </ScrollView>
        
                <View className='bottom'>
                    <AtButton type='primary' className='bottom-btn' onClick={this.showEvent}>确定分配</AtButton>
                </View>

                <AtModal
                    isOpened = {isOpened}
                    title=''
                    cancelText='取消'
                    confirmText='确认'
                    onClose={ this.colseEvent }
                    onCancel={ this.colseEvent }
                    onConfirm={ this.okEvent }
                    content='确认提交门店分配？'
                    />
            </View>
        )
    }
}

export default Shop as ComponentType<props>