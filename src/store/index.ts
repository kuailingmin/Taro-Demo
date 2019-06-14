import loginStore from './loginStore'
// 首页
import indexStore from './indexStore'
// 采购任务
import purchaseStore from './purchase/purchaseStore'

export default {
  loginStore: new loginStore(),
  indexStore: new indexStore(),
  purchaseStore: new purchaseStore()
}
