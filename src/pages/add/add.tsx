import { View } from '@tarojs/components'
import Taro, { Component,Config } from '@tarojs/taro'



class Add extends Component{
    config: Config = {
      navigationBarTitleText: 'add'
    }
    
    static defaultProps = {
        list: ''
    }

    componentWillMount () {
      const { list } = this.props
      console.log(list)
    }
    
    render(){
        return(
            <View className='addshop'>
             
            </View>
        )
    }
}

export default Add