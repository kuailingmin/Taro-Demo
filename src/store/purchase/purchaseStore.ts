import {action, observable } from 'mobx'

class purchaseStore {
  // 结束采购提示框
  @observable isOpenEnd:boolean = false
  // 结束采购提示框内容
  @observable context:string = ''
  
  // 商品采购列表数据
  @observable infoList = [
      {
          title: '草鱼',
          unit: '70/109斤',
          hight: 2323,
          low: 1.2,
          ping:5.4,
          shopCount: 2545,
          noCount:34,
          flag:false
      },
      {
         title: '黑鱼',
         unit: '70/109斤',
         hight: 2323,
         low: 1.2,
         ping:5.4,
         shopCount: 2545,
         noCount:34,
         flag:true
     },
     {
      title: '鲨鱼',
      unit: '70/109斤',
      hight: 2323,
      low: 1.2,
      ping:5.4,
      shopCount: 2545,
      noCount:34,
      flag:true
     },
     {
      title: '草鱼',
      unit: '70/109斤',
      hight: 2323,
      low: 1.2,
      ping:5.4,
      shopCount: 2545,
      noCount:34,
      flag:true
     },
     {
      title: '草鱼',
      unit: '70/109斤',
      hight: 2323,
      low: 1.2,
      ping:5.4,
      shopCount: 2545,
      noCount:34,
      flag:true
     }
  ]
  // 单品采购单列表
  @observable productList = [
        {name:'徐徐',number:112,price:1002,sun:20,count:800},
        {name:'212',number:112,price:1002,sun:20,count:800},
        {name:'sdsd',number:112,price:1002,sun:20,count:800},
        {name:'徐徐',number:112,price:1002,sun:20,count:800},
        {name:'徐徐',number:112,price:1002,sun:20,count:800},
        {name:'徐徐',number:112,price:1002,sun:20,count:800},
        {name:'徐徐',number:112,price:1002,sun:20,count:800}
  ]

  // 采购单列表
  @observable orderList = [
    {  name:'徐徐',
       list: [
         {number:112,price:1002,sun:20,count:800,name:'蓝鲸'},
         {number:112,price:1002,sun:20,count:800,name:'黑鱼'}
       ]
    },
    {  name:'嘻嘻',
       list: [
         {number:112,price:1002,sun:20,count:800,name:'蓝鲸'},
         {number:112,price:1002,sun:20,count:800,name:'黑鱼'}
       ]
    },
    {  name:'哈哈哈',
       list: [
         {number:112,price:1002,sun:20,count:800,name:'蓝鲸'},
         {number:112,price:1002,sun:20,count:800,name:'黑鱼'}
       ]
    }
]

  // 设置列表数据
  @action setInfoList(v){
      this.infoList = v
  }
  // 设置单品采购单列表
  @action setpProductList(v){
      this.productList = v
  }
  // 是否现实结束采购提示框
  @action setEndFrame(v) {
      this.isOpenEnd = v
  }
  //设置结束采购提示内容
  @action setContext(n,v) {
      this.context = n + '要货与采购占比'+ v +'%确认结束采购？'
  }
  
}

export default purchaseStore