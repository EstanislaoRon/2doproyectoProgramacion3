import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native';
import { db } from '../firebase/config';
import Posts from '../components/Post';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loadingPosts: true,
            usuarioBuscado: ""
        }
    }


    search(text){
        db.collection("posts")
        .where('userName', '==', text)
        .orderBy("createdAt", "desc")
        .onSnapshot((docs) => {
            let posts = [];
            docs.forEach (doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
        this.setState({
            posts: posts,
            loading: false
            })
        })

    }

    render(){
        return(
            <View>
               <Text> Buscador de usuarios: </Text>
               <TextInput onChangeText = {(text) => this.search(text)}/> 

               <FlatList
               data = {this.state.posts}
               keyExtractor = { (item) => item.id.toString()}
               renderItem = { ({item}) => <Posts info={item}/>}
               />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    titulo : {
        fontFamily : 'Arial',
        textAlign: 'center',
        color: 'white',
        backgroundColor : 'teal',
        fontSize : '2.5rem',
        padding: 4 
    },
    imagen:  {height: 400 }
})

export default Search;