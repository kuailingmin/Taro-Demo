import { ComponentType } from 'react'
import Taro, { PureComponent,Config } from '@tarojs/taro'
import { View, Text, Image, Picker } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton } from 'taro-ui'
import indexStore from '../../store/indexStore'
import './index.scss'

type indexStateProps = {
    indexStore: indexStore
}
interface Index {
    props: indexStateProps
}

@inject('indexStore')
@observer
class Index extends PureComponent {
    config: Config = {
      navigationBarTitleText: '选择采购分类'
    }
    constructor(){
        super()
    }
    componentWillMount(){
      console.log(this.$router.params)
    }
    
    onCityChange = e => {
      this.props.indexStore.setCity(this.props.indexStore.city[e.detail.value])
    }
    onTypeChange = e => {
      this.props.indexStore.setType(this.props.indexStore.type[e.detail.value])
    }
    onDateChange = e => {
      this.props.indexStore.setDateSel(e.detail.value)
      console.log(this.props.indexStore.dateSel)
    }

    render(){
        const {city,selectorCity,dateSel,type,selectorType} = this.props.indexStore
        
        return (
            <View className='index'>
                <Picker mode='selector' range={city} onChange={this.onCityChange}>
                    <View className='itemdiv'>
                          <Text className='txt'>选择城市</Text>
                          <View className='picker'>
                                {selectorCity}
                          </View>
                    </View>
                </Picker>
                <Picker mode='selector' range={type} onChange={this.onTypeChange}>
                    <View className='itemdiv'>
                          <Text className='txt'>选择分类</Text>
                          <View className='picker'>
                                {selectorType}
                          </View>
                    </View>
                </Picker>
                <Picker mode='date' onChange={this.onDateChange}>
                    <View className='itemdiv'>
                          <Text className='txt'>汇总日期</Text>
                          <View className='picker'>
                                {dateSel}
                          </View>
                    </View>
                </Picker>
                <View className='btncss'>
                    <AtButton type='primary'>进入采购任务</AtButton>
                </View>
                <View className='bottomcss'>
                     <AtButton circle  className='btncom left'>退出登录</AtButton>
                     <AtButton circle type='secondary' className='btncom right' >按钮文案</AtButton>
                </View>
            </View>
        )
    }
}

export default Index as ComponentType<indexStateProps>