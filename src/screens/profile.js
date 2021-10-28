import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
export default function Profile(props){
    console.log(props)
    return(
        <View>
            <Text style={styles.nombre}>{props.user}</Text>
            <Text style={styles.fechas}>Fecha de creacion de cuenta: {props.creationTime}</Text>
            <Text style={styles.fechas}>Ultimo ingreso con la cuenta: {props.lastSignInTime}</Text>
            <TouchableOpacity style={styles.boton} onPress={()=>props.signOut()}>
                <Text style={styles.enviar}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
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