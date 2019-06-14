import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View,Input,Text} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton } from "taro-ui"
import setPlanStore from '../../store/plan/setPlanStore'
import './setPlan.scss'

type setPlanProps = {
    setPlanStore: setPlanStore
}
interface SetPlan {
    props: setPlanProps
}

@inject('setPlanStore')
@observer
class SetPlan extends PureComponent{
    config: Config = {
      navigationBarTitleText: '制定采购计划'
    }
    constructor(){
        super(...arguments)
        this.state = {
            goodsVal:'',
            isGoods:true,
            isShop:true,
            shopList:[]
        }
    }

    componentWillMount(){
        this.setState({
          shopList:[
            {id:1,name:'蜀西公馆磨子潭路店',count:10},
            {id:2,name:'树胡',count:10},
            {id:3,name:'阿斯顿撒',count:2},
            {id:4,name:'323232323',count:2},
            {id:5,name:'呼呼呼',count:1},
            {id:6,name:'呼呼呼',count:1},
            {id:7,name:'122',count:5},
            {id:8,name:'呼呼呼',count:3},
            {id:9,name:'为呃呃尺寸',count:4},
            {id:10,name:'21212',count:1}
          ]
        })
    }

    onChangeEvent (value) {
        this.setState({
          value: value
        })
    }
    onActionEvent(){
        console.log('开始搜索')
    }
    findEvent (value) {
       console.log(this.state.goodsVal)
    }
    setInputEvent(e){
        this.setState({
            goodsVal:e.detail.value
        })
    }
    onInputEvent(e){
       console.log(e.detail.value)
    }
    render(){
        let shopLists = this.state.shopList.map((item,index) => {
            return (
              <View className='shoplist' key={index}>
                  <View className='shopname'>
                    <View className='iconfont icondelete close'></View>
                    <Text className='name'>{item.name}</Text>
                  </View>
                  <View className='counts'>
                    <Input type='text' placeholder='输入要货数量' placeholderStyle='font-size:13px;color:#777;' className='inp_counts'  ></Input>
                  </View>
              </View>
            )
        })
        return(
            <View className='setPlan'>
              <View className='title'>添加货品</View>
              <View className='context'>
                 <View className='find'>
                  <View className='left'>
                    <View className='iconfont iconsearch icon'></View>
                    <Input type='text' placeholder='搜索货品'
                     placeholderStyle='font-size:13px;color:#777;' className='inputfont'
                     onInput={this.setInputEvent}
                     />
                  </View>
                  <View style='margin-top:4px;'>
                    <AtButton type='primary' size='small' onClick={this.findEvent}>搜索</AtButton>
                  </View>
                 </View>
                 {this.state.isGoods && <View className='list'>
                    <View className='li'>
                      <Text className='li_txt'>货品信息：精品红富士</Text>
                      <Text className='li_txt'>规格/单位：1.8两/只</Text>
                    </View>
                    <View className='li'>
                      <Text className='li_txt'>货品条码：6914782112537</Text>
                      <Text className='li_txt'>货品编码：2112656</Text>
                    </View>
                    <View className='li'>
                      <Text className='li_txt'>近期采购价：20.49</Text>
                      <Text className='li_txt'>近期商户：大润发</Text>
                    </View>
                    <View></View>
                 </View>}
              </View>
              <View className='title' style='margin-top:25px;'>添加门店</View>
              <View className='context'>
                <View className='find'>
                  <View className='left' style='width:100%;'>
                    <View className='iconfont iconsearch icon'></View>
                    <Input type='text'
                       placeholder='搜索门店' 
                       placeholderStyle='font-size:13px;color:#777;' className='inputfont'
                       onInput={this.onInputEvent}
                    />
                  </View>
                 </View>
                 {this.state.isShop && shopLists}
              </View>
              
              <View className='footer'>
                 <View className='main'>
                   <AtButton type='primary'>预览采购计划</AtButton>
                 </View>
              </View>
            </View>
        )
    }
}

export default SetPlan as ComponentType