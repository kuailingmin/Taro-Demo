import { ComponentType } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton,AtInput } from "taro-ui"
import setPlanStore from '../../store/plan/setPlanStore'
import QRCode from '../../util/qr'
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
            goodsVal:''
        }
    }

    componentWillMount(){
        var qrcode = ''
        qrcode = new QRCode('q', {
            text: '',
            width: '166',
            height: '166',
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.correctLevel.H
          });
          qrcode.clear(); // clear the code.
          qrcode.makeCode('213123213232133123');
    }

    onChangeEvent (value) {
        this.setState({
          value: value
        })
    }
    onActionEvent(){
        console.log('开始搜索')
    }
    handleChange (value) {
        this.setState({
          value
        })
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return value
      }

    render(){
        return(
            <View className='setPlan'>
              <View className='title'>添加货品</View>
              <View className='context'>
                 <View className='find'>
                  <View className='left'>
                    <View className='iconfont iconicon_search icon'></View>
                    <AtInput
                        name='goodsVal'
                        title=''
                        type='text'
                        placeholder='标准五个字'
                        value={this.state.goodsVal}
                        onChange={this.handleChange.bind(this)}
                    />
                  </View>
                  <View style='margin-top:4px;'>
                    <AtButton type='primary' size='small' >搜索</AtButton>
                  </View>
                 </View>
                 <canvas canvas-id="q" style="width: 166px; height: 166px"></canvas>
              </View>
            </View>
        )
    }
}

export default SetPlan as ComponentType