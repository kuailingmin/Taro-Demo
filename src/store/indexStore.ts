import {action, observable } from 'mobx'

class indexStore {
  @observable city =  ['合肥', '南京', '上海', '重庆'];
  @observable type =  ['蔬菜', '水果', '肉类'];
  @observable selectorCity = ''
  @observable selectorType = ''
  @observable dateSel = ''

  // 选择城市
  @action setCity(v) {
    this.selectorCity = v
  }
  // 选择类型
  @action setType(v) {
    this.selectorType = v
  }
  // 汇总日期
  @action setDateSel(v) {
    this.dateSel = v
  }
}

export default indexStore