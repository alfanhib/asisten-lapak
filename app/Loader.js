import React, { Component } from 'react'
import {Container,Text} from 'native-base'
import { StackNavigator } from 'react-navigation'

// export default class Loader extends Component{

//     componentWillMount(){
//         return this.props.navigation.navigate('CsHome')
//     }

//     render(){
//         return(
//             <Text>Loader</Text>
//         )
//     }t
// }

const Loader = {
    componentWillMount(){
        return this.props.navigation.navigate('CsHome')
    }
}

export default Loader