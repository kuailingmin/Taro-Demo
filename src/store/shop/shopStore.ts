import {action, observable } from 'mobx'

class shopStore {
  // 采购
  @observable cg:number = 0
  // 分配
  @observable fp:number = 0
  // 比例
  @observable scale:number = 0
  //提示框
  @observable isOpened = false
  
  //分配门店数据
  @observable shopList = [
    {code:'001', name:'重庆红原店',total:1.8,flag:false},
    {code:'002', name:'蜀西公馆磨子潭路店',total:33.8,flag:false},
    {code:'003', name:'祥源城3期北门店',total:331,flag:false},
    {code:'004', name:'金域学府店',total:20,flag:false},
    {code:'003', name:'祥源城3期北门店',total:331,flag:false},
    {code:'004', name:'金域学府店',total:20,flag:false},
    {code:'004', name:'金域学府店',total:20,flag:false}
  ]
  
  @action setShopList(v) {
      this.shopList = v
  }
  @action updateShopList(i) {
    this.shopList = this.shopList.slice().map((item,index) => {
         if(index === i){
            item.flag = !item.flag
         }
        return item
    })
  }
  @action setOpened(v) {
      this.isOpened = v
  }
}

export default shopStore