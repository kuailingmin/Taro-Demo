import { ComponentType } from "react"
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { AtTabs,AtIcon,AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import purchaseStore from '../../store/purchase/purchaseStore'

import './purchase.scss'

type purchaseStateProps = {
    purchaseStore: purchaseStore
}

interface Purchase {
    props: purchaseStateProps
}

@inject('purchaseStore')
@observer
class Purchase extends PureComponent{
    config: Config = {
        navigationBarTitleText: '采购任务'
    }
    constructor () {
        super(...arguments)
        this.state = {
          current: 0,
          count:0,
          isTypeOpened:false,
          isFindOpened:false,
          typeName: '',
          findName: '',
          typeList: ['水果类','肉类'],
          findList: ['货品名称','货品编码','货品条码','任务单号'],
          index:1,
          list:[
              {
                  code: 'CG2019041517002222',
                  title: '精品红富士',
                  count: 2323,
                  shopCount: 2545,
                  unit: 'kg',
                  hunit: '约500g'
              },
              {
                code: 'CG2019041517002222',
                title: '精品红富士',
                count: 2323,
                shopCount: 2545,
                unit: 'kg',
                hunit: '约500g'
              },
              {
                code: 'CG2019041517002222',
                title: '精品红富士',
                count: 2323,
                shopCount: 2545,
                unit: 'kg',
                hunit: '约500g'
              },
              {
                code: 'CG2019041517002222',
                title: '精品红富士',
                count: 2323,
                shopCount: 2545,
                unit: 'kg',
                hunit: '约500g'
              },
              {
                code: 'CG2019041517002222',
                title: '精品红富士',
                count: 2323,
                shopCount: 2545,
                unit: 'kg',
                hunit: '约500g'
              }
          ]
        }
    }

    handleClick (value) {
        this.setState({
          current: value
        })
    }
    // 大类选择
    onCancelType(){
        this.setState({
            isTypeOpened: !this.state.isTypeOpened
        })
    }
     // 大类弹出框操作
    onCancelFind(){
        this.setState({
            isFindOpened: !this.state.isFindOpened
        })
    }
    onTypeChange(item){
        this.setState({
            typeName: item
        })
    }
    onFindChange(item){
        this.setState({
            findName: item
        })
    }
    componentDidMount(){
        // 初始化数据
        this.setState({
            typeName: this.state.typeList[0],
            findName: this.state.findList[0]
        })
    }
    // 搜索事件
    onInputEvent(){

    }
    // 下拉刷新数据
    onScrollToLower(){
        let arr = this.state.list.concat(this.state.list)
        this.setState({
            list:arr,
            index: this.state.index++
        })
    }

    // 跳转详情页
    goToInfo(){
        this.props.purchaseStore.updateCurrent(this.state.current)
        Taro.navigateTo({
            url:'/pages/purchaseInfo/purchaseInfo'
        })
    }
    render(){
       let findItem = this.state.list.map((item,index) => {
           return (
               <View className='list' key={index} onClick={this.goToInfo}>
                   <View className='code'>{item.code}</View>
                   <View className='title'>{item.title}</View>
                   <View className='node' style='margin-bottom:6px;'>
                       <Text className='nodetxt'>要货数量: {item.count}</Text>
                       <Text className='nodetxt'>门店数量: {item.shopCount}</Text>
                   </View>
                   <View className='node'>
                       <Text className='nodetxt'>货品单位: {item.unit}</Text>
                       <Text className='nodetxt'>货品规格: {item.hunit}</Text>
                   </View>
               </View>
           )
       })
       
       return (
            <View>
                <AtTabs animated={false} current={this.state.current}
                    tabList={[{ title: '未采购' },{ title: '采购中' },{ title: '已采购' },{ title: '已关闭' }]}
                    onClick={this.handleClick.bind(this)}>
                </AtTabs>
                <View className='type'>
                    <View className='left-div'>
                        <View className='left mr30' onClick={this.onCancelType}>
                            <Text className='txt'>{this.state.typeName}</Text>
                            <AtIcon value='chevron-down' size='14' color='#6A4CFF'></AtIcon>
                        </View>
                        <View className='left' onClick={this.onCancelFind}>
                            <Text className='txt'>{this.state.findName}</Text>
                            <AtIcon value='chevron-down' size='14' color='#6A4CFF'></AtIcon>
                        </View>
                    </View>
                    <View className='right'>采购任务({this.state.count})</View>
                </View>
                <View className='context'>
                    <View className='find'>
                        <View className='left' style='width:100%;'>
                            <View className='iconfont iconsearch icon'></View>
                            <Input type='text'
                            placeholder='搜索货品' 
                            placeholderStyle='font-size:13px;color:#777;' className='inputfont'
                            onInput={this.onInputEvent}
                            />
                        </View>
                    </View>
                    <ScrollView className='scrollview'
                        scrollY
                        scrollWithAnimation
                        scrollTop={0}
                        style={{height: '70vh'}}
                        lowerThreshold={50}
                        onScrollToLower={this.onScrollToLower}
                        >
                         {findItem}
                    </ScrollView>
                </View>

                <AtActionSheet isOpened={this.state.isTypeOpened} onClose={this.onCancelType}>
                      {
                        this.state.typeList.map((item,index)=>{
                            return (
                               <AtActionSheetItem key={index} onClick={ this.onTypeChange.bind(this,item) }>{item}</AtActionSheetItem>
                            ) 
                        })
                      }
                </AtActionSheet>
                <AtActionSheet isOpened={this.state.isFindOpened} onClose={this.onCancelFind}>
                      {
                        this.state.findList.map((item,index)=>{
                            return (
                               <AtActionSheetItem key={index} onClick={ this.onFindChange.bind(this,item) }>{item}</AtActionSheetItem>
                            ) 
                        })
                      }
                </AtActionSheet>
            </View>
       )
    }
}

export default Purchase as ComponentType