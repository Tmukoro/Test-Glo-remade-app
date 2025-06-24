import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { firebase } from "./firebaseConfig";
import {Snackbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Tab, TabView } from "@rneui/base";



const DataPurchaseScreen = ({navigation})=>{

    const [uid, setUid] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0);
    const [currentData, setCurrentData] = useState(0);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState('');
    const[index, setIndex] = React.useState(0);

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
    

       const PackageX = (Airtime, Data)=>{       

        const Unit = Data>=1000 ? 'GB':'MB';
        const displayAmount = Unit === 'GB' ? Data /1000 : Data;

        if(currentBalance >= Airtime){
           const newDataBalance = currentData + Data;
            const newAirtimeBalance = currentBalance - Airtime;

            (async()=>{

                try{
                    await firebase.firestore().collection('Profiles').doc(uid).update({
                        airtimebalance: newAirtimeBalance,
                        databalance: newDataBalance,
                    })
        
                    setCurrentBalance(newAirtimeBalance);
                    setCurrentData(newDataBalance);

                    setSnackbarMessage("Purchase Successful");
                    setSnackbarVisible(true);
                    setTimeout(() => {
                        navigation.reset({
                            index: 1,
                            routes: [{name: 'HomeScreen2'}],
                        })
                    }, 1500);



                }catch(error){
                    setSnackbarMessage(error);
                    setSnackbarVisible(true);
                }
        
                if(currentBalance >= Airtime){
                    await firebase.firestore().collection('Profiles').doc(uid).collection('History').add({
                        type: 'Data',
                        amount: displayAmount,
                        unit: Unit,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                }
        
            })();





        }else{
            setSnackbarMessage('Insufficient Airtime');
            setSnackbarVisible(true);
        }



  
       }





    return(
        <View style={Styles.Container}>
            

            <Tab value={index} onChange={(e)=> setIndex(e)} indicatorStyle={{backgroundColor: 'green', height: 3}} scrollable={true}>
                <Tab.Item title={'Daily'} titleStyle={{color: 'green'}}></Tab.Item>
                <Tab.Item title={'Weekly'} titleStyle={{color: 'green'}}></Tab.Item>
                <Tab.Item title={'Monthly'} titleStyle={{color: 'green'}}></Tab.Item>
                <Tab.Item title={'Yearly'} titleStyle={{color: 'green'}}></Tab.Item>
            </Tab>


            <TabView value={index} onChange={setIndex}>


                {/* Daily Plans*/}
             <TabView.Item style={{width: '100%'}}>
        
             <View style={{padding: 8}}>

           <ScrollView style={{paddingVertical: 13, paddingHorizontal: 1}}>


                   {/* 200MB */}
           <View style={{borderWidth: 2, borderColor: '#409439', height: 200, width: '95%' ,marginTop: 10, padding: 8, borderRadius: 8, backgroundColor: 'white'}}>

            <Text style={{color: 'black', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>200MB Daily Plan</Text>

            <Text style={{color: 'black', fontSize: 13, paddingTop: 10}}>Get 200MB for N150 valid for 1 day</Text>

            
             <TouchableOpacity onPress={()=>PackageX(150, 200)} style={{backgroundColor: '#409439', borderRadius: 15, width: 100, height: 35, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
                <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
             </TouchableOpacity>

            </View>





                   {/* 1GB */}
           <View style={{borderWidth: 1, borderColor: '#409439', height: 200, width: '95%' ,marginTop: 20, padding: 8, borderRadius: 8}}>

            <Text style={{color: 'white', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>1GB Daily Plan</Text>

            <Text style={{color: 'white', fontSize: 13, paddingTop: 10}}>Get 1GB for N300 valid for 1 day</Text>

            
             <TouchableOpacity onPress={()=> PackageX(300, 1000)} style={{padding: 8,backgroundColor: '#409439', borderRadius: 15, width: 100, height: 35, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
                <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
             </TouchableOpacity>

            </View> 




            {/* 2GB */}

            <View style={{borderWidth: 1, borderColor: '#409439', height: 200, width: '95%' ,marginTop: 20, padding: 8, borderRadius: 8}}>

            <Text style={{color: '#409439', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>2GB Daily Plan</Text>

            <Text style={{color: '#409439', fontSize: 13, paddingTop: 10}}>Get 2GB for N500 valid for 2 days</Text>

            
             <TouchableOpacity onPress={()=> PackageX(500, 2000)} style={{padding: 8,backgroundColor: '#409439', borderRadius: 15, width: 100, height: 35, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
                <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
             </TouchableOpacity>

            </View> 







            {/* 5GB */}

            <View style={{borderWidth: 1, borderColor: '#409439', height: 200, width: '95%' ,marginTop: 20, padding: 8, borderRadius: 8, marginBottom: '5%', backgroundColor: 'white'}}>

            <Text style={{color: '#409439', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>5GB Daily Plan</Text>

            <Text style={{color: '#409439', fontSize: 13, paddingTop: 10}}>Get 5GB for N1000 valid for 3 days</Text>

            
            <TouchableOpacity onPress={()=> PackageX(1000, 5000)} style={{padding: 8,backgroundColor: '#409439', borderRadius: 15, width: 100, height: 35, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
           <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
         </TouchableOpacity>

            </View> 





            </ScrollView>

            </View>

             </TabView.Item>



              {/* Weekly Plans */}
             <TabView.Item style={{width: '100%'}}>

                <View style={{padding: 8}}>

           <ScrollView style={{paddingVertical: 13, paddingHorizontal: 1}}>


                   {/* 1GB */}
           <View style={{borderWidth: 2, borderColor: '#409439', height: 200, width: '95%' ,marginTop: 10, padding: 8, borderRadius: 8, backgroundColor: 'white'}}>

            <Text style={{color: 'black', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>1GB Weekly Plan</Text>

            <Text style={{color: 'black', fontSize: 13, paddingTop: 10}}>Get 1GB for N750 valid for 7 days</Text>

            
             <TouchableOpacity onPress={()=> PackageX(750, 1000)} style={{backgroundColor: '#409439', borderRadius: 15, width: 100, height: 35, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
                <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
             </TouchableOpacity>

            </View>





                   {/* 5GB */}
           <View style={{borderWidth: 1, borderColor: '#409439', height: 200, width: '95%' ,marginTop: 20, padding: 8, borderRadius: 8}}>

            <Text style={{color: 'white', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>1GB Daily Plan</Text>

            <Text style={{color: 'white', fontSize: 13, paddingTop: 10}}>Get 5GB for N1500 valid for 7 days</Text>

            
             <TouchableOpacity onPress={()=> PackageX(1500, 5000)} style={{padding: 8,backgroundColor: '#409439', borderRadius: 15, width: 100, height: 35, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
                <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
             </TouchableOpacity>

            </View> 




            {/* 10GB */}

            <View style={{borderWidth: 1, borderColor: '#409439', height: 200, width: '95%' ,marginTop: 20, padding: 8, borderRadius: 8}}>

            <Text style={{color: '#409439', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>2GB Daily Plan</Text>

            <Text style={{color: '#409439', fontSize: 13, paddingTop: 10}}>Get 10GB for N3000 valid for 7 days</Text>

            
             <TouchableOpacity onPress={()=> PackageX(3000, 10000)} style={{padding: 8,backgroundColor: '#409439', borderRadius: 15, width: 100, height: 35, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
                <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
             </TouchableOpacity>

            </View> 







            {/* 15GB */}

            <View style={{borderWidth: 1, borderColor: '#409439', height: 200, width: '95%' ,marginTop: 20, padding: 8, borderRadius: 8, marginBottom: '5%', backgroundColor: 'white'}}>

            <Text style={{color: '#409439', fontSize: 15, paddingTop: 10, fontWeight: 'bold'}}>5GB Daily Plan</Text>

            <Text style={{color: '#409439', fontSize: 13, paddingTop: 10}}>Get 15GB for N2000 valid for 3 days</Text>

            
            <TouchableOpacity onPress={()=> PackageX(2000, 15000)} style={{padding: 8,backgroundColor: '#409439', borderRadius: 15, width: 100, height: 35, alignItems: 'center', position: 'absolute', top: '145', left: '240'}}>
           <Text style={{color: 'white', margin: 'auto'}}>Buy Now</Text>
         </TouchableOpacity>

            </View> 





            </ScrollView>

            </View>
             </TabView.Item>


              {/* Monthly Plans */}
             <TabView.Item style={{width: '100%'}}>
               <Text style={{textAlign: 'center', color: 'white'}}>Nothing to see here for now</Text>
             </TabView.Item>


             <TabView.Item style={{width: '100%'}}>
               <Text style={{textAlign: 'center', color: 'white'}}>Nothing to see here for now</Text>
             </TabView.Item>



            </TabView>





           <Snackbar visible={snackbarVisible} onDismiss={()=> setSnackbarVisible(false)} duration={1500}>{snackbarMessage}</Snackbar>
        </View>
    )


}


const Styles = StyleSheet.create({
    Container:{
        backgroundColor: 'black',
        flex: 1,
        height: '100%',
    }
})



export default DataPurchaseScreen;