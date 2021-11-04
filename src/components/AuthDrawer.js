import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/home";
import Register from "../screens/register";
import Login from "../screens/login";
import Agregar from "../screens/agregar";
import { auth } from "../firebase/config";
import Profile from "../screens/profile";

const Drawer = createDrawerNavigator();


///Entre///


export default class AuthDrawer extends Component{
        constructor(){
            super();
            this.state={
                loggedIn: false,
                user: '',
                error: '',
                creationTime: '',
                lastSignIn: '',
            }
        }

        componentDidMount(){
            auth.onAuthStateChanged((user) =>{
                console.log(user)
                if(user){
                    this.setState({
                        loggedIn: true,
                        user: user.email
                    })
                }
                else{
                    this.setState({
                        loggedIn: false
                    })
                }
            })
        }
    registrarse(email, password, userName){
        auth.createUserWithEmailAndPassword(email, password, userName)
        .then(response =>{ 
            console.log(response)
            this.setState({
                loggedIn: true, 
                user: response.user.email,
            })
        })
        .catch(error => { 
            console.log(error)
            this.setState({loggedIn: false})
        })
    }
    ingresar(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response =>{ 
            console.log(response.user)
            this.setState({
                loggedIn: true,
                user: response.user.email,
                error:'',
                creationTime: response.user.metadata.creationTime,  
                lastSignIn: response.user.metadata.lastSignInTime
            })
        })
        
        .catch(error => { 
            console.log(error)
            this.setState({
                loggedIn: false,
                error:'credecnailes invalidas',
                creationTime: '',
            })
        })
    }
    signOut(){
        auth.signOut()
        .then(response => {
            this.setState({
                loggedIn: false,
                user: '',
                error:'',
            })
        })
        .catch(error => {})
    }
        render(){
            return(
                <NavigationContainer>
                    <Drawer.Navigator>
                        {this.state.loggedIn ? 
                        <React.Fragment>
                            <Drawer.Screen name='Home'>
                                {()=> <Home />}
                            </Drawer.Screen>
                            <Drawer.Screen name='Profile'>
                                {()=> <Profile user={this.state.user} creationTime={this.state.creationTime} lastSignInTime={this.state.lastSignIn} signOut={()=>this.signOut()} />}
                            </Drawer.Screen>
                            <Drawer.Screen name='Agregar'>
                                {(drawerProps)=> <Agregar drawerProps={drawerProps}/>}
                            </Drawer.Screen>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Drawer.Screen name='Login'>
                                {()=><Login ingresar={(email, password)=> this.ingresar(email, password)} error={this.state.error} />}
                            </Drawer.Screen>
                            <Drawer.Screen name='Register'>
                                {()=><Register registrate={(email, password, userName)=> this.registrarse(email, password, userName)}/>}
                            </Drawer.Screen>
                        </React.Fragment>    
                        }
                                           
                        
                    </Drawer.Navigator>
                    
                </NavigationContainer>    
            )
        }
}