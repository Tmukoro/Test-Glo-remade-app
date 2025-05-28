import React, {useState} from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import { firebase } from "./firebaseConfig";
import { Keyboard } from "react-native";
import { Snackbar } from "react-native-paper";




const SignUpScreen = ({navigation}) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(false);

    const signup = async()=>{
        try{
            await firebase.auth().createUserWithEmailAndPassword(email,password);
            setSnackbarMessage("Sign up Successfull!");
            setSnackbarVisible(true);
            Keyboard.dismiss();
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes : [{name: 'Psetup'}],
                })
            }, 1300);
        } catch(error){
            Keyboard.dismiss();
            setSnackbarMessage(error.message);
            setSnackbarVisible(true);
        }
    };
    
    return(
        <View style={Styles.container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={Styles.TE}></TextInput>
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={Styles.TP} secureTextEntry></TextInput>
            <TouchableOpacity onPress={signup} style={Styles.button}><Text style={{color: 'white'}}>SIGN UP</Text></TouchableOpacity>
            <Snackbar visible = {snackbarVisible} onDismiss= {()=> setSnackbarVisible(false)} duration={1500}>{snackbarMessage}</Snackbar>
        </View>
    ); 



}



const Styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        paddingTop: 45,
        backgroundColor: 'black'
    },

    TE: {
        height: 40,
        borderBlockColor: "grey",
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft: 8,
        marginBottom: 18,
        borderWidth: 1,
    },

    TP: {
        height: 40,
        borderBlockColor: "white",
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft: 8,
        marginBottom: 18,
        borderWidth: 1,
    },

    button: {
        backgroundColor: "#409439",
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,

    },
    
})








export default SignUpScreen;