import React, { Component } from "react";
import {Text, StyleSheet, View, TouchableOpacity  } from 'react-native'
import { auth, db } from "../firebase/config";
import firebase from "firebase";

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           liked: false,
        }
    }
    
    componentDidMount(){
        if(this.props.info.data.likes){
            let likes = this.props.info.data.likes.length;
            this.setState({
                likes: likes,
            })
            if (this.props.info.data.likes.includes(auth.currentUser.email)) {
                this.setState({
                    liked: true,
                })  
            }
        } 
    } 
    
    like(){        
        let thisDoc = db.collection('posts').doc(this.props.info.id);

        thisDoc.update(
            { likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)}
        )
        .then(
            this.setState({
                liked: true,
                likes: this.state.likes + 1,
            },
            console.log('likeado ok'))
            )
        .catch(e => console.log(e))
    } //Likear el posteo

    unLike(){
        let thisDoc = db.collection('posts').doc(this.props.info.id);

        thisDoc.update(
            { likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)}
        )
        .then(
            this.setState({
                liked:false,
                likes: this.state.likes - 1,
            },
            console.log('Deslikeado ok'))
            )
        .catch(error => console.log('Upss error encontrado '+error))
    } //Deslikear el posteo

    render(){
    return(
        <React.Fragment>
            <View style={styles.conteiner}>
                <View style={styles.contenedor}>
                    <Text style={styles.nombre}>Producto creado por {this.props.info.data.userName}</Text>
                    <Text style={styles.titulo}> {this.props.info.data.tittle}</Text>
                    <Text style={styles.descripcion}> {this.props.info.data.description}</Text>
                    <Text style={styles.fecha}>{this.props.info.data.createdAt}</Text>
                        <View>
                        { this.state.liked === true ?
                            <TouchableOpacity style={styles.quitarLike} onPress={()=>this.unLike()}>
                                <Text > Quitar like</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.meGusta} onPress={()=>this.like()}>
                                <Text > Me gusta</Text>
                            </TouchableOpacity>
                        }
                        <Text style={styles.like}>  likes: {this.state.likes}</Text>
                    </View>
                </View>
            </View>
        </React.Fragment>
    )}
}
export default Post

//cambiar a estado likes; 0, liked; false


const styles = StyleSheet.create({
    conteiner:{
        display:'flex'
    },
    quitarLike: {
        backgroundColor: 'tomato',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    meGusta: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue'
      },
    contenedor:{
        backgroundColor: "orange",
        marginBottom: 40,
        display: 'flex',
        paddingBottom: 30 ,
        paddingTop: 30 ,
    },
    nombre:{
        textAlign: 'center',
    },titulo:{
        textAlign: 'center',
    },descripcion:{
        textAlign: 'center',
    },fecha:{
        textAlign: 'center',
        color:'grey',
    },
    like:{
        textAlign: 'center',
    }
})