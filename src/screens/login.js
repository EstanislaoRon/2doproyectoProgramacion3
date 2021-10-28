import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            userName: '',
            password: ''
        }
    }
    enviar(){
        console.log(`El email que se coloco es: ${this.state.email}`,`La contrasenia que se coloco es: ${this.state.password} `,`La contrasenia que se confirmo es: ${this.state.password2} `);
    }
        render(){
            return(
                <View style= {styles.container}>
                <Text style={styles.error}>{this.props.error}</Text>
                <Text style={styles.titulo}>Login de usuarios</Text>
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su email'
                    keyboardType = 'email-address'
                    onChangeText = { (text) => this.setState({email: text})} 
                />
                <TextInput
                    style ={styles.input}
                    placeholder = 'Contrasenia'
                    keyboardType = 'password'
                    secureTextEntry = {true}
                    onChangeText = { (text) => this.setState({password: text})} 
                />
                
                <TouchableOpacity style = {styles.boton} onPress={() => this.props.ingresar(this.state.email, this.state.password)}>
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
    },
    error:{
        textAlign: 'center',
        color: 'red',
    }
    
})

export default Login;