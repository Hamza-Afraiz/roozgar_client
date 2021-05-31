import React, { PureComponent ,useState,useEffect,useContext} from 'react';
import { StyleSheet,View, Text,Modal, Button, Alert, ActivityIndicator,TouchableOpacity,Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from 'react-native-toast-message';
import Step from './Step';
import {Colors} from "../Constants/Colors.js";
import AuthGlobal from "../Context/store/AuthGlobal";
import { registerUser } from "../Context/actions/Auth.actions";
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/rglogo.png';
import * as ImagePicker from 'expo-image-picker';
import ActivityIndicatorExample from './activity_indicator'
import { Camera } from 'expo-camera';

const theme = {
  colors:{
      primary:"#006aff"
  }
}
function Referal1() {
 
  const [loading,setLoading]=useState('0');
  const contextType = AuthGlobal
  const [picture,setPicture] = useState("")
  const [userData,setUserData] = useState({})
  

  useEffect(() => {
    const storage = async()=>{
      let image = await AsyncStorage.getItem('pictureUrl');
      if(image){setPicture(image)}
      console.log("pictureUrL is ",image)
      let jsonValue = await AsyncStorage.getItem('userData')
      let newjsonValue=jsonValue != null ? JSON.parse(jsonValue) : null;
     
      //console.log("userData is ",newjsonValue)
      var newNum = "image";
      var newVal = picture;
      newjsonValue[newNum]=newVal
    
      console.log(newjsonValue["image"])
      setUserData(newjsonValue)
     // console.log(newjsonValue.image)
      console.log('newjson value is ',newjsonValue)
    }
    storage()
  }, [picture]);
 
  const [modal,setModal] = useState(false)
  const [next,setNext]=useState(false)
    const navigation = useNavigation();
    const pickFromGallery = async ()=>{
        const {granted} =  await Camera.requestPermissionsAsync()
        if(granted){
             let data =  await ImagePicker.launchImageLibraryAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
              if(!data.cancelled){
                  let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}` 
                    
                }
                console.log(data)
                console.log(newfile)
                handleUpload(newfile)
              }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }
     const pickFromCamera = async ()=>{
        const {granted} =  await Camera.requestPermissionsAsync()
        if(granted){
             let data =  await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
            if(!data.cancelled){
                let newfile = { 
                  uri:data.uri,
                  type:`test/${data.uri.split(".")[1]}`,
                  name:`test.${data.uri.split(".")[1]}` 
  
              }
               console.log(data)
               
               handleUpload(newfile)
            }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }
     const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('pictureUrl', value)
        console.log("data is saved")
      } catch (e) {
        console.log("error")
      }
    }
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('pictureUrl')
        if(value !== null) {
          console.log("retrieved")
          return value
          console.log(value)
        }
      } catch(e) {
        console.log("error")
      }
    }
    
     const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','roozgar')
        data.append("cloud_name","roozgar")
        setLoading('1')

        fetch("https://api.cloudinary.com/v1_1/roozgar/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
         
            console.log("data is ",data)
            storeData(data.url);
            setPicture(data.url)
            setModal(false)

            registerUser(userData, contextType.dispatch);
            setLoading('0')

            navigation.navigate('Logout');

            
           
           
            
        }).catch(error => {
            console.error(error);
          });
   }
    return (
      <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>

      
     { ((loading)) != '0' ? <ActivityIndicator size="large" color="#00ff00" />:<View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
     <Image
            style={styles.userImage}
             source={logo}
           />
<Button
title="Upload photo"
color='#37B44E'
onPress={() => setModal(true)}
/>
<Modal
     animationType="slide"
     transparent={true}
     visible={modal}
     onRequestClose={()=>{
         setModal(false)
     }}
     >
      <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
                <Button icon="camera"
                 theme={theme}
                 title="Camera"
                mode="contained"
                color='#37B44E'
                 onPress={() => pickFromCamera()}
                        camera/>
                
                <Button 
                title="Gallery"
                icon="image-area"
                color='#37B44E'
                 mode="contained"
                 theme={theme}
                  onPress={() => pickFromGallery()}
                        />
               
          </View>
        <Button 
         theme={theme}
         title="Cancel"
         color='#37B44E'
        onPress={() => setModal(false)}
                />
       
      </View>
     </Modal>
 

</View>}</View>
        
     
    );
  }
function Referal() {
    const navigation = useNavigation();
  
    return (
        <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
             <Image
                    style={styles.userImage}
                     source={logo}
                   />
      <Button
        title="Finished Back to  Sign in"
        color='#37B44E'
        onPress={() => {
          navigation.navigate('Sign');
        }}
      />
        </View>
     
    );
  }
class Wizard extends PureComponent {
   
  static Step = Step;
  static contextType = AuthGlobal

  state = {
    index: 0,
    loading:0,

    values: {
      ...this.props.initialValues,
    },
  };

  _nextStep = () => {
    if(((this.state.index == 0))){
      if((( this.state.values.firstName) == '' )){
        Alert.alert("Please First Name .Thankyou");
      }
      else{
        if (this.state.index !== this.props.children.length - 1) {
          console.log("this vvalue is",this.state.values);
          this.setState(prevState => ({
            index: prevState.index + 1,
           
          }));
         
        }
      }
    }
    if(((this.state.index == 1))){
      if((( this.state.values.lastName) == '' )){
        Alert.alert("Please Enter Last Name.Thankyou");
      }
      else{
        if (this.state.index !== this.props.children.length - 1) {
          console.log("this vvalue is",this.state.values);
          this.setState(prevState => ({
            index: prevState.index + 1,
           
          }));
         
        }
      }
    }
    if(((this.state.index == 2))){
      if((( this.state.values.userName) == '' )){
        Alert.alert("Please Enter User Name.Thankyou");
      }
      else{
        if (this.state.index !== this.props.children.length - 1) {
          console.log("this vvalue is",this.state.values);
          this.setState(prevState => ({
            index: prevState.index + 1,
           
          }));
         
        }
      }
    }
    if(((this.state.index == 3))){
      if(((( this.state.values.password) == '' )) && ( this.state.values.password.length ) <= 7 ){
        Alert.alert("Please Enter Password.Thankyou");
      }
      else{
        if (this.state.index !== this.props.children.length - 1) {
          console.log("this vvalue is",this.state.values);
          this.setState(prevState => ({
            index: prevState.index + 1,
           
          }));
         
        }
      }
    }
    if(((this.state.index == 4))){
      if(((( this.state.values.email) == '' )) ){
        Alert.alert("Please Enter Email.Thankyou");
      }
      else{
        if (this.state.index !== this.props.children.length - 1) {
          console.log("this vvalue is",this.state.values);
          this.setState(prevState => ({
            index: prevState.index + 1,
           
          }));
         
        }
      }
    }
    if(((this.state.index == 5))){
      if(((( this.state.values.phone) == '' )) ){
        Alert.alert("Please Enter phone.Thankyou");
      }
      else{
        if (this.state.index !== this.props.children.length - 1) {
          console.log("this vvalue is",this.state.values);
          this.setState(prevState => ({
            index: prevState.index + 1,
           
          }));
         
        }
      }
    }
    if(((this.state.index )== 6)){
      if(((( this.state.values.phone) == '' )) ){
        Alert.alert("Please Enter phone.Thankyou");
      }
      else{
        if (this.state.index !== this.props.children.length - 1) {
          console.log("this vvalue is",this.state.values);
          this.setState(prevState => ({
            index: prevState.index + 1,
           
          }));
         
        }
      }
    }
    if(((this.state.index )>= 6)){
     
     
        if (this.state.index !== this.props.children.length - 1) {
          console.log("this vvalue is",this.state.values);
          this.setState(prevState => ({
            index: prevState.index + 1,
           
          }));
         
        
      }
    }
   
    
   
   
   
    
  };

  _prevStep = () => {
    if (this.state.index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
      }));
    }
  };

  _onChangeValue = (name, value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userData', jsonValue)
      console.log("saved user data")
    } catch (e) {
      console.log("sorry cant save")
    }
  }
  _onSubmit = () => {
    let contextDone=this.context;
   // Alert.alert(JSON.stringify(this.state.values));
    if(this.state.values)
    this.storeData(this.state.values)
    console.log(this.state.values)

    //registerUser(this.state.values, contextDone.dispatch);
    this.setState(prevState => ({
        loading: prevState.loading + 1,
      }));


    
  };

  render() {
    console.log('values', this.state);
    let contextDone=this.context;
    
    return (
        
      < View style={{ flex: 1 }} >
          {((this.state.loading) == 1)  ? < Referal1  /> :  <View style={{ flex: 1 }}>
           
        {React.Children.map(this.props.children, (el, index) => {
          if (index === this.state.index) {
            return React.cloneElement(el, {
              currentIndex: this.state.index,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              isLast: this.state.index === this.props.children.length - 1,
              onChangeValue: this._onChangeValue,
              values: this.state.values,
              onSubmit: this._onSubmit,
            });
          }
         

          return null;
        })}
      </View>}
         
       </View>
    );
  }
}
const styles = StyleSheet.create({
    
      inputText:{
        height:50,
        color:"white",
        marginBottom:20
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

        height: 270,
        marginBottom: 15,
        width: 255,
      },
      modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"

    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }

});

export default Wizard;
