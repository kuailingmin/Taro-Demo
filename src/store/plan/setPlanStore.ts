import {action, observable } from 'mobx'
import Taro from '@tarojs/taro'

class setPlanStore {
    @observable type:Array<string> = ['水果类','熟食类','冷藏类']
}

export default setPlanStore