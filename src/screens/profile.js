import React, { Component } from "react";import { View, Text, TouchableOpacity, StyleSheet, FlatList,ActivityIndicator } from 'react-native';
import { auth } from '../firebase/config';
import { db } from '../firebase/config';
import Post from '../components/profilePost';

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
        delete(id){
            let thisDoc = db.collection('posts').doc(id);
            thisDoc.delete()
                const postsFiltered = this.state.posts.filter(post => post.id != id)
                this.setState({posts: postsFiltered});
        }  
    render(){
      return(
        console.log(auth.currentUser),
        <View>
            <Text style={styles.nombre}>Usuario: {auth.currentUser.displayName}</Text>
            <Text style={styles.nombre}>Email: {auth.currentUser.email}</Text>
            <Text style={styles.nombre}>Posts: {this.state.posts.length}</Text>
            <Text style={styles.fechas}>Creacion: {auth.currentUser.metadata.creationTime}</Text>
            <Text style={styles.fechas}>Ultimo ingreso: {auth.currentUser.metadata.lastSignInTime}</Text>                 
            <TouchableOpacity style={styles.boton} onPress={()=>auth.signOut()}>
                <Text style={styles.enviar}>Log Out</Text>
            </TouchableOpacity>
            {
                    this.state.loading ? (<ActivityIndicator  size= 'large' color= 'teal'/>)
                    :
                    (   <FlatList 
                        data = {this.state.posts}
                        keyExtractor = { (item) => item.id.toString()}
                        renderItem = { ({item}) => <Post info={item} delete={(createAt)=>this.delete(createAt)}/>}
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
        fontFamily: 'Verdana'
    },
    fechas:{
        textAlign: 'center',
        bottom:'2%'
    },
    boton: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue',
        width: '35%',
        left: '32%',
        top: '0'
    },
    enviar:{
            color: 'white'
    },
})

export default Profile;