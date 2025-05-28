import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { firebase } from "./firebaseConfig";
import* as ImagePicker from "expo-image-picker";




const ProfileSetupScreen = ({navigation, route}) =>{
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [image, setImage] = useState(null);
    const [uid, setUid] = useState('');


    useEffect(()=>{
        const user = firebase.auth().currentUser;

        if(user){
            setEmail(user.email);
            setUid(user.uid);
        }

        (async()=>{
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if(status != 'granted'){
                alert("Permission is required to upload photo");
            }
        })();
    }, []);


    const pickImage = async()=>{
        let results = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.5,
        });

        if(!results.canceled){
            setImage(results.assets[0].uri);
        }
    };

    const saveProfile = async()=>{
        try{
            await firebase.firestore().collection('Profiles').doc(uid).set({
                username,
                fullname,
                phoneno,
                email,
                image,
            });

            console.log("Profile Saved!")

            navigation.reset({
                index: 0,
                routes: [{name: 'HomeScreen'}],
            })
        } catch (error){
            console.log("error", error);
        }
    };

    return(

        <View style={Styles.container}>

            <Text style={Styles.heading}>Complete Your Profile</Text>

            <TouchableOpacity onPress={pickImage}>
                {image ?(
                    <Image source ={{uri: image}} style={Styles.imagePicker}></Image>
                ): (
                    <View style={Styles.Imgplaceholder}>
                        <Text style={Styles.imgtxt}>Tap to pick an image</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput value={username} placeholder="Username" onChangeText={setUsername} style={Styles.input}></TextInput>
            <TextInput value={fullname} placeholder="Fullname" onChangeText={setFullname} style={Styles.input}></TextInput>
            <TextInput value={phoneno} placeholder="Phone Number" onChangeText={setPhoneno} style={Styles.input}></TextInput>
            <TextInput value={email} editable={false} style={Styles.input}></TextInput>

            <TouchableOpacity onPress={saveProfile} style={Styles.button}>
                <Text style={Styles.btntxt}>Save Profile</Text>
            </TouchableOpacity>

        </View>
    );


};


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: 'black',
    },

    heading: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 4,
        color: 'white',
    },

    input:{
        borderWidth: 1,
        borderBlockColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginTop: 15,
        marginBottom: 2
    },

    imagePicker:{
        width: 120,
        height: 120,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 14,
    },

    Imgplaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 14,
        marginBottom: 10,
    },

    imgtxt: {
        textAlign: 'center',

    },

    button:{
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        marginTop: 25,
        alignItems: 'center',
    },

    btntxt:{
        color: 'white',

    }


});


export default ProfileSetupScreen;