import React  ,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text,Image, View,TextInput,TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from "../Constants/Colors.js";
import { useIsFocused } from '@react-navigation/native';
import AuthGlobal from "../Context/store/AuthGlobal";
import { loginUser } from "../Context/actions/Auth.actions";
import logo from '../assets/rglogo.png';

const Signin = (props,{navigation}) => {
  const context = useContext(AuthGlobal);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("stateusr is ",context.stateUser.userProfile
    )
    console.log("authentication is  ",context.stateUser.isAuthenticated
    )
    Toast.show({
      text1: 'Hello',
      text2: 'Wellcome Back Dear Client 👋'
    });
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("Services");
    }
  }, [context.stateUser.isAuthenticated,isFocused]);

  const handleSubmit = () => {
    console.log('handle submit')
    const user = {
      userName,
      password,
    };
     console.log("user type is ",user)
    if (userName === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };
    return (
      <View style={styles.container}>
        <Image
             style={styles.userImage}
              source={logo}
            />
        
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <View style={styles.inputView} >

          <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="black"
            onChangeText={text => setuserName(text)}/>
            
        </View>
        <View style={styles.inputView} >
           
          <TextInput  
            style={styles.inputText}
            placeholder="Password.." 
            placeholderTextColor="black"
            secureTextEntry={true}

            onChangeText={text => setPassword(text)}/>
            
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.loginBtn}
         onPress={handleSubmit}
        >
          <Text style={styles.loginText}>LOGIN</Text>
         
        </TouchableOpacity >
        <TouchableOpacity
         onPress={()=> props.navigation.navigate('Signup')}
         >
          <Text style={styles.loginText}>Signup</Text>

        </TouchableOpacity>
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
export default Signin;