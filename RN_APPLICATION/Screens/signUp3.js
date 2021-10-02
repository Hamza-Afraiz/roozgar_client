import React  ,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text,Image, View,TextInput,TouchableOpacity, Alert} from 'react-native';
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
const SignUp3 = (props,{navigation}) => {
  const context = useContext(AuthGlobal);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    
  }, []);

  const handleSubmit = () => {
      if(password != confirmPassword) {
          alert("Passwords not matched check again")
          return
      }
    console.log('handle submit')
    const user = {
      userName,
      password,
      phoneNumber,
    };
     console.log("user type is ",user)
    if (userName === "" || password === "" || phoneNumber === "" ) {
      setError("Please fill in your credentials");
    } else {
      props.navigation.navigate('OTP',{item:phoneNumber,item1:user})
      
    }
  };
    return (
      <View style={[styles.container,{}]}>
        <View >
        <Image
             style={styles.userImage}
              source={logo}
            />
        </View>
       
     
       
        
        <View style={{backgroundColor:Colors.bigcard,elevation:2,margin:5,width:'95%',display:'flex',flexDirection:'row',borderRadius:10,marginBottom:10}} >
        <Icon style={styles.searchIcon} name="user" size={30} color={Colors.secondary}/>
        <View style={[styles.inputView,{backgroundColor:Colors.smallcard,elevation:2,}]} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="UserName..." 
          placeholderTextColor="black"
          maxLength={12}
          onChangeText={text => setuserName(text)}/>
        
         

      </View>
        </View>
      
      
      
        
        <View style={{backgroundColor:Colors.bigcard,elevation:2,width:'95%',display:'flex',flexDirection:'row',borderRadius:10,marginBottom:10}} >
        <Icon style={styles.searchIcon} name="key" size={30} color={Colors.secondary}/>
        <View style={[styles.inputView,{backgroundColor:Colors.smallcard,elevation:2,width:"79%"}]} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="Password" 
          placeholderTextColor="black"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          maxLength={14}
          />
         

      </View>
       
      
        </View>
        <View style={{backgroundColor:Colors.bigcard,elevation:2,width:'95%',display:'flex',flexDirection:'row',borderRadius:10,marginBottom:10}} >
        <Icon style={styles.searchIcon} name="key" size={30} color={Colors.secondary}/>
        <View style={[styles.inputView,{backgroundColor:Colors.smallcard,elevation:2,width:"79%"}]} >
        
        <TextInput  
          style={styles.inputText}
          placeholder=" Confirm Password" 
          placeholderTextColor="black"
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={true}
          maxLength={14}
          />
         

      </View>
       
      
        </View>
        <View style={{backgroundColor:Colors.bigcard,elevation:2,width:'95%',display:'flex',flexDirection:'row',borderRadius:10,marginBottom:10}} >
        <Icon style={styles.searchIcon} name="phone" size={30} color={Colors.secondary}/>
        <View style={[styles.inputView,{backgroundColor:Colors.smallcard,elevation:2}]} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="PhoneNumber" 
          placeholderTextColor="black"
          onChangeText={text => setPhoneNumber(text)}
          maxLength={11}
          keyboardType={'numeric'}
          //maxLength={11}
          
         // secureTextEntry={true}
          />
         

      </View>
       
      
        </View>

        
      
      
        <TouchableOpacity style={[styles.loginBtn,{elevation:10}]}
         onPress={handleSubmit}
        >
          <Text style={styles.loginText}>SIGN UP</Text>
         
        </TouchableOpacity >
        <TouchableOpacity
         onPress={()=> props.navigation.navigate('Signin',{item:phoneNumber})}
         >
          <Text style={styles.loginText}>SignIn</Text>

        </TouchableOpacity>
        <View style={{width:'45%',display:"flex",justifyContent:'space-around',flexDirection:"row",marginTop:30,margin:10,backgroundColor:'white',borderRadius:10,elevation:1}}>
          <Icon name='facebook'
                              color={Colors.secondary} size={35} />
                              <Icon name='linkedin'
                              color={Colors.secondary}
                              size={35} />
                            
          </View>
      
 

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
        width:"85%",
        backgroundColor:Colors.input,
        borderRadius:25,
        height:45,
        margin:10,
        
        justifyContent:"center",
        padding:10
      },
      inputText:{
        height:50,
        color:"black",
        marginBottom:0,
        textAlignVertical:'center',
        //backgroundColor:"grey"
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
        marginTop:30,
        marginBottom:10
      },
      userImage: {
        borderColor: '#FFF',
        borderRadius: 0,
        borderWidth: 3,
        height: 200,
        marginBottom: 15,
        width: 255,
      },
      searchSection: {
        
       
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input2: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },


});
export default SignUp3;