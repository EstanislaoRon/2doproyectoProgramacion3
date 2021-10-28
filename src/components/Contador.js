import React, {Component} from "react";
import {Text,TouchableOpacity,View} from 'react-native';
 
class Contador extends Component{
constructor(){
    super();
    this.state ={
        valor: 0,
    }
}
aumentar(){
    this.setState({
        valor: this.state.valor + 1
    })
}
render(){
    return(
        <View>
            <Text>Cantidad de Clicks: {this.state.valor}</Text>
            <TouchableOpacity onPress = {() => this.aumentar()} >
             <Text>Click aquí para contar</Text>   
            </TouchableOpacity>
        </View>
    )
}}
export default Contador;
