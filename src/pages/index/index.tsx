import { ComponentType } from 'react'
import Taro, { PureComponent,Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtTabBar } from 'taro-ui'
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
      navigationBarTitleText: '采购宝'
    }
    constructor(){
        super(...arguments)
        this.state = {
          current: 0
        }
    }

    handleClick(value){
      if(value === 1){
        Taro.reLaunch({
            url:'/pages/my/my'
        })
      }
      this.setState({
        current: value
      })
    }

    render(){
        const items = this.props.indexStore.itemList.map((item, index) => {
            return (
                <View className='item' key={String(index)}>
                 <Image style='width: 70px;height: 56px;background: #fff;' src={item.image} ></Image>
                 <Text className='txt'>{item.title}</Text>
                </View>
            )
        })
        return (
            <View>
              <View className='itemdiv'>
                {items}
              </View>
              <AtTabBar
                  fixed
                  tabList={this.props.indexStore.tabList}
                  onClick={this.handleClick.bind(this)}
                  current={this.state.current}
                />
            </View>
          
        )
    }
}

export default Index as ComponentType