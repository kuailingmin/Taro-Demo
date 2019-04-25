import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import myStore from '../../store/myStore'
import indexStore from '../../store/indexStore'

type myStateProps = {
    myStore: myStore,
    indexStore: indexStore
}
interface My {
    props: myStateProps
}

@inject('myStore')
@inject('indexStore')
@observer
class My extends PureComponent{
    config: Config = {
      navigationBarTitleText: '个人中心'
    }
    constructor(){
        super(...arguments)
        this.state = {
          current: 1
        }
    }

    handleClick(value){
        if(value === 0){
          Taro.reLaunch({
            url:'/pages/index/index'
          })
        }
        this.setState({
          current: value
        })
    }
    render() {
        return(
          <View>
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

export default My as ComponentType