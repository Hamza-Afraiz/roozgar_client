import React  ,{useContext,useState,useEffect} from 'react';
import { StyleSheet, FlatList,Text,Image, View,TextInput,TouchableOpacity, Alert,Modal,Pressable} from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from "../Constants/Colors.js";
import { useIsFocused } from '@react-navigation/native';
import AuthGlobal from "../Context/store/AuthGlobal";
import { loginUser } from "../Context/actions/Auth.actions";
import logo from '../assets/rglogo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BaseUrl } from "../Constants/baseUrl.js";
import io from "socket.io-client";
import messaging from '@react-native-firebase/messaging';
import { Input } from 'react-native-elements';
import { flexBasis } from 'styled-system';
import {useSelector,useDispatch} from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
  import { dashboardList } from "../dummydata/dashboardList";


const Home = ({props,navigation}) => {
  const dispatch  = useDispatch();
  const setArrived=()=>{
    console.log(" set    arrived");
    
    dispatch({type:"ADD_ARRIVEDDATA",payload:"arrived"})
}
   const data3 =  useSelector((state)=>{
     console.log("workking nowww")

  
    return state.intervalData
  })
  useEffect(() => {

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state in gardener:',
        remoteMessage.notification,
      );
      console.log(remoteMessage.data.vendorToken);
      if(remoteMessage.data.accepted == "accepted") {
     
        
       
        navigation.navigate("Maps2",{vendorId:remoteMessage.data.vendorId,info:'accepted',orderId:remoteMessage.data.orderId})
     
      
         
      
    
     }
     if(remoteMessage.data.accepted == "arrived") {
    
       
      setArrived()
      alert('Your vendor has arrived at your doorstep.Please check or contact vendor')
     
        
     
   
    }
     if(remoteMessage.data.accepted == "rejected") {
       // navigation.reset({
       //   index: 0,
       //   routes: [
       //     {
       //       name: 'Categories',
            
       //     },
       //   ],
       //   params:{
       //     info:'cancel'
       //   }
       // });
       navigation.navigate("Categories",{info:'cancel'})
            
        
      
       }
      if(remoteMessage.data.accepted == "completed") {
    
       fetch(`${BaseUrl.wifi}/api/v1/client/getReceipt/?id=${remoteMessage.data.receiptId}` ,{
         method: "GET",
         
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
         },
     })
     .then((res) => res.json())
     .then((data) => {
         if (data) {
            
             const item=data;
             console.log("receipt id  data in signinnnnnnnnnnnnnnnnnnn is ",item)
             navigation.navigate("Receipt",{item:item})

            
            // this.getCurrentLocation();
   
         
             //const value=AsyncStorage.getItem('jwt')
            //console.log("token value is ",value)
            
   
         }
     })
     .catch((err) => {
        alert("incorrect details.Check your details again")
        console.log(err)
     
         
     });
         
       
      
   }
    });
    
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("remote msg is",remoteMessage)
      if(remoteMessage.data.accepted == "accepted") {
     
        
       
         navigation.navigate("Maps2",{vendorId:remoteMessage.data.vendorId,info:'accepted',orderId:remoteMessage.data.orderId})
      
       
          
       
     
      }
      if(remoteMessage.data.accepted == "arrived") {
     
        
       setArrived()
       alert('Your vendor has arrived at your doorstep.Please check or contact vendor')
      
         
      
    
     }
      if(remoteMessage.data.accepted == "rejected") {
        // navigation.reset({
        //   index: 0,
        //   routes: [
        //     {
        //       name: 'Categories',
             
        //     },
        //   ],
        //   params:{
        //     info:'cancel'
        //   }
        // });
        navigation.navigate("Categories",{info:'cancel'})
             
         
       
        }
       if(remoteMessage.data.accepted == "completed") {
     
        fetch(`${BaseUrl.wifi}/api/v1/client/getReceipt/?id=${remoteMessage.data.receiptId}` ,{
          method: "GET",
          
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      })
      .then((res) => res.json())
      .then((data) => {
          if (data) {
             
              const item=data;
              console.log("receipt id  data in signinnnnnnnnnnnnnnnnnnn is ",item)
              navigation.navigate("Receipt",{item:item})

             
             // this.getCurrentLocation();
    
          
              //const value=AsyncStorage.getItem('jwt')
             //console.log("token value is ",value)
             
    
          }
      })
      .catch((err) => {
         alert("incorrect details.Check your details again")
         console.log(err)
      
          
      });
          
        
       
    }
      
       
     /* Alert.alert("A new request has arrived!", "What to do?", [
        {
          text: "Reject",
          onPress: () => {navigation.navigate("Categories")},
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: () => {navigation.navigate("Maps2",{vendorId:remoteMessage.data.vendorId});},
        },
      ]);*/
    });
    return unsubscribe;
  },[])
  const uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

const navigationMethod =(item)=>{
  if(item.id == 1){
    navigation.navigate('Categories');
  }
  if(item.id == 2){
    navigation.navigate('APPOITMENTS');
  }
  if(item.id == 3){
    navigation.navigate('APPOITMENTS');
  }
  if(item.id == 4){
    navigation.navigate('GetComplaints');
  }
  if(item.id == 5){
    navigation.navigate('My Profile');
  }
  if(item.id == 6){
    navigation.navigate('Chatbot');
  }

}
  return (
    <View style={styles.container}>
           
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={dashboardList.data}
          horizontal={false}
          numColumns={2}
         
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity style={[styles.card, {backgroundColor:Colors.secondary}]} onPress={() => {
          
         (navigationMethod(item));
        }}>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                
                </TouchableOpacity>
                

                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={[styles.title, {color:item.color}]}>{uppercase(item.title) 
                    }</Text>
                    
                    
                  </View>
                </View>
              </View>
            )
          }}/>

      </View>
     
  )
}

export default Home



const styles = StyleSheet.create({
    container:{
      flex:1,
      marginLeft:10,
      marginRight:10,
      backgroundColor:'#fff',
    },
    list: {
      paddingHorizontal: 10,
      backgroundColor:"#fff",
    },
    listContainer:{
      alignItems:'center',
      justifyContent:"space-between"
    },
    /******** card **************/
    card:{
        width:"90%",
      shadowColor: '#474747',
      shadowOffset: {
        width: 90,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
  
      elevation: 12,
      marginVertical: 20,
      marginHorizontal: 40,
      backgroundColor:"#e2e2e2",
      //flexBasis: '42%',
      width:120,
      height:120,
      borderRadius:60,
      alignItems:'center',
      justifyContent:'center'
    },
    cardHeader: {
      paddingVertical: 17,
      paddingHorizontal: 20,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardFooter:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    cardImage:{
      height: 100,
      width: 100,
      borderRadius:10,
      alignSelf:'center'
    },
    title:{
      fontSize:20,
      
      alignSelf:'center',
      fontWeight:'bold'
    },
    loginBtn:{
        width:"100%",
        backgroundColor:Colors.secondary,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
          color:Colors.primary,
          fontSize:20
      }
  });     