import { ComponentType } from 'react'
import Taro, { PureComponent,Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtTabBar } from 'taro-ui'
import indexStore from '../../store/indexStore'
import Login from '../login/login'
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
          current: 0,
          isHidden: false
        }
    }
    componentWillMount(){
      this.setState({
        isHidden: Taro.getStorageSync('loginStatus')
      })
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
    itemEvent(index:number){
      console.log(index)
      switch(index){
        case 1:
         Taro.navigateTo({
           url:'/pages/plan/plan'
         })
      }
    }

    render(){
        const items = this.props.indexStore.itemList.map((item, index) => {
            return (
                <View className='item' key={String(index)} onClick={this.itemEvent.bind(this,item.index)}>
                 <Image style='width: 70px;height: 56px;background: #fff;' src={item.image} ></Image>
                 <Text className='txt'>{item.title}</Text>
                </View>
            )
        })
        return (
            <View >
              {!this.state.isHidden && <Login />} 
              {this.state.isHidden && <View>
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
              }
            </View>
          
        )
    }
}

export default Index as ComponentType