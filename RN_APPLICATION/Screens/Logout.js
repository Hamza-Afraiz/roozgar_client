import React  ,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text,Image, View,TextInput,ActivityIndicator,TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from "../Constants/Colors.js";
import { useIsFocused } from '@react-navigation/native';
import AuthGlobal from "../Context/store/AuthGlobal";
import { loginUser } from "../Context/actions/Auth.actions";
import { logoutUser } from "../Context/actions/Auth.actions";
import logo from '../assets/rglogo.png';

const Logout = (props,{navigation}) => {
  const context = useContext(AuthGlobal);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, isLoading] = useState("0");
  const isFocused = useIsFocused();

  useEffect(() => {
      console.log("backkk to  logout")
    console.log("stateusr in logut  is ",context.stateUser.userProfile
    )
    console.log("authentication in logout  ",context.stateUser.isAuthenticated
    )

    logoutUser(context.dispatch)
  
    if (context.stateUser.isAuthenticated === false) {
      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Services',
           
          },
        ],
        params:{
          
        }
      });
    }
  }, [context.stateUser.isAuthenticated]);

  
    return (
      <View style={styles.container}>
       <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:Colors.secondary,
        marginBottom:40
      },
      inputView:{
        width:"80%",
        backgroundColor:Colors.input,
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"white",
        marginBottom:20
      },
      forgot:{
        color:"white",
        fontSize:11
      },
      loginBtn:{
        width:"80%",
        backgroundColor:Colors.secondary,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      userImage: {
        borderColor: '#FFF',
        borderRadius: 0,
        borderWidth: 3,
        height: 270,
        marginBottom: 15,
        width: 255,
      },


});
export default Logout;