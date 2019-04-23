import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View} from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import myStore from '../../store/myStore'

type myStateProps = {
    myStore: myStore
}
interface My {
    props: myStateProps
}

@inject('myStore')
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
                  tabList={this.props.myStore.tabList}
                  onClick={this.handleClick.bind(this)}
                  current={this.state.current}
                />
          </View>
        )
    }
}

export default My as ComponentType