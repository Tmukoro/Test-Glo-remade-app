import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity,  } from "react-native";
import { firebase } from "./firebaseConfig";
import { Button, Snackbar } from "react-native-paper";



const DataPurchaseScreen = ({navigation})=>{

    const [uid, setUid] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0);
    const [currentData, setCurrentData] = useState(0);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState('');

   useEffect(()=>{
    const user = firebase.auth().currentUser;

    firebase.firestore().collection('Profiles').doc(user.uid).get()

    if(user){
        setUid(user.uid)

        firebase.firestore().collection('Profiles').doc(user.uid).get()

        .then(doc=>{
            if(doc.exists){
                setCurrentBalance(doc.data().airtimebalance || 0);
                setCurrentData(doc.data().databalance || 0);
            }
        })

    }

   },[])
    
//    Function for 150 for 200mb

    const Package1 = async()=>{

        let newDataBalance = 0;
        let newAirtimeBalance = 0;
        

        const data = 200;

        if(currentBalance >= 150){
            newDataBalance = currentData + data;
            newAirtimeBalance = currentBalance - 150;
            setSnackbarMessage("Purchase Succesfull");
            setSnackbarVisible(true);
            setTimeout(()=>{
                navigation.reset({
                    index: 1,
                    routes: [{name: 'HomeScreen2'}]
                })
            }, 1500);

        }else if(currentBalance < 150){
            setSnackbarMessage("Insufficient Airtime");
            setSnackbarVisible(true);
        }


        try{
            await firebase.firestore().collection('Profiles').doc(uid).update({
                databalance: newDataBalance,
                airtimebalance: newAirtimeBalance,
            });
            setCurrentBalance(newAirtimeBalance);
            setCurrentData(newDataBalance)
            
        }catch(error){
            setSnackbarMessage("Error 2");
            setSnackbarVisible(true);
        }


        if(currentBalance > 150){
            await firebase.firestore().collection('Profiles').doc(uid).collection('History').add({
                type: 'Data',
                amount: 150,
                unit: 'MB',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        }



    }

    //    # FUNCTION FOR 300 FOR 1GB

       const Package2 = async()=>{
        let newDataBalance = 0;
        let newAirtimeBalance = 0;

        const data = 1000;

        if(currentBalance >= 300){
            newDataBalance = currentData + data;
            newAirtimeBalance = currentBalance - 300;
            setSnackbarMessage("Purchase Succesfull");
            setSnackbarVisible(true);
            setTimeout(() => {
                navigation.reset({
                    index: 1,
                    routes: [{name: 'HomeScreen2'}],
                })
                
            }, 1500);
        } else{
            setSnackbarMessage("Insufficient Airtime");
            setSnackbarVisible(true)
        }

        try {
            await firebase.firestore().collection('Profiles').doc(uid).update({
                databalance: newDataBalance,
                airtimebalance: newAirtimeBalance,
            })

            setCurrentData(newDataBalance);
            setCurrentBalance(newAirtimeBalance);
        } catch(error){
            setSnackbarMessage("error");
            setSnackbarVisible(true);
        }

  


        if(currentBalance > 300){
            await firebase.firestore().collection('Profiles').doc(uid).collection('History').add({
                type: 'Data',
                amount: 1,
                unit: 'GB',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }


       }





    return(
        <View style={Styles.Container}>

           <Text style={{color: 'white'}}>Please Select Desired Plan</Text>

                   {/* 200MB */}
           <View style={{borderWidth: 2, borderColor: '#409439', height: 200, marginTop: 10, padding: 8, borderRadius: 8, backgroundColor: 'white'}}>

            <Text style={{color: 'black', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>200MB Daily Plan</Text>

            <Text style={{color: 'black', fontSize: 13, paddingTop: 10}}>Get 200MB for N150 valid for 1 day</Text>

            
             <TouchableOpacity onPress={Package1} style={{backgroundColor: '#409439', borderRadius: 15, width: 100, height: 30, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
                <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
             </TouchableOpacity>

            </View>

                   {/* 1GB */}
           <View style={{borderWidth: 1, borderColor: '#409439', height: 200, marginTop: 20, padding: 8, borderRadius: 8}}>

            <Text style={{color: 'white', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>1GB Daily Plan</Text>

            <Text style={{color: 'white', fontSize: 13, paddingTop: 10}}>Get 1GB for N300 valid for 1 day</Text>

            
             <TouchableOpacity onPress={Package2} style={{padding: 8,backgroundColor: '#409439', borderRadius: 15, width: 100, height: 30, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
                <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
             </TouchableOpacity>

            </View> 






           <Snackbar visible={snackbarVisible} onDismiss={()=> setSnackbarVisible(false)} duration={1500}>{snackbarMessage}</Snackbar>
        </View>
    )


}


const Styles = StyleSheet.create({
    Container:{
        backgroundColor: 'black',
        flex: 1,
        padding: 20
    }
})



export default DataPurchaseScreen;