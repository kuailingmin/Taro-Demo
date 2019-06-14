import { ComponentType } from "react"
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Radio,Text,Input } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './addShop.scss'


class AddShop extends Component{
    config: Config = {
      navigationBarTitleText: '新增门店'
    }
    constructor(){
        super(...arguments)
        this.state = {
            shopList: [
                {
                    checked:false,
                    name:'蜀西磨子潭路店',
                    code:'A101976',
                    number:0
                },
                {
                    checked:false,
                    name:'香格里拉花园三期紫竹园店',
                    code:'A101976',
                    number:0
                },
                {
                    checked:false,
                    name:'合肥店',
                    code:'A101976',
                    number:0
                },
                {
                    checked:false,
                    name:'高速翡翠湖畔生店',
                    code:'A101976',
                    number:0
                },
            ]
        }
    }

    componentWillMount () {

    }
    updateShopList(index){
        console.log(index)
       let list = this.state.shopList.map((item,i)=>{
            if(index === i){
                item.checked = !item.checked
            }
            return item
        })
        this.setState({
            shopList: list
        })
    }
    onInputEvent(){

    }
    // 确定添加事件
    createAddEvent(){
        Taro.navigateBack({
            delta:1
        })
    }
    render(){
        const items = this.state.shopList.map((item,index)=>{
            return (
                <View className='shoplist' key={index}>
                   <View className='list-left'>
                     <Radio value='' color='#8a73ff' checked={item.checked} onClick={this.updateShopList.bind(this,index)}></Radio>
                     <View className='main'>
                        <Text className='shopname'>{item.name}</Text>
                        <Text className='shopcode'>{item.code}</Text>
                     </View>
                   </View>
                   <Input  type='text'
                            placeholder='请输入数量'
                            placeholderStyle='font-size:14px;color:#bbb;' className='inputfont'
                            onInput={this.onInputEvent}/>
                </View>
            )
        })
        return(
            <View className='addshop'>
              <View className='shop'>
                {items}
              </View>
              <View className='footer'>
                 <View className='main'>
                   <AtButton type='primary' onClick={this.createAddEvent}>确认添加</AtButton>
                 </View>
              </View>

            </View>
        )
    }
}

export default AddShop as ComponentType