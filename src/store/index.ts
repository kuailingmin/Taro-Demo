import loginStore from './loginStore'
import indexStore from './indexStore'
import myStore from './myStore'

export default {
  loginStore: new loginStore(),
  indexStore: new indexStore(),
  myStore: new myStore()
}
