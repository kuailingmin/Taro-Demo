import {action, observable } from 'mobx'
import Taro from '@tarojs/taro'

class indexStore {
  @observable
  // tabbar配置项
  tabList = [
    { 
      title: '首页', 
      image: 'https://ss1.ypshengxian.com/wxapp/cgb/home.png',
      selectedImage:'https://ss1.ypshengxian.com/wxapp/cgb/home_sel.png',
      text: '' 
    },
    { title: '我的账号', 
      image: 'https://ss1.ypshengxian.com/wxapp/cgb/my.png', 
      selectedImage: 'https://ss1.ypshengxian.com/wxapp/cgb/my_sel.png',
    }
  ]
  @observable
  itemList = [
    {
      index:1,
      title: '采购计划',
      image:'https://ss1.ypshengxian.com/wxapp/cgb/c1.png'
    },
    {
      index:2,
      title: '采购任务',
      image:'https://ss1.ypshengxian.com/wxapp/cgb/c2.png'
    },
    {
      index:3,
      title: '订货单查询',
      image:'https://ss1.ypshengxian.com/wxapp/cgb/c3.png'
    },
    {
      index:4,
      title: '任务调度',
      image:'https://ss1.ypshengxian.com/wxapp/cgb/c4.png'
    },
    {
      index:5,
      title: '配送任务',
      image:'https://ss1.ypshengxian.com/wxapp/cgb/c5.png'
    }
  ]
  
}

export default indexStore