import {action, observable } from 'mobx'
import Taro from '@tarojs/taro'

class purchaseStore {
   @observable current:number
   
   @action updateCurrent(v){
      this.current = v
   }

   @observable infoList:Array<any> = [
      {shop:'蜀西公馆磨子潭路店',count:23232},
      {shop:'祥源城3期北门店',count:23232},
      {shop:'华邦蜀山里店',count:23232},
      {shop:'中海原山店',count:3333},
      {shop:'山湖苑西区店',count:22},
      {shop:'香山丽舍店',count:1},
      {shop:'高速翡翠湖畔生店',count:100000},
      {shop:'和一花园店',count:123},
      {shop:'和一花园店',count:123},
      {shop:'和一花园店',count:123},
      {shop:'和一花园店',count:123},
      {shop:'和一花园店',count:123},
      {shop:'和一花园店',count:123},
      {shop:'和一花园店',count:123}
  ]
}

export default purchaseStore