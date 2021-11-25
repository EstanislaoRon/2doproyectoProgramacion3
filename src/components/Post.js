import React, { Component } from "react";
import {Text, StyleSheet, View, TouchableOpacity, Touchable, Image, Modal, TextInput  } from 'react-native'
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           liked: false,
           showModal: false,
           comments: ''
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
    
    createComments(){        
        let comments = db.collection('posts').doc(this.props.info.id);

        comments.update(
            { comments: firebase.firestore.FieldValue.arrayUnion({
                comment: this.state.comments,
                autor: auth.currentUser.email,
            })}
        )
        .then(() => {
            console.log('Comentario realizado')
        
        })
        .catch(e => console.log(e))    
            
    }
    componentDidMount(){
        db.collection('comments').where("posts", "==", this.state).orderBy('createdAt','desc').onSnapshot(
            docs => {
            let posts = [];
            docs.forEach((doc)=>{
                comments.push({
                    comments: doc.id,
                    data: doc.data()
                })
                this.setState({
                    posts: posts,
                    loading: false,
                })
            })
            })
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

    handleModal(){
        this.setState({
            showModal: true,
        })
    }
    closeModal(){
        this.setState({
            showModal: false,
        })
    }

    render(){
    return(
        <React.Fragment>
            <View style={styles.conteiner}>
                <View style={styles.contenedor}>
                    <Text style={styles.nombre}>{this.props.info.data.userName}</Text>
                    <Image style={styles.photo} source={{uri: this.props.info.data.photo}}/>
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
                             <TouchableOpacity onPress={() =>this.handleModal()}>
                                <TouchableOpacity onPress={() =>this.handleModal()}>
                                    <Text > Ver Comentarios</Text>
                                </TouchableOpacity>
                                    {
                                        this.state.showModal ? 
                                        <Modal visible={this.state.showModal}
                                            animationType= "slide"
                                            transparent={false}
                                        >
                                            <TextInput
                                                style ={styles.input}
                                                placeholder = 'Ingresa tu comentario'
                                                keyboardType = 'text'
                                                onChangeText={text => this.setState({comments:text})} 
                                            />
                                            <TouchableOpacity style = {styles.boton} 
                                                onPress={()=> this.createComments()} 
                                                disabled={this.state.comments === '' ? true : false }>
                                                <Text style={styles.enviar}>Enviar</Text>
                                            </TouchableOpacity>
                                            {this.props.info.data.comments.length > 0  ? 

                                                    <View>

                                                    <FlatList
                                                        data = { this.props.info.data.comments}
                                                        keyExtractor = { (item,id) => id.toString()}
                                                        renderItem = { ({item}) => <Text >{item.autor}: {item.comment}</Text> }
                                                    />
                                                    </View>

                                                    :
                                                    <Text style={styles.title} >Aún no hay comentarios. Sé el primero en opinar</Text> 
                                                    }
                                                <TouchableOpacity onPress={() =>this.closeModal()}>
                                                    <TouchableOpacity onPress={() =>this.closeModal()}>
                                                        <Text >Ocultar Comentarios</Text>
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                        </Modal>
                                        :
                                        <Text></Text>
                                        
                                    }
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        </React.Fragment>
    )}
}
export default Post

//cambiar a estado likes; 0, liked; false


const styles = StyleSheet.create({
    quitarLike: {
        backgroundColor: 'tomato',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue',
        width: '25%',
        left: '20%'
    },
    meGusta: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue',
        width: '25%',
        left: '20%'
      },
    conteiner:{
        backgroundColor: "white",
        marginBottom: 40,
        paddingTop: 30 ,
    },
    contenedor:{
        backgroundColor: "white",
        marginBottom: 40,
        paddingTop: 30 ,
        height: '300px'
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
        top: '90%'
    },
    photo:{
        height: '70%',
    }
})