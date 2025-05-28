import React, {useState, useEffect} from "react";
import { firebase } from "./firebaseConfig";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AritePurchaseScreen = ({navigation})=>{
    const [amount, setAmount] = useState('');
    const [uid, setUid] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState('');



    useEffect(()=>{
        const user = firebase.auth().currentUser;

        if(user){
            setUid(user.uid);

            firebase.firestore().collection('Profiles').doc(user.uid).get()

            .then(doc =>{
                if(doc.exists){
                    setCurrentBalance(doc.data().airtimebalance || 0);
                }
            });
        }
    }, []);


    const buyairtime = async()=>{
        const amt = parseFloat(amount);

        if(isNaN(amt) || amt <= 100 || amt > 10000){
            Keyboard.dismiss();
            setSnackbarMessage("Airtime must be more than 100");
            setSnackbarVisible(true);
            return;
        }

        const newBalance =  currentBalance + amt;

        try{
            await firebase.firestore().collection('Profiles').doc(uid).update({
                airtimebalance: newBalance,
            });
            Keyboard.dismiss()
            setSnackbarMessage("Airtime Purchase Successful Redirecting...")
            setSnackbarVisible(true)
            setCurrentBalance(newBalance);
            setAmount('');
            setTimeout(()=>{
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen2'}],
                })

            }, 1500);

        } catch(error){
            Keyboard.dismiss();
            setSnackbarMessage("Error")
            setSnackbarVisible(true)
        }

    };


    return(
        <View style={Style.Container}>

            <TextInput value={amount} onChangeText={setAmount} placeholder="Enter Amount (10000 Max)" keyboardType="numeric" style={Style.TI}></TextInput>

            <TouchableOpacity onPress={buyairtime}  style={{marginTop: 8 ,padding: 10, backgroundColor: '#409439', width: 100, borderRadius: 4, alignItems: 'center'}}>
                <Text style={{color: 'white', fontWeight: '400'}}>Proceed</Text>
            </TouchableOpacity>

            <Snackbar visible={snackbarVisible} onDismiss={()=> setSnackbarVisible(false)} duration={1500}>{snackbarMessage}</Snackbar>

        </View>
    )


};


const Style = StyleSheet.create({
    Container:{
        backgroundColor: 'black',
        flex: 1,
        padding: 10
    },

    TI:{
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        width: 200,
        borderRadius: 5,
        marginTop: 13,
    }
})

export default AritePurchaseScreen;