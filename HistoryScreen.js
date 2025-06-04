import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { firebase } from "./firebaseConfig";



const HistoryScreen = ()=>{
    const [history, setHistory] = useState([]);

    useEffect(()=>{
        const user = firebase.auth().currentUser;

        const unsubscribe = firebase.firestore().collection('Profiles').doc(user.uid).collection('History').orderBy('timestamp', 'desc').onSnapshot(snapshot=>{
            const data = snapshot.docs.map(doc =>({
                id: doc.id,
                ...doc.data(),
            }));
            setHistory(data);
        });

        return unsubscribe;
    }, []);


    const formatDate = (timestamp) =>{
        if(!timestamp) return '';
        return new Date(timestamp.seconds * 1000).toLocaleString();
    };

    const renderItem = ({item}) =>{
        return (
        <View style={{marginBottom: 18}}>
            <Text style={{color: 'white'}}>{item.type} Purchase</Text>
            <Text style={{color: 'white'}}>{item.amount} {item.unit}</Text>
            <Text style={{color: 'white'}}>Date: {formatDate(item.timestamp)}</Text>
            <Text style={{color: 'white'}}>Succesfull</Text>
        </View>
        );
    };


    return(
        <View style={styles.container}>

            <FlatList
            data={history}
            keyExtractor={item=> item.id}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={{color: 'white', textAlign: 'center', margin: 'auto'}}>Nothing to see here :)</Text>}></FlatList>

        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        flex: 1,
        padding: 20,
    },
    
})




export default HistoryScreen;