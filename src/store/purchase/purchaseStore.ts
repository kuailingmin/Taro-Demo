import {action, observable } from 'mobx'

class purchaseStore {
  @observable infoList = [
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
  @action setInfoList(v){
      console.log(v)
      this.infoList = v
  }
}

export default purchaseStore