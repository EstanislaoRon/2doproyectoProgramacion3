import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            userName: '',
        }
    }

    render(){
        return(
            <View style= {styles.container}>
                <Text style={styles.titulo}>Registro de usuarios</Text>
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su nombre de usuario'
                    keyboardType = 'user'
                    onChangeText = { (text) => this.setState({userName: text})} 
                />
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su email'
                    keyboardType = 'email-address'
                    onChangeText = { (text) => this.setState({email: text})} 
                />
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su contrasenia'
                    keyboardType = 'password'
                    secureTextEntry = {true}
                    onChangeText = { (text) => this.setState({password: text})} 
                />                
                <TouchableOpacity style = {styles.boton} onPress = {() => this.props.registrate(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.enviar}>Enviar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 250,
        marginTop: 20
    },
    titulo:{
        fontFamily: 'arial',
        textAlign: 'center',
        color: 'tomato',
        fontSize: '2rem'
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 6,
        marginVertical:10
    },
    boton: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    enviar:{
        color: 'white'
    }
})

export default Register;
