import React, { Component } from "react";import { View, Text, TouchableOpacity, StyleSheet, FlatList,ActivityIndicator } from 'react-native';
import { auth } from '../firebase/config';
import { db } from '../firebase/config';
import Post from '../components/Post';

//export default function Profile(props){
    class Profile extends Component{
        constructor(props){
            super(props);
            this.state = {
                email : '',
                userName: '',
                password: '',
                posts: [],
                loading: true,
            }
        }

        componentDidMount(){
            db.collection('posts').where("owner", "==", auth.currentUser.email).orderBy('createdAt','desc').onSnapshot(
                docs => {
                let posts = [];
                docs.forEach((doc)=>{
                    posts.push({
                        owner: doc.owner,
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                        loading: false,
                    })
                })
                })
        }
        
    render(){
      return(
        console.log(auth.currentUser),
        <View>
            <Text style={styles.nombre}>Nombre de usuario: {auth.currentUser.displayName}</Text>
            <Text style={styles.nombre}>Email: {auth.currentUser.email}</Text>
            <Text style={styles.nombre}>Numero de post: {this.state.posts.length}</Text>
            <Text style={styles.fechas}>Fecha de creacion de cuenta: {auth.currentUser.metadata.creationTime}</Text>
            <Text style={styles.fechas}>Ultimo ingreso con la cuenta: {auth.currentUser.metadata.lastSignInTime}</Text>                 
            <TouchableOpacity style={styles.boton} onPress={()=>auth.signOut()}>
                <Text style={styles.enviar}>Log Out</Text>
            </TouchableOpacity>
            {
                    this.state.loading ? (<ActivityIndicator  size= 'large' color= 'teal'/>)
                    :
                    (   <FlatList 
                        data = {this.state.posts}
                        keyExtractor = { (item) => item.id.toString()}
                        renderItem = { ({item}) => <Post info={item}/>}
                    />)
                }
        </View>
    )  
    }
    
}

const styles = StyleSheet.create({
    nombre: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },
    fechas:{
        textAlign: 'center',
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
})

export default Profile;