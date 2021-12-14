import React, { useEffect, useReducer, userEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage"

import authReducer from "../reducers/Auth.reducer";
import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from './AuthGlobal'

const Auth = props => {
console.log("auth callled");
    const [stateUser, dispatch] = useReducer(authReducer, {
        
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);
    const displayData = async ()=>{  
    try{  
      let user = await AsyncStorage.getItem('userData'); 
      let parsed = JSON.parse(user); 
      let user2 = await AsyncStorage.getItem('jwt');  
       if(user2){ 
           stateUser.isAuthenticated=true;
       }
       if(parsed){ 
           stateUser.user=parsed;
       }
      console.log("user 1 is",parsed);
      console.log("user 1 is",user2);
      console.log("state user in auth is",stateUser); 
      if(user2 && parsed){ dispatch(
          setCurrentUser(jwt_decode(user2),stateUser)); }  
    }  
    catch(error){  
        console.log("erroer found",error)
      alert(error)  
    }  
  }
    useEffect(() => {

        //displayData()
        setShowChild(true);
        if (AsyncStorage.jwt) {
            console.log("there is async storage jwtttttt")
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
            console.log("decoded is ",decoded);
            if (setShowChild) {
                dispatch(setCurrentUser(jwt_decode(decoded)))
            }
        }
        return () => setShowChild(false);
    }, [])


    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
};

export default Auth;