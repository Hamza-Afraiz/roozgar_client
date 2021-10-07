import React, {Component,useEffect,useContext} from 'react';
import {
  Container,
  Text,
  Left,
  Grid,
  Col,
  View,
  Body,
  Right,
  Button,
  Title,
  Content,
  Switch
  
} from 'native-base';
import { BaseUrl } from "../Constants/baseUrl.js";
import { Rating, AirbnbRating } from 'react-native-elements';
import {Colors} from "../Constants/Colors.js";
import Icon from 'react-native-vector-icons/MaterialIcons';
const DATA = [
    {
      id: '1',
      title: 'MY PROFILE',
      hospital:'Nishter Hospital'
    },
    {
      id: '2',
      title: 'SETTINGS',
      hospital:'Home Visit'
    },
    {
      id: '3',
      hospital: 'FAQS',
      title: 'FAQS'
    },
    {
      id: '4',
      hospital: 'TERMS & CONDITIONS',
      title: 'TERMS & CONDITIONS'
    },
    {
      id: '5',
      hospital: 'CONTACT US',
      title: 'CONTACT US'
    },
    {
      id: '6',
      hospital: 'LOGOUT',
      title: 'LOGOUT'
    },
   
  ];
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,FlatList,Modal,Pressable
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Textarea from 'react-native-textarea';
import AuthGlobal from "../Context/store/AuthGlobal";

 
function GetComplaints({route,navigation}) {
 
  const[ongoingData,setOngoingData]=React.useState([]);
 
  const[upcomingData,setUpcomingData]=React.useState([]);
  const [getPageDetails,setPageDetails]=React.useState('Video');
  const [InClinicsColor,setInClinicsColor]=React.useState('lightgrey');
const[VideoColor,setVideoColor]=React.useState('lightgrey');
const[HomeColor,setHomeColor]=React.useState(Colors.secondary)
const setHomeVisits = () =>{
    setInClinicsColor('lightgrey');
    setVideoColor('lightgrey');
    setHomeColor(Colors.secondary);

      setPageDetails('HomeVisits');
      setData(upcomingData);
     
    console.log(getPageDetails);
  }
  const setVideoVisits = () =>{
    setInClinicsColor('lightgrey');
    setVideoColor(Colors.secondary);
    setHomeColor('lightgrey');

      setPageDetails('Video');
      setData(ongoingData)
     
    console.log(getPageDetails);
  }

    const [data,setData]=React.useState([]);
    const context = useContext(AuthGlobal);
    
    const onChange  = (item) =>  {
        setTextarea(item);
  
    };
   
    useEffect(() => {
        let newdata = context.stateUser.userProfile['user'].id;
      
        console.log('client id from contedxt is ',newdata);
      getComplaints(newdata)
      
    
        return () => {
          
        }
      }, [])
    const getComplaints=(id)=>{
     
     
        
        fetch(`http://${BaseUrl.wifi}:3000/api/v1/complaint/notAnswered/?id=${id}`, {
            method: "GET",
           
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
              
            
                
                console.log("complain data data is  ",data)
               // setData(data);
                setOngoingData(data);
            
                //const value=AsyncStorage.getItem('jwt')
               //console.log("token value is ",value)
              // logoutUser(dispatch)
               
    
            }
        })
        .catch((err) => {
           alert("incorrect details.Check your details again")
           console.log(err)
        
            
        });
        fetch(`http://${BaseUrl.wifi}:3000/api/v1/complaint/?id=${id}`, {
          method: "GET",
         
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      })
      .then((res) => res.json())
      .then((data) => {
          if (data) {
            
          
              
              console.log("complain data data is  ",data)
              setData(data);
              setUpcomingData(data);
          
              //const value=AsyncStorage.getItem('jwt')
             //console.log("token value is ",value)
            // logoutUser(dispatch)
             
  
          }
      })
      .catch((err) => {
         alert("incorrect details.Check your details again")
         console.log(err)
      
          
      });
    };
    const ratingCompleted=(rating)=>{
      setRating(rating);

    }
    
  return (

    <Container>
        
      
        
          <LinearGradient
            colors={[Colors.secondary,Colors.secondary]}
            style={{height: hp('8%'),borderBottomRightRadius:40,alignSelf:'center',}}>
            <Grid>
              <Col style={{width: '100%', alignItems: 'center'}}>
                  <View style={{height:hp('8%'),display:'flex',flexDirection: 'row',width: '100%',justifyContent:'center'}}>
                 
                 <Text
                    style={{
                      color: 'white',
                      fontSize: RFValue(16, 580),
                     fontWeight:'700',
                      alignSelf:'center',
                      marginRight:wp(5)
                    }}> GetComplaints</Text>
            
               
                  </View>
                
                
             
               
               
              </Col>
            </Grid>
          </LinearGradient>
          <View style={{display:'flex',flexDirection:'row',marginTop:hp(2),height:hp(4),width:wp(100),justifyContent:'space-around',borderBottomWidth:1,borderBottomColor:'lightgrey'}}>
              <TouchableOpacity onPress={() =>{setHomeVisits()}}>
              <Text
                style={{
                  color:HomeColor,
                  fontSize: RFValue(12, 580),
                  fontWeight: 'bold',
                  paddingHorizontal: wp(2),
                 
                }}>
                CHECKED
              </Text>
              {(getPageDetails=='HomeVisits')?   <View style={{ marginTop:hp(1.2),borderBottomColor:Colors.secondary,borderBottomWidth:2}}>

</View>:null}
           
            
             
             
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setVideoVisits()}}>
              <Text
                style={{
                  color: VideoColor,
                  fontSize:RFPercentage(2),
                  fontWeight: 'bold',
                  paddingHorizontal: wp(2),
                }}>
                NOT CHECKED
              </Text>
              {(getPageDetails=='Video')?   <View style={{marginTop:hp(1.2), borderBottomColor:Colors.secondary,borderBottomWidth:2}}>

</View>:null}
              </TouchableOpacity>
              
           
            </View>
            


          <View style={{width:'100%',backgroundColor:Colors.smallcard,elevation:10,marginBottom:hp(15)}}>
              
          <FlatList 
          
          data={data}
          
          
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={{width:'80%', backgroundColor:'#FFFFFF',alignSelf:'center',marginTop:hp(3),elevation:10}}>
                  <View style={{width:'100%', height:hp('13%'),borderWidth:1,borderColor:'white',borderBottomColor:'lightgrey',display:'flex',flexDirection:'row'}}>
                    
                        <View style={{width:'50%',display:'flex',flexDirection: 'row',height:'70%',alignSelf:'flex-end',marginBottom:'4%',marginLeft:'2%',}}> 
                            
                        <Image
                     source={{uri: "https://besthqwallpapers.com/Uploads/16-3-2020/124945/thumb2-hamza-4k-wallpapers-with-names-horizontal-text-hamza-name.jpg"}}
                  style={{
                    alignSelf: 'flex-start',
                    
                    height: hp('7%'),
                    width: wp('10%'),
                    borderRadius:10
                
                  }}
                />
                <View style={{marginLeft:wp(2),marginTop:hp(0.5)}}>   
                <Text
                    style={{
                      color: '#333132',
                      fontSize: RFPercentage(2),
                     fontWeight:'bold',
                     
                    }}> {item.vendorName}</Text>
                    <View style={{display:'flex',flexDirection: 'row',marginTop:'5%'}}>
                    <Text
                    style={{
                      color: 'white',
                      fontSize: RFPercentage(1.5),
                   
                     height: hp('5'),
                     width:wp(20),

                     backgroundColor: Colors.secondary,
                     borderRadius:10,marginRight:wp(1),textAlign:'center',textAlignVertical:'center'
                     
                    }}> Online Complaint</Text>
                    <Text
                    style={{
                      color:'white',
                      fontSize:RFPercentage(1.8),
                      fontWeight:'bold',
                   
                     height: hp('5'),
                     width:wp(30),
                     backgroundColor: Colors.secondary,
                     borderRadius:10,marginRight:wp(1),textAlign:'center',textAlignVertical:'center'
                     
                    }}> {item.status}</Text>
                    

                    </View>

                </View>
                
                
                        </View>
                        
                     

                  </View>
                  <Ionicons
                 name='menu'
                 size={wp(8)}
                 color='lightgrey'
                 style={{
                    alignSelf:'flex-start',
                    marginVertical: hp('0%'),
                  
                    marginLeft: wp('3%'),
                    marginTop:hp('0%'),
                    
                  }}
                />
                <View style={{display: 'flex',flexDirection: 'row',justifyContent:'space-between'}}>
                <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFValue(15, 580),
                     fontWeight:'bold',
                     marginLeft:wp(3)
                     
                    }}> Remarks </Text>
                    
               
                     
                </View>
                <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginLeft:wp(3)
                     
                    }}> {item.remarks} </Text>
                 
                    <View style={{marginVertical:hp(1)}}>
                        <Text style={{color: 'lightgrey',alignSelf:'center'}}>
                            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        </Text>
                    </View>
                    <Text
                    style={{
                      color: 'lightgrey',
                      fontSize: RFValue(12, 580),
                
                     marginLeft:wp(3),marginBottom:hp(0.5)
                     
                    }}> Service Name </Text>
                     <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginLeft:wp(3)
                     
                    }}> {item.serviceTitle} </Text>
                    <View style={{marginVertical:hp(1)}}>
                        <Text style={{color: 'lightgrey',alignSelf:'center'}}>
                            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        </Text>
                    </View >
                    <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFValue(12, 580),
                
                     marginLeft:wp(3),marginBottom:hp(0.5),

                     
                    }}> Your Complain Description </Text>
                     <Text
                     numberOfLines={3}
                    style={{
                      color: '#333132',
                      fontSize: RFValue(13, 580),
                      minHeight:hp(5),maxHeight:hp(7),
                      
                     
                     marginLeft:wp(3)
                     
                    }}> {item.description}</Text>
                         <View style={{marginVertical:hp(1)}}>
                        <Text style={{color: 'lightgrey',alignSelf:'center'}}>
                            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        </Text>
                    
                    </View>
                    
                    




              </View>)
          }}/>
              <Text style={{color: Colors.secondary,alignSelf:'center',fontWeight:'bold',fontSize: RFValue(12, 580),}}>
                  ____________________________
              </Text>

          </View>
          
         
          
        
      
    </Container>
  );
}

const styles = StyleSheet.create({
card:{
    height:hp('10%'),
    backgroundColor:'#fff3',
   
    width:wp('95%'),
    alignSelf:'center',
    display:'flex',flexDirection: 'row',
    justifyContent:'space-between',
    padding:hp('1%'),
    borderBottomColor:'lightgrey',borderWidth:1,borderColor:'white'


},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    width: wp('75%'),
    height: hp('6.5%'),
    backgroundColor: '#02C2EA',
    borderRadius: 30,
    padding: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
   

    
  },
  modalView: {
    width:wp(75),
    height:hp(60),
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.secondary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textarea: {
    textAlignVertical: 'top',
      // hack android
 
    
  },
  textareaContainer: {
      backgroundColor:Colors.smallcard,
      height:hp(18),marginVertical:hp(3),
      elevation:10,borderRadius:10,
      borderBottomColor:Colors.secondary,
      borderWidth:1,
      borderColor:'white'

    
  },

});

export default GetComplaints;
