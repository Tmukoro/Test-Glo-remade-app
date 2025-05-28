import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { firebase } from "./firebaseConfig";
import { Keyboard } from "react-native";
import { Snackbar } from "react-native-paper";


const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);


    const login = async()=>{
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password);
            setSnackbarMessage("Sign In Successful!");
            setSnackbarVisible(true);
            Keyboard.dismiss();
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen2'}],
                })
                
            }, 1500);
        }catch(error){
            setSnackbarMessage(error.message);
            setSnackbarVisible(true);
            Keyboard.dismiss();
        }
    };



    return(
        <View style={Styles.Container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={Styles.TE}></TextInput>
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={Styles.TP} secureTextEntry></TextInput>
            <TouchableOpacity onPress={login} style={Styles.button}>
               <Text style={{color: 'white'}}>Login</Text>
            </TouchableOpacity>
            <Snackbar visible ={snackbarVisible} onDismiss={()=> setSnackbarVisible(false)} duration={1500}>{snackbarMessage}</Snackbar>
        </View>
    );


};


const Styles = StyleSheet.create({
    Container:{
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





export default LoginScreen;