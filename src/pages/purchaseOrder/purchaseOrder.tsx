import { ComponentType } from 'react'
import { View,Text,Input,Picker} from '@tarojs/components'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { AtButton } from 'taro-ui'
import './purchaseOrder.scss'
//使用数据源
import purchaseOrderStore from '../../store/purchase/purchaseOrderStore'

type props = {
    purchaseOrderStore: purchaseOrderStore
}
interface PurchaseOrder {
    props: props
}

//连接数据源
@inject('purchaseOrderStore')
@observer
class PurchaseOrder extends PureComponent{
    config: Config = {
        navigationBarTitleText: ''
    }
    constructor(){
        super()
    }
    componentWillMount(){
        const name = this.$router.preload.name;
        Taro.setNavigationBarTitle({
          title: name || '加载中...'
        })
        this.props.purchaseOrderStore.setTypeVal('naike')
    }
     // 选择类型
    onTypeChange = e => {
        this.props.purchaseOrderStore.setTypeVal(this.props.purchaseOrderStore.type[e.detail.value])
    }
    onInputEvent(){

    }
    // 采购数量事件
    countEvent(e){
        this.props.purchaseOrderStore.setCount(e.detail.value)
        this.compute()
    }
    // 采购单价事件
    priceEvent(e){
        this.props.purchaseOrderStore.setPrice(e.detail.value)
        this.compute()
    }
     // 去损率
    lossEvent(e){
        this.props.purchaseOrderStore.setLose(e.detail.value)
    }
    // 结算金额
    compute(){
       const {count,price} = this.props.purchaseOrderStore
       let result = count * price
       this.props.purchaseOrderStore.setResult(result)
    }

    render(){
        const { type,typeVal,count,price,result,lose } = this.props.purchaseOrderStore
        return(
            <View className='order'>
                 <View className='header'>
                     <Text>门店要活:{'109斤'}</Text>
                     <Text>已采:{'10斤'}</Text>
                </View>
                <View className='main'>
                   <Text className='title'>采购数量</Text>
                   <View className='op'>
                        <Input type='digit' className='inpt' value={count + ''} onInput={this.countEvent}/>
                        <Text className='unit'>斤</Text>
                   </View>
                </View>
                <View className='main'>
                   <Text className='title'>采购单价</Text>
                   <View className='op'>
                        <Input type='digit' className='inpt' value={price  + ''} onInput={this.priceEvent} />
                        <Text className='unit'>元</Text>
                   </View>
                </View>
                <View className='main'>
                   <Text className='title'>去损率</Text>
                   <View className='op'>
                        <Input type='digit' className='inpt' value={lose  + ''} onInput={this.lossEvent} />
                        <Text className='unit'>%</Text>
                   </View>
                </View>
                <View className='main'>
                   <View className='op' style='width:100%;'>
                        <Text className='unit' style='color:#8A73FF;'>结算金额: {result}元</Text>
                   </View>
                </View>
                <View className='type'>
                    <Picker mode='selector' range={type} onChange={this.onTypeChange}>
                        <View className='itemdiv'>
                            <Text className='txt'>选择供应商</Text>
                            <View className='picker'>
                                {typeVal}
                            </View>
                        </View>
                    </Picker>
                </View>
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
                <View className='info'>
                    <Text className='txt'>供应商编号：1010653</Text>
                    <Text className='txt'>供应商名称：徐维</Text>
                    <Text className='txt'>开户名称：徐维</Text>
                    <Text className='txt'>开户银行：中国农业银行双福支行</Text>
                    <Text className='txt'>银行账号：6228480478843692176</Text>
                </View>
                <View className='bottom'>
                    <AtButton type='primary' className='bottom-btn'>确定采购</AtButton>
                </View>
            </View>
        )
    }
}

export default PurchaseOrder as ComponentType<props>