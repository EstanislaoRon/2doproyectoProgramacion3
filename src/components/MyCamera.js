import React,{Component} from "react";
import { Camera } from "expo-camera";
import { StyleSheet, TouchableOpacity, Text, Image, View } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { storage } from "../firebase/config";

export default class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            photo: ''
            }
            this.camera;
        
    }
    takePhoto(){
        this.camera.takePictureAsync()
        .then((photo)=>{
            console.log(photo)
            this.setState({
                photo: photo.uri
            })
        })   
    }
    onReject(){
        this.setState({
            photo:''
        })
    }
    onAccept(){
        fetch(this.state.photo)
        .then((response)=> response.blob())
        .then((image)=>{
            const storageRef = storage.ref('camera/'+Date.now());
            storageRef.put(image)
            .then(()=>{
                storageRef.getDownloadURL()
                .then((url)=>{
                    this.props.onPhotoUpload(url)
                })
            }
            )

        })
    }
    render(){
        return(
            <React.Fragment>
            {
                this.state.photo ? 
                    <React.Fragment>
                        <Image source={{uri: this.state.photo}} style={styles.camara2}/>
                        <View>
                            <TouchableOpacity onPress={()=>this.onAccept()}>
                                <Text>Aceptar foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.onReject()}>
                                <Text>Rechazar foto</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <Camera
                            style={styles.camera}
                            type={Camera.Constants.Type.front}
                            ref={reference => this.camera = reference}
                        />
                        <TouchableOpacity onPress={()=> this.takePhoto()}>
                            <Text>Sacar foto</Text>
                        </TouchableOpacity>
                    </React.Fragment>
            
            }
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    camera:{
        flex: 1,
        width: '100%'
    },
    camara2:{
        flex: 1,
        width: '100%'
    }
})