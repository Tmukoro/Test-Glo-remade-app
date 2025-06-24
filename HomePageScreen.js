import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet,TouchableOpacity, Image, Alert } from "react-native";
import * as Clipboard from 'expo-clipboard'
import { firebase } from "./firebaseConfig";
import {Feather} from '@expo/vector-icons';
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


import Metericon from './Icons/Vector.png';
import RCICON from './Icons/recovery-convert.png';
import SENDICON from './Icons/send-2.png';
import IMPORTICON from './Icons/import.png';
import GIFTICON from './Icons/gift.png';
import SIMICON from './Icons/simcard.png';
import MAPICON from './Icons/map.png';
import ADIMG from './images/Adblock.png';
import { Snackbar } from "react-native-paper";


const HomePageScreen = ()=>{
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState('');

    useEffect( ()=> {
         const user =  firebase.auth().currentUser;

         if(user){
            firebase.firestore()
            .collection("Profiles")
            .doc(user.uid)
            .get()
            .then(doc => {
                if(doc.exists){
                    setProfile(doc.data());
                }
            });
         }
    }, []);



    const copyphoneno = ()=>{
        if(profile?.phoneno){
               Clipboard.setStringAsync(profile.phoneno);
               setSnackbarMessage("Copied to Clipboard");
               setSnackbarVisible(true);
        }
    };


    if(!profile){
        return(
            <View style={{backgroundColor: 'black', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', color: 'white'}}>Loading...</Text>
            </View>
        );
    }

    const formatdata = (mb)=>{
        if(mb >= 1000){
            return `${(mb / 1000).toFixed(1)}GB`;
        }
        return  `${mb} MB`;
    }




    return(
        <View style={Styles.container}>

            {/* Header box */}

            <View style={Styles.header}>

                <TouchableOpacity style={Styles.pbox}
                onPress={()=> navigation.navigate('Account Info')}>

                {profile.image && (<Image source={{uri: profile.image}} style={Styles.pimg} ></Image>)}

                <Text style={Styles.wtxt}>Hi,{profile.username}</Text>

                </TouchableOpacity>



                <View style={Styles.Nobox}>

                    <TouchableOpacity onPress={copyphoneno} style={Styles.copyobx}>
                    <Text style={Styles.phonetxt}>{profile.phoneno}</Text>
                    <Feather name="copy" size={18} color='white' style={Styles.cicon}></Feather>
                    </TouchableOpacity>

                </View>

            </View>



          {/* BODY SECTION */}


          <View style={Styles.balancebox}>

            <View style={Styles.airtime}>
                <Text style={{color: '#D8D8D8' , fontWeight: '400', fontSize: 12 }}>Airtime Balance</Text>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>N{profile.airtimebalance}</Text>
            </View>

            <View style={Styles.btnbox1}>
                <TouchableOpacity style={{padding: 10, backgroundColor: '#29292B', marginTop: 5, borderRadius: 7}} onPress={()=> navigation.navigate('Buy Airtime')}>
                    <Text style={{color: '#61BF5A', textAlign: 'center', fontWeight: 'bold'}}>Recharge</Text>
                </TouchableOpacity>
            </View>

          </View> 

          <View style={Styles.balancebox2}>

            <View style={{width: 100, height: 60, marginLeft: 8}}>
          
            <Image source={Metericon} style={{position: 'absolute', left: 8, top: 5}}></Image>
            <Text style={{color: 'white', textAlign: 'center', paddingTop: 28, fontWeight: 'bold'}}>50%</Text>

            </View>


            <View style={{width: 117, height: 50, marginRight: 162, marginTop: 10}}>
                <Text style={{color: '#D8D8D8', fontSize: 10}}>Data Balance</Text>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16 }}>{formatdata(profile?.databalance)}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#61BF5A" style={{position: 'absolute', left: 85, top: 4}} />
            </View>
            

            <View style={{width: 117, height: 50, position: 'absolute', left: 265, top: 10}}>
                <TouchableOpacity style={{padding: 10, backgroundColor: '#29292B', marginTop: 5, borderRadius: 7}} onPress={()=> navigation.navigate('Buy Data')}>
                    <Text style={{color: '#61BF5A', textAlign: 'center', fontWeight: 'bold'}}>Buy Data</Text>
                </TouchableOpacity>
            </View>


          </View>



          {/* SHORTCUT SECTION */}


          <View style={Styles.scsect}>

            <Text style={{color: 'white', fontSize: 14, marginLeft: 18, fontWeight: 'bold'}}>Shortcuts</Text>

            <View style={Styles.optbox}>

                <View  style={{flexDirection: 'row', height: 80, marginTop: 10}}>

                <TouchableOpacity onPress={()=>{navigation.navigate('History')}}  style={{borderWidth: 1, borderColor: '#29292B', width: 70, height: 70, borderRadius: 8, backgroundColor: '#1F1F21', marginLeft: 15}}>
                    <Image source={RCICON} style={{alignSelf: 'center', marginTop: 11, width: 25}}></Image>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 12, marginTop: 5}}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 1, borderColor: '#29292B', width: 70, height: 70, borderRadius: 8, backgroundColor: '#1F1F21', marginLeft: 15}}>
                    <Image source={SENDICON} style={{alignSelf: 'center', marginTop: 12, width: 25}}></Image>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 12, marginTop: 5}}>Share</Text>                     
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 1, borderColor: '#29292B', width: 70, height: 70, borderRadius: 8, backgroundColor: '#1F1F21', marginLeft: 15}}>
                    <Image source={IMPORTICON} style={{alignSelf: 'center', marginTop: 10, width: 25}}></Image>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 12, marginTop: 6}}>Borrow</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 1, borderColor: '#29292B', width: 70, height: 70, borderRadius: 8, backgroundColor: '#1F1F21', marginLeft: 15}}>
                <Image source={GIFTICON} style={{alignSelf: 'center', marginTop: 11, width: 25}}></Image>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 12, marginTop: 5}}>Offers</Text>
                </TouchableOpacity>

                </View>


                <View style={{flexDirection: 'row', height: 80, marginTop: 6}}>

                <TouchableOpacity style={{borderWidth: 1, borderColor: '#29292B', width: 70, height: 70, borderRadius: 8, backgroundColor: '#1F1F21', marginLeft: 15}}>
                <Image source={SIMICON} style={{alignSelf: 'center', marginTop: 11, width: 25}}></Image>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 11, marginTop: 5}}>Add SIM</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 1, borderColor: '#29292B', width: 70, height: 70, borderRadius: 8, backgroundColor: '#1F1F21', marginLeft: 15}}>
                <Image source={MAPICON} style={{alignSelf: 'center', marginTop: 11, width: 25}}></Image>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 11, marginTop: 5}}>Glo Stores</Text>
                </TouchableOpacity>


                </View>

            </View>

          </View>




          {/* DONT MISS SECTION */}


          <View style={Styles.DMsect}>

            <Text style={{color: 'white', marginLeft: 18, fontWeight: 'bold'}}>Don't Miss</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingHorizontal: 8, paddingVertical: 1}}>
                
                <View style={{ height: 160, width: 314, borderRadius: 10, marginTop: 10, marginLeft: 8}}>
                    <Image source={ADIMG} style={{borderRadius: 8, position: 'relative', top: 3}}></Image>
                    
                    <TouchableOpacity style={{zIndex: 1 ,marginBottom: 5 ,alignItems: 'center' ,flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1F1F21', borderRadius: 7, height: 36}}>
                        <Text style={{color: 'white', paddingLeft: 8}}>Click to learn More</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="#61BF5A" style={{}} />
                        </TouchableOpacity>
                </View>

                <View style={{ height: 160, width: 314, borderRadius: 10, marginTop: 10, marginLeft: 25}}>
                    <Image source={ADIMG} style={{borderRadius: 8, position: 'relative', top: 3}}></Image>
                    
                    <TouchableOpacity style={{zIndex: 1 ,marginBottom: 5 ,alignItems: 'center' ,flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1F1F21', borderRadius: 7, height: 36}}>
                        <Text style={{color: 'white'}}>Click to learn More</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="#61BF5A" style={{}} />
                        </TouchableOpacity>
                </View>


            </ScrollView>

          </View>





















        <Snackbar visible={snackbarVisible} onDismiss={()=> setSnackbarVisible(false)} duration={1500}>{snackbarMessage}</Snackbar>
        </View>


        






    )

}




const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header:{
        backgroundColor: '#409439',
        paddingTop: 60,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    pimg:{
        borderRadius: 60,
        width: 50,
        height: 50,
    },

    wtxt:{
        color: 'white',
        fontWeight: 'bold',
    },

    pbox:{
       flexDirection: 'row',
       justifyContent: 'space-between',
       width: 125,
       marginLeft: 18,
       alignItems: 'center',
    },

    Nobox:{
       flexDirection: 'row',
       justifyContent: 'space-between',
       width: 135,
       marginRight: 18,
       alignItems: 'center',
    },

    copyobx: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#47A640',
        padding: 9,
        borderRadius: 5,
    },

    phonetxt: {
        color: 'white',
    },

    cicon: {
        paddingLeft: 8,
    },

    balancebox:{
        backgroundColor: '#1A1A1C',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    airtime:{
        height: 40,
        marginTop: 20,
        marginLeft: 18,
    },

    btnbox1:{
        height: 50,
        width: 110,
        marginTop: 16,
        marginRight: 15,
    },

    balancebox2:{
        backgroundColor: '#1A1A1C',
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    scsect:{
        backgroundColor: '#1A1A1C',
        height: 230,
    },

    optbox:{
        height: 180,
        width: 385,
        alignSelf: 'center',
    },

    DMsect:{
        backgroundColor: '#1A1A1C',
        height: 250,
        paddingTop: 5,
    }
})














export default HomePageScreen;