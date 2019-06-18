import {action, observable } from 'mobx'
class purchaseOrderStore {
    @observable type = ['蔬菜', '水果', '肉类'];
    @observable typeVal = '';
    // 采购数量
    @observable count:number = 0
    // 采购单价
    @observable price:number = 0
    // 去损率
    @observable lose:number = 0
    // 计算结果
    @observable result:number = 0

    // 设置分类
    @action setTypeVal(v) {
        this.typeVal = v
    }
    // 设置采购数量
    @action setCount(v){
        this.count = v
    }
    // 设置采购单价
    @action setPrice(v){
        this.price = v
    }
    // 设置结算金额
    @action setResult(v){
        this.result = v
    }
    // 设置去损率
    @action setLose(v){
        this.lose = v
    }
}

export default purchaseOrderStore