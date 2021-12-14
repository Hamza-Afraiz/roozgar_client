import React,{useEffect,useContext} from 'react'
import { View, Text,ActivityIndicator } from 'react-native'
import AuthGlobal from "../Context/store/AuthGlobal";
import { setCurrentUser } from "../Context/actions/Auth.actions";
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwt_decode from "jwt-decode";

import {useSelector,useDispatch} from 'react-redux'
import { loggedinUser } from "../Context/actions/Auth.actions";
const InitialScreen = (props,{navigation}) => {
    const context = useContext(AuthGlobal);
    const displayData = async ()=>{  
        try{  
          let user = await AsyncStorage.getItem('userData'); 
          let parsed = JSON.parse(user); 
          let user2 = await AsyncStorage.getItem('jwt');  
          const user3={user,user2}
          console.log("parsed data in object is  ",parsed);
          console.log("jwt token is",user2);
        
          if(user2 && parsed){
            loggedinUser(parsed,user2, context.dispatch);
              props.navigation.replace("Home");
            
            }
            else{ 
                props.navigation.replace("Signin");
            }  
        }  
        catch(error){  
            console.log("erroer found",error)
          alert(error)  
        }  
      }
    useEffect(() => {
        // console.log("stateuser in initial is is ",context.stateUser.userProfile
        // )
       
        // console.log("authentication is  ",context.stateUser.isAuthenticated
        // )
        // // Toast.show({
        // //   text1: 'Hello',
        // //   text2: 'Wellcome Back Dear Client 👋'
        // // });
        // if (context.stateUser.isAuthenticated === true) {
        //   props.navigation.replace("Home");
        // }
        // else{
        //     props.navigation.replace("Signin");
        // }
       displayData()

    },[context.stateUser.isAuthenticated])
    return (
        <View style={{alignSelf:'center',marginTop:'50%'}}>
       <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
}

export default InitialScreen
