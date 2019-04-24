//全局变量
const globalData = {}
interface globalConfig{
   (key:string,val?:string)
}

//set操作
export const setGlobal:globalConfig = (key:string,val:string) => {
    globalData[key] = val
}

//get操作
export const getGlobal:globalConfig = (key:string) => {
    return globalData[key]
}

