import React  ,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text,Image,ActivityIndicator, View,TextInput,TouchableOpacity, Alert,Modal,Pressable} from 'react-native';
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
const Signin = (props,{navigation}) => {
  const dispatch  = useDispatch();
  const context = useContext(AuthGlobal);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const[phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = React.useState(false);
  const[checkNumber, setCheckNumber] = React.useState("");
  const [var1,setVar1] = useState("0");
  const [var2,setVar2] = useState("0");
  const[text1,setText1] = React.useState("PLEASE COOPERATE WITH US TO HELP YOU");
//   const setArrived=()=>{
//     console.log(" set    arrived");
    
//     dispatch({type:"ADD_ARRIVEDDATA",payload:"arrived"})
// }
//    const data3 =  useSelector((state)=>{
//      console.log("workking nowww")

  
//     return state.intervalData
//   })
  useEffect(() => {
   // const socket=io(`${BaseUrl.wifi}`);
    console.log("stateusr is ",context.stateUser.userProfile
    )
   
    console.log("authentication is  ",context.stateUser.isAuthenticated
    )
    // Toast.show({
    //   text1: 'Hello',
    //   text2: 'Wellcome Back Dear Client 👋'
    // });
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.replace("Home");
    }
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state in gardener:',
  //       remoteMessage.notification,
  //     );
  //     console.log(remoteMessage.data.vendorToken);
  //     if(remoteMessage.data.accepted == "accepted") {
     
        
       
  //       props.navigation.navigate("Maps2",{vendorId:remoteMessage.data.vendorId,info:'accepted',orderId:remoteMessage.data.orderId})
     
      
         
      
    
  //    }
  //    if(remoteMessage.data.accepted == "arrived") {
    
       
  //     setArrived()
  //     alert('Your vendor has arrived at your doorstep.Please check or contact vendor')
     
        
     
   
  //   }
  //    if(remoteMessage.data.accepted == "rejected") {
  //      // props.navigation.reset({
  //      //   index: 0,
  //      //   routes: [
  //      //     {
  //      //       name: 'Categories',
            
  //      //     },
  //      //   ],
  //      //   params:{
  //      //     info:'cancel'
  //      //   }
  //      // });
  //      props.navigation.navigate("Categories",{info:'cancel'})
            
        
      
  //      }
  //     if(remoteMessage.data.accepted == "completed") {
    
  //      fetch(`${BaseUrl.wifi}/api/v1/client/getReceipt/?id=${remoteMessage.data.receiptId}` ,{
  //        method: "GET",
         
  //        headers: {
  //            Accept: "application/json",
  //            "Content-Type": "application/json",
  //        },
  //    })
  //    .then((res) => res.json())
  //    .then((data) => {
  //        if (data) {
            
  //            const item=data;
  //            console.log("receipt id  data in signinnnnnnnnnnnnnnnnnnn is ",item)
  //            props.navigation.navigate("Receipt",{item:item})

            
  //           // this.getCurrentLocation();
   
         
  //            //const value=AsyncStorage.getItem('jwt')
  //           //console.log("token value is ",value)
            
   
  //        }
  //    })
  //    .catch((err) => {
  //       alert("incorrect details.Check your details again")
  //       console.log(err)
     
         
  //    });
         
       
      
  //  }
  //   });
    
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     console.log("remote msg is",remoteMessage)
  //     if(remoteMessage.data.accepted == "accepted") {
     
        
       
  //        props.navigation.navigate("Maps2",{vendorId:remoteMessage.data.vendorId,info:'accepted',orderId:remoteMessage.data.orderId})
      
       
          
       
     
  //     }
  //     if(remoteMessage.data.accepted == "arrived") {
     
        
  //      setArrived()
  //      alert('Your vendor has arrived at your doorstep.Please check or contact vendor')
      
         
      
    
  //    }
  //     if(remoteMessage.data.accepted == "rejected") {
  //       // props.navigation.reset({
  //       //   index: 0,
  //       //   routes: [
  //       //     {
  //       //       name: 'Categories',
             
  //       //     },
  //       //   ],
  //       //   params:{
  //       //     info:'cancel'
  //       //   }
  //       // });
  //       props.navigation.navigate("Categories",{info:'cancel'})
             
         
       
  //       }
  //      if(remoteMessage.data.accepted == "completed") {
     
  //       fetch(`${BaseUrl.wifi}/api/v1/client/getReceipt/?id=${remoteMessage.data.receiptId}` ,{
  //         method: "GET",
          
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //         },
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //         if (data) {
             
  //             const item=data;
  //             console.log("receipt id  data in signinnnnnnnnnnnnnnnnnnn is ",item)
  //             props.navigation.navigate("Receipt",{item:item})

             
  //            // this.getCurrentLocation();
    
          
  //             //const value=AsyncStorage.getItem('jwt')
  //            //console.log("token value is ",value)
             
    
  //         }
  //     })
  //     .catch((err) => {
  //        alert("incorrect details.Check your details again")
  //        console.log(err)
      
          
  //     });
          
        
       
  //   }
      
       
  //    /* Alert.alert("A new request has arrived!", "What to do?", [
  //       {
  //         text: "Reject",
  //         onPress: () => {props.navigation.navigate("Categories")},
  //         style: "cancel",
  //       },
  //       {
  //         text: "Accept",
  //         onPress: () => {props.navigation.navigate("Maps2",{vendorId:remoteMessage.data.vendorId});},
  //       },
  //     ]);*/
  //   });
  //   return unsubscribe;
  
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
   
    setVar1("1");
    console.log('handle submit')
    const user = {
      phoneNumber,
      password,
    };
     console.log("user type is ",user)
    if (phoneNumber === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      
      loginUser(user, context.dispatch);
    }
  };
  const handleForget=() => {
    setVar2('1');
    const user={
      checkNumber
    }
    fetch(`${BaseUrl.wifi}/api/v1/client/checkPhoneNumber`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
          console.log("user data is ",data)
          if(data.user == 'false'){
            console.log("phone number not exist")
          setText1("PHONE NUMBER NOT FOUND !")
          setVar2('0')
          }
          else{
            console.log("phone number exist")
            props.navigation.navigate('ForgetOtp',{item:checkNumber,id:data.data.id})
            setModalVisible(!modalVisible)
            setVar2('0')
          }
          
          
           

        } 
       
    })
    .catch((err) => {
      console.log("phone number not exist")
      setText1("PHONE NUMBER NOT FOUND !")
      setVar2('0')
      
      console.log(err)
       
       
    });
  }
    return (
      <View style={[styles.container,{}]}>
      
        
        <View >
      
        <Image
             style={styles.userImage}
              source={logo}
            />
        </View>
       
        
        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
       
        
        <View style={{backgroundColor:Colors.bigcard,elevation:2,margin:5,width:'95%',display:'flex',flexDirection:'row',borderRadius:10}} >
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{backgroundColor:Colors.bigcard,elevation:2,width:'90%',display:'flex',flexDirection:'row',borderRadius:10}} >
       
        <View style={[styles.inputView,{backgroundColor:Colors.smallcard,elevation:2,width:'95%'}]} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="Enter PhoneNumber To Reset" 
          placeholderTextColor="black"
          onChangeText={text => setCheckNumber(text)}
          maxLength={11}
          keyboardType={'numeric'}
          //maxLength={11}
          
         // secureTextEntry={true}
          />
         

      </View>
       
      
        </View>
        <Text style={{marginTop:20}}>
          {text1}
          </Text>
          {(var2 == '1')? <View style={{alignSelf:'center',marginTop:'20%',flex:1}}>
                
                <ActivityIndicator size="large" color="#00ff00" />
               
                        
                       
               </View>:
            <Pressable
              style={[styles.button, styles.buttonClose,{marginTop:"10%"}]}
              onPress={handleForget}
            >
              <Text style={styles.textStyle}>Send Code</Text>
            </Pressable>}
            <Pressable
              style={[styles.button,{marginTop:hp(1),marginTop:"10%"}]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
        <Icon style={styles.searchIcon} name="phone" size={30} color={Colors.secondary}/>
        <View style={[styles.inputView,{backgroundColor:Colors.smallcard,elevation:2,}]} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="Phone Number..." 
          placeholderTextColor="black"
          onChangeText={text => setPhoneNumber(text)}
          keyboardType={'numeric'}
          
          />
         

      </View>
        </View>
      
      
      
        
        <View style={{backgroundColor:Colors.bigcard,elevation:2,width:'95%',display:'flex',flexDirection:'row',borderRadius:10}} >
        <Icon style={styles.searchIcon} name="key" size={30} color={Colors.secondary}/>
        <View style={[styles.inputView,{backgroundColor:Colors.smallcard,elevation:2,width:"79%"}]} >
        
        <TextInput  
          style={styles.inputText}
          placeholder="Password" 
          placeholderTextColor="black"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          />
         

      </View>
       
      
        </View>

        
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        {(var1 == '1')? <View style={{alignSelf:'center',marginTop:'10%',flex:1}}>
                
                <ActivityIndicator size="large" color="#00ff00" />
               
                        
                       
               </View>:
      
        <TouchableOpacity style={[styles.loginBtn,{elevation:10}]}
         onPress={handleSubmit}
        >
          <Text style={styles.loginText}>LOGIN</Text>
         
        </TouchableOpacity >}
        <TouchableOpacity
         onPress={()=> props.navigation.navigate('SignUp3')}
         >
          <Text style={styles.loginText}>Signup</Text>

        </TouchableOpacity>
        <TouchableOpacity
        style={{marginTop:"7%"}}
        onPress={() => setModalVisible(!modalVisible)}
         >
          <Text style={styles.loginText}>Forget Password?</Text>

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
        width:"80%",



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
        padding: 15,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
   

    
  },
  modalView: {
    width:wp(95),
    height:hp(40),
    elevation:10,

    backgroundColor: Colors.bigcard,
    borderColor: Colors.secondary,
    borderWidth:4,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    
  },
  textStyle: {
    color: Colors.secondary,
    fontWeight: "bold",
    textAlign: "center"
  },
  


});
export default Signin;