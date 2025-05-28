import React, {useState, useEffect} from "react";
import { View, Text, Image,StyleSheet,Button, TouchableOpacity } from "react-native";
import { firebase } from "./firebaseConfig";


const ProfileinfoScreen = ({navigation})=>{
    const [profile, setProfile] = useState('');

    useEffect(()=>{
        const uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection('Profiles').doc(uid).get()

        .then(doc =>{
            if(doc.exists) setProfile(doc.data());
        });
    }, []);

    const signout = async()=>{
       await firebase.auth().signOut();
       navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
       });
    }


    if(!profile){
        return <Text>Loading...</Text>;
    }


    return(
        <View style={Styles.Container}>
            {profile.image && <Image source={{uri: profile.image}} style={{width: 100, height: 100, borderRadius: 50}}></Image>}
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', paddingTop: 25}}>Username: {profile.username}</Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', paddingTop: 25}}>Full Name: {profile.fullname}</Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', paddingTop: 25}}>Phone Number: {profile.phoneno}</Text>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', paddingTop: 25}}>Email: {profile.email}</Text>
            <TouchableOpacity onPress={signout} style={{borderRadius: 3, backgroundColor: '#409439', width: 100, height: 30, alignItems: 'center', marginTop: 30}}>
                <Text style={{color: 'white', textAlign: 'center', margin: 'auto'}}>LOGOUT</Text>
            </TouchableOpacity>
        
        
        </View>
    )
}



const Styles = StyleSheet.create({
    Container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#1A1A1C'
    }
});

export default ProfileinfoScreen;