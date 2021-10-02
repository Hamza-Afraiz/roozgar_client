import SelectDropdown from 'react-native-select-dropdown'
import React  ,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text,Image, View,TextInput,TouchableOpacity,Modal } from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from "../Constants/Colors.js";
import DropDownPicker from 'react-native-dropdown-picker';
import { alignItems } from 'styled-system';
import Textarea from 'react-native-textarea';
import { Card, Icon ,Button,Avatar, SearchBar,Rating } from 'react-native-elements';
import AuthGlobal from "../Context/store/AuthGlobal";
import * as ImagePicker from 'expo-image-picker';
import ActivityIndicatorExample from './activity_indicator'
import { Camera } from 'expo-camera';
import { useSelector } from "react-redux";
const theme = {
  colors:{
      primary:"#006aff"
  }
}
import { BaseUrl } from "../Constants/baseUrl.js";
 function Complaint ({route,navigation}){
  const [modal,setModal] = useState(false)
  const context = useContext(AuthGlobal);
  const [loading,setLoading]=useState('0');
  const [type,setType]=useState('');
  const [picture,setPicture] = useState("")
  const [clientData,setClientData]=useState({})
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'LAZY WORKER', value: 'LAZY WORKER'},
      {label: 'EXPENSIVE', value: 'EXPENSIVE'},
      {label: 'ARRIVED LATE', value: 'ARRIVED LATE'}
    ]);
    const [userData,setUserData]=useState([]);
   
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
     
      
        setPicture(data.url)
        setModal(false)

       
        setLoading('0')
        console.log('data in handle upload is ',data)

       

        
       
       
        
    }).catch(error => {
        console.error(error);
      });
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
  
    useEffect(() => {
      console.log(value);
     const   {item}   = route.params;
      console.log("data 1 is ",item)
      //console.log("data 2 is ",info)
     setUserData(item);
     
     let newdata = context.stateUser.userProfile['user'];
      
      console.log('client name from contedxt is ',newdata);
      setClientData(newdata)
      
     
   
  
    }, [value]);
    const [textarea, setTextarea] = useState('');
    onChange  = (item) =>  {
        setTextarea(item);

    };

    onOrder=()=>{
  
      const clientId=clientData.id;
      const vendorName=userData.vendorName;
      const type=value;
     
      //const priceoffer="1000 Rupees";
      const vendorId=userData.vendorId;
      const serviceTitle=userData.serviceTitle;
      const serviceId=userData.serviceId;
      const image=picture;
      const description=textarea;
     
     console.log("onCOMPLAINT is runnng")
    console.log("VANDOR name is",vendorName)
    console.log("client id is",clientId)
      const user = {
        value,
        vendorName,
        clientId,
        picture,
        image,
        description,
       vendorId,serviceId,
       serviceTitle
        
      };
      
  
      
       console.log("fetching data")
       fetch(`http://${BaseUrl.wifi}:3000/api/v1/complaint/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json, text/plain, */*', 
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
          alert("Your Complain is live Now.You ll get response soon")
            const userNow = data;
        
          
            console.log("complaint data is  ",data)
            navigation.navigate('APPOITMENTS')
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           
  
        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again")
       console.log(err)
    
      
    });}
    return(
        <View style={{display:'flex',
        flexDirection:'column',flex:1,width:"95%"}}>
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

            <View style={styles.dropbar}>
            <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
            </View>
            <Textarea
    containerStyle={styles.textareaContainer}
    style={styles.textarea}
    onChangeText={onChange}
    defaultValue={textarea}
    maxLength={120}
    placeholder={'Write your complete problem here in details'}
    placeholderTextColor={'black'}
    underlineColorAndroid={'transparent'}
  />
  <Text style={{margin:10,fontSize:16,fontWeight:'bold'}}>
      Upload Regarding Material
  </Text>
  <Button
  onPress={() => setModal(true)}
            buttonStyle={{backgroundColor:Colors.secondary,width:'40%',alignSelf:'center',elevation:4,marginBottom:15}}
            icon={<Icon name='camera'
            color={Colors.smallcard}
            onPress={() => setModal(true)}
            size={30}

             />}/>
              <Button
              title='Submit'
              onPress={() => onOrder()}
              titleStyle={{fontSize:16,fontSize:20,fontWeight:'bold'}}
            buttonStyle={{backgroundColor:Colors.secondary,width:'40%',alignSelf:'center',elevation:1}}
            icon={<Icon name='file-upload'
            color={Colors.smallcard}
            size={30}
            onPress={() => onOrder()}

             />}/>
             <Button
              title='Previous complaints'
              onPress={() => {navigation.navigate('GetComplaints')}}
              titleStyle={{fontSize:16,fontSize:20,fontWeight:'bold'}}
            buttonStyle={{backgroundColor:Colors.secondary,width:'50%',alignSelf:'center',elevation:1,marginTop:'3%'}}
            />
      
   
        </View>
    );
}
const styles = StyleSheet.create({
    dropbar:{
        
width:"80%",
alignItems:'center',
alignSelf:'center' 



    },

textareaContainer: {
  height: 180,
  padding: 5,
  backgroundColor: '#F5FCFF',
  margin: 15
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
},
textarea: {
  textAlignVertical: 'top',  // hack android
  height: 170,
  fontSize: 14,
  color: '#333',
  margin: 10
},
})
export default Complaint