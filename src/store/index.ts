import loginStore from './loginStore'
// 首页
import indexStore from './indexStore'
// 采购任务
import purchaseStore from './purchase/purchaseStore'
import purchaseOrderStore from './purchase/purchaseOrderStore'
//分配门店
import shopStore from './shop/shopStore'

export default {
  loginStore: new loginStore(),
  indexStore: new indexStore(),
  purchaseStore: new purchaseStore(),
  shopStore: new shopStore(),
  purchaseOrderStore: new purchaseOrderStore()
}
