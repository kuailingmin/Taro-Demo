import {action, observable } from 'mobx'
import Taro from '@tarojs/taro'

class myStore {
    @observable
    // tabbar配置项
    tabList = [
      { 
        title: '首页', 
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png', 
        selectedImage: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png', 
        text: 'new' 
      },
      { title: '我的账号', 
        image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
        selectedImage:''
      }
    ]
}

export default myStore