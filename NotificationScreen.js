import React from "react";
import{View, Text} from 'react-native';
import { Tab, TabView } from "@rneui/base";



const NotificationScreen = () =>{

    const [index, setIndex]= React.useState(0);
    return(
        <View style={{flex: 1, alignContent: 'center', backgroundColor: 'black', alignItems: 'center', padding: 20}}>
                <Tab value={index} onChange={(e)=> setIndex(e)} indicatorStyle={{backgroundColor: 'green', height: 2 }}>
                    <Tab.Item title={'Home'}></Tab.Item>
                    <Tab.Item title={'Exam'}></Tab.Item>
                    </Tab>

                    <TabView value={index} onChange={setIndex}>
                        <TabView.Item style={{width: '100%'}}>
                            <Text style={{color: 'white'}}>Hello</Text>
                        </TabView.Item>
                        <TabView.Item style={{width: '100%'}}>
                            <Text style={{color: 'white'}}>Welcome</Text>
                        </TabView.Item>
                    </TabView>
        </View>
    )
}




export default NotificationScreen;
