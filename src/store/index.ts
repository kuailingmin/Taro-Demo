import loginStore from './loginStore'
// 首页
import indexStore from './indexStore'
// 设置采购计划
import getPlanStore from './plan/getPlanStore'
// 制定采购计划
import setPlanStore from './plan/setPlanStore'
// 查看明细
import planInfoStore from './plan/planInfoStore'
// 我的
import myStore from './myStore'

export default {
  loginStore: new loginStore(),
  indexStore: new indexStore(),
  myStore: new myStore(),
  getPlanStore: new getPlanStore(),
  setPlanStore: new setPlanStore(),
  planInfoStore: new planInfoStore()
}
