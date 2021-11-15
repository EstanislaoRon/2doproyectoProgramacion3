import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList,ActivityIndicator} from 'react-native';
import Contador  from '../components/Contador';
import { db } from '../firebase/config';
import Post from '../components/Post';
import AuthDrawer from '../components/AuthDrawer';

class Home extends Component{
    constructor(){
        super();
        this.state ={
            posts: [],
            loading: true,
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt','desc').onSnapshot(
            docs => {
            let posts = [];
            docs.forEach((doc)=>{
                posts.push({
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

    saludar(){
        return alert('me clickearon');
    }
    render(){
        return(
            <View>
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
    titulo : {
        fontFamily : 'Arial',
        textAlign: 'center',
        color: 'white',
        backgroundColor : 'teal',
        fontSize : '2.5rem',
        padding: 4 
    },
    imagen:  {
        height: 400,
     }
})

export default Home;