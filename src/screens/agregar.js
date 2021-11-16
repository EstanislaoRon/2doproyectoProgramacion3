import React, { Component } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import {db, auth} from '../firebase/config'
import MyCamera from "../components/MyCamera";


class Agregar extends Component{
    constructor(props){
        super(props);
        this.state = {
            tittle : '',
            description: '',
            showCamera: true,
            photo: '',
        }
    }

    createPost(){
        db.collection('posts').add({
            userName: auth.currentUser.displayName,
            tittle: this.state.tittle,
            description: this.state.description,
            createdAt: Date.now(),
            likes:[], 
            comments:[],
            photo: this.state.photo,
        })
        .then(response=>{
            this.setState({
                tittle: '',
                description: ''
            })
            this.props.drawerProps.navigation.navigate('Home')
        })
        .catch(error=>{
            console.log(error)
        })
    }
    onPhotoUpload(url){
        this.setState({
            showCamera: false,
            photo: url,
        })
    }
    


    render(){
        return(
            <>
            {
            this.state.showCamera ? 
             <MyCamera onPhotoUpload = {(url) => this.onPhotoUpload(url)}/>    
            :
                <React.Fragment>
                    <TextInput
                            style ={styles.input}
                            placeholder = 'Tittle'
                            keyboardType = 'text'
                            onChangeText = { (text) => this.setState({tittle: text})} 
                        />
                    <TextInput
                        style ={styles.inputD}
                        placeholder = 'Description'
                        keyboardType = 'text'
                        onChangeText = { (text) => this.setState({description: text})} 
                        />
                    <TouchableOpacity style = {styles.boton} onPress={()=> this.createPost()}>
                        <Text style={styles.enviar}>Enviar</Text>
                    </TouchableOpacity>
                </React.Fragment>
            }
          </>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        marginTop: 20
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
    inputD: {
        height: 20,
        paddingVertical: 46,
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

export default Agregar;