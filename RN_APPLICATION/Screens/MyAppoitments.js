import React, {Component,useState,useEffect,useContext} from 'react';
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
} from 'native-base';
import { BaseUrl } from "../Constants/baseUrl.js";
import Receipt from "./Receipt";
import UpcomingAppoitment from "./upcomingAppoitment";
import moment from "moment";
import Icon from 'react-native-vector-icons/MaterialIcons';
const DATA1 = [
    {
      id: '1',
      title: 'MON',
      hospital:'Nishter Hospital'
    },
    {
      id: '2',
      title: 'TUE',
      hospital:'Home Visit'
    },
    {
      id: '3',
      hospital: 'WED',
      title: 'WED'
    },
    {
      id: '4',
      hospital: 'THU',
      title: 'THU'
    },
    {
      id: '5',
      hospital: 'FRI',
      title: 'FRI'
    },
    {
      id: '6',
      hospital: 'SAT',
      title: 'SAT'
    },
    {
      id: '7',
      hospital: 'SUN',
      title: 'SUN'
    },
  ];
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import logo from '../assets/rglogo.png';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,FlatList, Switch,SafeAreaView,Modal,Pressable
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Textarea from 'react-native-textarea';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from "../Constants/Colors.js";
import { colorsDark } from 'react-native-elements/dist/config';
import { useDispatch} from "react-redux";
import AuthGlobal from "../Context/store/AuthGlobal";
function MyAppoitments({navigation}) {
  const context = useContext(AuthGlobal);
  const [userData,setUserData] = useState({"firstName":"Ali"})
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch=useDispatch()

  const isFocused = useIsFocused();
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [textarea, setTextarea] = useState('');
    const onChange  = (item) =>  {
        setTextarea(item);
  
    };
    const [Data,setData]=React.useState([]);
    const[ongoingData,setOngoingData]=React.useState([]);
    const[requestData,setRequestData]=React.useState([]);
    const[upcomingData,setUpcomingData]=React.useState([]);
    const [personalColor,setPersonalColor]=React.useState('white');
    const [professionalColor,setProfessionalColor]=React.useState('lightgrey');
    const [upcomingColor,setUpcomingColor]=React.useState('lightgrey')
    const [getDetails,setDetails]=React.useState('Personal');
    const [getPageDetails,setPageDetails]=React.useState('HomeVisits');
    const [getDayDetails,setDayDetails]=React.useState('');
    const [getDay,setDay]=React.useState('');
    const [getNum,setNum]=useState('0');
    const [getTime,setTime]=React.useState('');
    const[requestDetails,setRequestDetails]=React.useState('0');
    

    const getModal = (item) => {
        console.log(item.id);
        setNum(item.id);
    
    }
    useEffect(() => {
      console.log(context.stateUser.userProfile) ;
      if(context.stateUser.isAuthenticated){
       let newdata = context.stateUser.userProfile['user'];

       setUserData(newdata);
       console.log("  new data is  ",newdata)
      
      }
     
        onLoadData()
       
      }, [isFocused]);
    const complainData=(item)=>{
      console.log("item in appoitments is ",item)
      dispatch({type:'ADD_COMPLAINDATA',payload:item})
    // {navigation.navigate('Complaint',{item:item})}

    } 
    const unSetModal = () => {
        console.log('unset');
        setNum('0');
    
    }
    const onLoadData=()=>{
     
      
        console.log("fetching data")
      //  const api = process.env.BASE_URL2;
      let newdata = context.stateUser.userProfile['user'].id;
      
       fetch(`http://${BaseUrl.wifi}:3000/api/v1/acceptedOrder/?id=${newdata}` ,{
         method: "GET",
         
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
         },
     })
     .then((res) => res.json())
     .then((data) => {
         if (data) {
             setData(data);
             setUpcomingData(data);
             console.log("accepted orders =",data);
         }
           
     })
     .catch((err) => {
        alert("incorrect details.Check your details again")
        console.log(err)
     
         
     });
     fetch(`http://${BaseUrl.wifi}:3000/api/v1/ongoingOrder/?id=${newdata}` ,{
        method: "GET",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            setOngoingData(data);
           // setUpcomingData(data);
            console.log("ongoing appoitments data us =",data);
        }
          
    })
    .catch((err) => {
       alert("incorrect details.Check your details again")
       console.log(err)
    
        
    });
     
      }
    


  const setPersonal = () =>{
    setPersonalColor('white');
    setProfessionalColor('lightgrey');
    setUpcomingColor('lightgrey');

      setDetails('Personal');
     
    console.log(getDetails);
  }
  const setProfessional = () =>{
    setProfessionalColor('white');
    setPersonalColor('lightgrey');
    setUpcomingColor('lightgrey');
    setDetails('Professional');
    
  console.log(getDetails);
}
const setUpcoming = () =>{
    setUpcomingColor('white');
    setPersonalColor('lightgrey');
    setProfessionalColor('lightgrey');
    setDetails('Upcoming');
    
  console.log(getDetails);
}
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
  const setInClinicsVisits = () =>{
    setInClinicsColor(Colors.secondary);
    setVideoColor('lightgrey');
    setHomeColor('lightgrey');

      setPageDetails('InClinics');
     
    console.log(getPageDetails);
  }
  const dayselect =(item)=>{
      setDayDetails(item.id);
      setDay(item.title)

  }
  const timeselect =(item)=>{
   
    setTime(item)

}
  const nav=(item1)=>{
    console.log("nav worked");
    fetch(`http://${BaseUrl.wifi}:3000/api/v1/client/getReceiptByAppoitmentId/?id=${item1.id}` ,{
      method: "GET",
      
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
  })
  .then((res) => res.json())
  .then((data) => {
      if (data) {
         
          //const item=data;
          console.log("receipt id  data in appoitmrntd is ",data)
          navigation.navigate("Receipt",{item:data})

         
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
  const onOrder=()=>{
  
    const clientId=userData.id;
    const clientName=userData.userName;
   
    //const priceoffer="1000 Rupees";
    const completionTime="2 hour";
    const description=textarea;
    const selectedTime=getTime;
    const selectedDay=getDay;
   console.log("onorder is runnng")
  console.log("client name is",clientName)
  console.log("client id is",clientId)
    const user = {
      
      clientName,
      clientId,
      
      completionTime,
      description,
      selectedDay,
      selectedTime  
      
      
    };
    

    
     console.log("fetching data")
     fetch(`http://${BaseUrl.wifi}:3000/api/v1/upcomingOrder/`, {
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
        alert("Your Request is live Now.You ll get response soon")
          const userNow = data;
      
        
          console.log("u[coming order data is ",data)
      
          //const value=AsyncStorage.getItem('jwt')
         //console.log("token value is ",value)
         

      }
  })
  .catch((err) => {
     alert("incorrect details.Check your details again")
     console.log(err)
  
    
  });}
  const getRequest=()=>{
    if(requestDetails=='0'){
      setRequestDetails('1');
    }
    else{
      setRequestDetails('0');
    }
    setModalVisible(true);
    
    var id=userData.id;
    console.log('getting rrquwst from ',id)
    fetch(`http://${BaseUrl.wifi}:3000/api/v1/upcomingOrder/clientId/?id=${id}` ,{
        method: "GET",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
          setRequestData(data);
          //isLoading('1');
            console.log("request data from  is",data)
           
          
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           

        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again .unable to send api")
       console.log(err)
    
       
    });
  }


  return (
    <Container>
      

        
          <LinearGradient
            colors={[Colors.secondary, Colors.secondary2]}
            style={{height: hp('7%')}}>
            <Grid>
              <Col style={{width: '100%', alignItems: 'center'}}>
                  <View style={{display:'flex',flexDirection: 'row',width: '100%',justifyContent:'space-between',alignItems: 'center'}}>
                  <View style={{width:wp('20%'),display:'flex',flexDirection:'row',marginTop:hp('2%'),marginRight:hp('1%')}}>
                    
                    <View>
                    <Icon2
                      name='arrow-left'
                      size={wp(6)}
                      color='white'
                      onPress={()=>{navigation.goBack()}}
                      style={{
                         alignSelf: 'flex-end',
                        
                         height: hp('5%'),
                         width: wp('6%'),
                         marginLeft: wp('3%'),
                         marginTop:hp('0%'),
                         
                       }}
                     />   
                    </View>
                     
     
                     </View>
                 <Text
                    style={{
                      color: '#fff',
                      fontSize: RFValue(13, 580),
                     fontWeight:'700',
                     alignSelf:'center',
                     marginLeft:wp('3%'),
                     marginRight:wp(50)

                    
                    }}> MY APPOITMENTS</Text>
                
               
               
                  </View>
                  
            <View style={{display:'flex',flexDirection:'row',marginTop:hp(2),height:hp(4),width:wp(100),justifyContent:'space-around',borderBottomWidth:1,borderBottomColor:'lightgrey'}}>
              <TouchableOpacity onPress={() =>{setHomeVisits()}}>
              <Text
                style={{
                  color:HomeColor,
                  fontSize: RFValue(12, 580),
                  fontWeight: 'bold',
                  paddingHorizontal: wp(2),
                 
                }}>
                PAST
              </Text>
              {(getPageDetails=='HomeVisits')?   <View style={{ marginTop:hp(1.2),borderBottomColor:Colors.secondary,borderBottomWidth:2}}>

</View>:null}
           
            
             
             
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setVideoVisits()}}>
              <Text
                style={{
                  color: VideoColor,
                  fontSize: RFValue(12, 580),
                  fontWeight: 'bold',
                  paddingHorizontal: wp(2),
                }}>
                ON GOING
              </Text>
              {(getPageDetails=='Video')?   <View style={{marginTop:hp(1.2), borderBottomColor:Colors.secondary,borderBottomWidth:2}}>

</View>:null}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setInClinicsVisits()}}>
              <Text
                style={{
                  color: InClinicsColor,
                  fontSize: RFValue(12, 580),
                  fontWeight: 'bold',
                  paddingHorizontal: wp(0),
                }}>
                UPCOMING
              </Text>
              {(getPageDetails=='InClinics')?   <View style={{ marginTop:hp(1.2),borderBottomColor:Colors.secondary,borderBottomWidth:2}}>

</View>:null}
              </TouchableOpacity>
           
            </View>
            

            
                
                
              
             
               
              </Col>
            </Grid>
           
          </LinearGradient>
          <View style={{ marginTop:hp('5%')}}></View>
          {((getPageDetails)=='InClinics')?<ScrollView>
        <Content>
          <Grid>
            <Col style={{width: '100%'}}>
              <Grid
                style={{
                  marginTop: hp('2%'),
                }}>
                <Col style={{width: '100%', paddingHorizontal: 20}}>
                  <TouchableOpacity onPress={() =>{getRequest()}}>
                  <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFValue(12, 580),
                      fontWeight: 'bold',
                      alignSelf:'center',
                      marginVertical:hp(1)
                      
                    }}>
                    See Previous Requests
                  </Text>
                  </TouchableOpacity>
                 
                </Col>
               
              </Grid>
              
              <ScrollView
              style={{maxHeight:hp(25)}
              }>
              
              {(requestDetails)=='1'?
                <Modal
                animationType="slide"
              
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
              <SafeAreaView style={{alignSelf:'center',marginVertical:hp(2)}}>
                
               <FlatList 
          
          data={requestData}
          
          
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View>

              
              <ScrollView>

              
                <TouchableOpacity onPress={()=>{unSetModal()}}>

               
                
<View style={[styles.notificationTab,{marginVertical:hp(3),height:hp(20)}]}>
    <View style={{display:'flex',flexDirection:'row',backgroundColor:Colors.smallcard,elevation:10}}>

<View>
<Image
                     source={{uri: userData.image}}
                  style={{
                    alignSelf: 'flex-start',
                    marginVertical: hp('1%'),
                    height: hp('7%'),
                    width: hp('7%'),
                    marginLeft: wp('5%'),
                    borderColor:'lightgrey',borderWidth:1,borderRadius:30
                  }}
                />
    </View>    
                    <View style={{display:'flex',width:wp(50),flexDirection:'column',height:hp('22%'),marginHorizontal:wp('2%'),marginBottom:hp('1%')}}>

                    <Text
                    style={{
                      color: 'black',
                      fontSize: RFPercentage(2),
                     fontWeight:'700',
                     marginTop:hp('1%'),marginHorizontal:wp('0%')
                     
                    

                    
                    }}> {item.clientName}</Text>
                    <Text
                    style={{
                      color: 'grey',
                      fontSize: RFPercentage(1.5),
                     fontWeight:'700',
                     marginLeft:wp(1),
                   //  marginRight:hp('15%'),
                     
                     
                    

                    
                    }}> {item.description}</Text>
                     <Text
                    style={{
                      color: 'red',
                      fontSize: RFValue(10, 580),
                     fontWeight:'700',
                     marginLeft:wp(1)
                     
                     
                    

                    
                    }}> Price offered Rs: {item.priceOffered}</Text>
                     <Text
                    style={{
                      color: 'grey',
                      fontSize: RFValue(10, 580),
                     fontWeight:'700',
                     
                     
                    

                    
                    }}> Completion Time is {item.completionTime}</Text>
                    
                    <View style={{display:'flex',flexDirection:'row'}}>
                    <Icon
                 name='my-location'
                 size={wp(4)}
                 color={Colors.secondary}
                 style={{
                    alignSelf: 'flex-end',
                    marginRight:wp(1)
                  
                   
                    
                    
                  }}
                />
                    <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFValue(10, 580),
                     fontWeight:'700',
                     
                     marginTop:hp(1),
                     
                     
                     
                    

                    
                    }}>Get your status now</Text>
                    </View>
                     
                    </View>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        
                   {(item.id==getNum && getPageDetails == 'Video')?<View style={{width:wp('35%'),height:hp(8),backgroundColor:"#fff2",margin:hp(2),marginRight:hp(2),borderColor:'grey',borderRadius:10,borderWidth:1}}>
                       <View style={{height:hp(4),width:wp('34.5%'),justifyContent:'center',alignItems:'center',backgroundColor:Colors.secondary,overflow:'hidden',borderRadius:10,borderWidth:0,borderColor:'#fff2'}}>
                       <Text
                    style={{
                      color: 'white',
                      fontSize: RFValue(12, 580),
                     fontWeight:'700',
                     
            
                     alignSelf:'center',
                     
                  
                    }}> Cancel Appoitment</Text>
                    </View> 
                    <View style={{height:hp(4),width:wp('34.5%'),justifyContent:'center',alignItems:'center',backgroundColor:'#fff2',overflow:'hidden',borderRadius:20,borderWidth:2,borderColor:'#fff2'}}>
                       <TouchableOpacity
                       onPress={()=>{complainData()}}
                       >
                       <Text
                    style={{
                      color: 'grey',
                      fontSize: RFValue(13, 580),
                     fontWeight:'700',
                     
               
                     alignSelf:'flex-start',
                     
                  
                    }}> COMPLAIN</Text>
                       </TouchableOpacity>
                     
                    </View> 
                       
                   </View>:(getPageDetails) == 'HomeVisits' ?  <TouchableOpacity > 
                       <TouchableOpacity onPress={() => {nav(item)}}>

                       
            <View
              style={{
                width: wp('22%'),
                height: hp('4%'),
                alignItems: 'center',
                marginVertical: hp(1),
                borderRadius: 30,
                backgroundColor: '#58a758',
                justifyContent: 'center',
                marginLeft:wp('10%'),

                
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                
                  color: 'white',
                  alignSelf:'center',
                }}>
                COMPLETED
              </Text>
            </View>
            </TouchableOpacity>
          </TouchableOpacity> :  <TouchableOpacity  onPress={()=>{getModal(item)}}>
            <View
              style={{
                width: wp('22%'),
                height: hp('4%'),
            
                marginVertical: hp(1),
                borderRadius: 30,
                backgroundColor: 'lightgrey',
                justifyContent: 'center',
                marginLeft:wp('1%'),

                
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                
                  color: 'grey',
                  alignSelf:'center',
                }}>
                PENDING
              </Text>
            </View>
          </TouchableOpacity>}
          

                    </View>

</View>               

    </View>
    </TouchableOpacity>   
    </ScrollView>
    </View>
                        
            )
          }}/> 
           <Pressable
              style={[styles.button,{marginTop:hp(1),backgroundColor:Colors.secondary}]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
       </SafeAreaView></Modal>:null}</ScrollView>
              <View style={{width: '100%',borderWidth:1,borderColor:'grey',padding:wp(2)}}>
                
              <FlatList 
          
          data={DATA1}
          
          
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({item}) => {
           
            return (
                <View>
                {(item.id==getDayDetails)?
            <TouchableOpacity onPress={()=>{dayselect(item)}}>
             
             <Text
                  style={{
                    fontSize: RFValue(13, 580),
                    color: 'white',
                    fontWeight: 'bold',
                    marginHorizontal:wp(2.5),
                    backgroundColor:Colors.secondary,
                    padding:wp(1)
                  }}>
                  {item.title}
                </Text>
            </TouchableOpacity>:<TouchableOpacity onPress={()=>{dayselect(item)}}>
             
            <Text
                 style={{
                   fontSize: RFValue(13, 580),
                   color: 'grey',
                   fontWeight: 'bold',
                   marginHorizontal:wp(3.3)
                 }}>
                 {item.title}
               </Text>
           </TouchableOpacity>}
           </View>
               
              
               
                        
            )
          }}/> 
              </View>
                      
              <Grid style={{marginTop: hp(2)}}>
                <Col
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons size={28} color={Colors.secondary} name={'partly-sunny'} />
                </Col>
                <Col style={{width: '80%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: '#637180',
                      fontWeight: 'bold',
                    }}>
                    MORNING
                  </Text>
                </Col>
              </Grid>
              <Grid style={{marginTop: hp(2)}}>
                <Col style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingHorizontal: wp(3),
                    }}>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                          {(getTime)=='09:30 AM'? <TouchableOpacity
                          onPress={()=>{timeselect('09:30 AM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        09:30 AM
                      </Text>
                          </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('09:30 AM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        09:30 AM
                      </Text>
                          </TouchableOpacity>}
                         
                     
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                     {(getTime)=='10:00 AM'? <TouchableOpacity
                          onPress={()=>{timeselect('10:00 AM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       10:00 AM
                      </Text>
                          </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('10:00 AM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       10:00 AM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                       {(getTime)=='10:30 AM'? <TouchableOpacity
                          onPress={()=>{timeselect('10:30 AM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       10:30 AM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('10:30 AM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       10:30 AM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                     {(getTime)=='11:00 AM'? <TouchableOpacity
                          onPress={()=>{timeselect('11:00 AM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       11:00 AM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('11:00 AM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       11:00 AM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                       {(getTime)=='11:30 AM'? <TouchableOpacity
                          onPress={()=>{timeselect('11:30 AM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       11:30 AM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('11:30 AM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       11:30 AM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                  </View>
                </Col>
              </Grid>
              {/*After noon*/}
              <Grid style={{marginTop: hp(2)}}>
                <Col
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons size={28} color={Colors.secondary}  name={'ios-sunny'} />
                </Col>
                <Col style={{width: '80%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: '#637180',
                      fontWeight: 'bold',
                    }}>
                    AFTERNOON
                  </Text>
                </Col>
              </Grid>
              <Grid style={{marginTop: hp(2)}}>
                <Col style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingHorizontal: wp(3),
                    }}>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                         {(getTime)=='02:00 PM'? <TouchableOpacity
                          onPress={()=>{timeselect('02:00 PM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       02:00 PM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('02:00 PM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                      02:00 PM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      {(getTime)=='02:30 PM'? <TouchableOpacity
                          onPress={()=>{timeselect('02:30 PM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       02:30 PM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('02:30 PM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                      02:30 PM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                   {(getTime)=='03:00 PM'? <TouchableOpacity
                          onPress={()=>{timeselect('03:00 PM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       03:00 PM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('03:00 PM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                      03:00 PM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                  </View>
                </Col>
              </Grid>
              {/*Night*/}

              <Grid style={{marginTop: hp(2)}}>
                <Col
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons size={28} color={Colors.secondary} name={'moon'} />
                </Col>
                <Col style={{width: '80%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: '#637180',
                      fontWeight: 'bold',
                    }}>
                    Night
                  </Text>
                </Col>
              </Grid>
              <Grid style={{marginTop: hp(2)}}>
                <Col style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingHorizontal: wp(3),
                    }}>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                     {(getTime)=='08:00 PM'? <TouchableOpacity
                          onPress={()=>{timeselect('08:00 PM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       08:00 PM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('08:00 PM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                      08:00 PM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      {(getTime)=='08:30 PM'? <TouchableOpacity
                          onPress={()=>{timeselect('08:30 PM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       08:30 PM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('08:30 PM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                      08:30 PM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      {(getTime)=='09:00 PM'? <TouchableOpacity
                          onPress={()=>{timeselect('09:00 PM')}}
                          style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}>
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                       09:00 PM
                      </Text>
                         </TouchableOpacity>: <TouchableOpacity
                          onPress={()=>{timeselect('09:00 PM')}}
                          //style={{borderColor:Colors.secondary,borderWidth:1,padding:wp(2),borderRadius:10}}
                          >
                          <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                      09:00 PM
                      </Text>
                          </TouchableOpacity>}
                    </View>
                  </View>
                </Col>
              </Grid>
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

              {/*Button*/}

              <TouchableOpacity
               >
                <Grid style={{marginTop: hp(1)}}>
                  <Col style={{width: '100%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '90%',
                        padding: 10,
                        backgroundColor: Colors.secondary,
                        alignItems: 'center',
                        borderRadius: 6,
                      }}>
                        <TouchableOpacity onPress={() =>{onOrder()}}>
                        <Text
                        style={{
                          fontSize: RFValue(15, 580),
                          color: '#fff',
                        }}>
                        Save Appoitment
                      </Text>
                        </TouchableOpacity>
                     
                    </View>
                  </Col>
                </Grid>
              </TouchableOpacity>
            </Col>
          </Grid>
        </Content>
      </ScrollView>:

        

          
          <FlatList 
          
          data={Data}
          
          
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
                <TouchableOpacity onPress={()=>{unSetModal()}}>
                   {(Data.length)==0? <View style={{marginTop:'50%',marginBottom:'50%',alignSelf:'center'}}>
            <Text style={{color:Colors.secondary,fontSize:22,fontWeight:'bold',alignSelf:'center'}}>
              Really sorry for inconvenience..
            </Text>
            <Text style={{color:Colors.secondary}}>
              No Services Taken.
            </Text>
          </View>:null}

               
                
<View style={[styles.notificationTab]}>
    <View style={{display:'flex',flexDirection:'row',width:'40%'}}>

<View>
<Image
                      source={logo}
                  style={{
                    alignSelf: 'flex-start',
                    marginVertical: hp('1%'),
                    height: hp('7%'),
                    width: hp('7%'),
                    marginLeft: wp('5%'),
                    borderColor:'lightgrey',borderWidth:1,borderRadius:30
                  }}
                />
    </View>    
                    <View style={{display:'flex',flexDirection:'column',height:hp('15%'),marginHorizontal:wp('2%'),marginBottom:hp('1%')}}>

                    <Text
                    style={{
                      color: 'black',
                      fontSize: RFPercentage(2),
                     fontWeight:'700',
                     marginTop:hp('1%'),marginHorizontal:wp('0%')
                     
                    

                    
                    }}> {item.vendorName}</Text>
                    <Text
                    style={{
                      color: 'grey',
                      fontSize: RFValue(9, 580),
                     fontWeight:'700',
                     
                     
                    

                    
                    }}> {item.serviceTitle}</Text>
                     <Text
                    style={{
                      color: 'red',
                      fontSize: RFValue(10, 580),
                     fontWeight:'700',
                     marginLeft:wp(1)
                     
                     
                    

                    
                    }}>Rs: {item.price}</Text>
                     <Text
                    style={{
                      color: 'grey',
                      fontSize: RFValue(10, 580),
                     fontWeight:'700',
                     
                     
                    

                    
                    }}> 
                    {moment(item.dateCreated).format(
                      "dddd, MMMM Do, YYYY"
                    )}{" "}</Text>
                    
                    <View style={{display:'flex',flexDirection:'row'}}>
                    <Icon
                 name='my-location'
                 size={wp(4)}
                 color={Colors.secondary}
                 style={{
                    alignSelf: 'flex-end',
                    marginRight:wp(1)
                  
                   
                    
                    
                  }}
                />
                <TouchableOpacity onPress={() => {nav(item)}}>
                    <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFValue(10, 580),
                     fontWeight:'700',
                     
                     marginTop:hp(2),
                     
                     
                     
                    

                    
                    }}>Get Your Receipt Now</Text>
                    </TouchableOpacity>
                    </View>
                     
                    </View>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',marginTop:hp(2)}}>
                        
                   {(item.id==getNum && getPageDetails == 'Video')?<View style={{width:wp('31%'),height:hp(8),backgroundColor:"#fff2",margin:hp(0),marginRight:hp(5),borderColor:'grey',borderRadius:10,borderWidth:1}}>
                       <View style={{height:hp(4),width:wp('30.5%'),justifyContent:'center',alignItems:'center',backgroundColor:Colors.secondary,overflow:'hidden',borderRadius:10,borderWidth:0,borderColor:'#fff2'}}>
                       <Text
                    style={{
                      color: 'white',
                      fontSize: RFPercentage(1.5),
                     fontWeight:'700',
                     
            
                     alignSelf:'center',
                     
                  
                    }}> Cancel </Text>
                    </View> 
                    <View style={{height:hp(4),width:wp('30.5%'),justifyContent:'center',alignItems:'center',backgroundColor:'#fff2',overflow:'hidden',borderRadius:20,borderWidth:2,borderColor:'#fff2'}}>
                       <TouchableOpacity onPress={() => {navigation.navigate('Complaint',{item:item})}}>
                       <Text
                    style={{
                      color: 'grey',
                      fontSize: RFPercentage(1.5),
                     fontWeight:'700',
                     
               
                     alignSelf:'flex-start',
                     
                  
                    }}> Complain Now</Text>
                       </TouchableOpacity>
                     
                    </View> 
                       
                   </View>:(getPageDetails) == 'HomeVisits' ?  <TouchableOpacity > 
                       <TouchableOpacity onPress={() => {nav(item)}}>

                       
            <View
              style={{
                width: wp('22%'),
                height: hp('4%'),
                alignItems: 'center',
                marginVertical: hp(1),
                borderRadius: 30,
                backgroundColor: '#58a758',
                justifyContent: 'center',
                marginLeft:wp('10%'),

                
              }}>
              <Text
                style={{
                  fontSize: RFValue(10, 580),
                
                  color: 'white',
                  alignSelf:'center',
                }}>
                COMPLETED
              </Text>
            </View>
            </TouchableOpacity>
          </TouchableOpacity> :  <TouchableOpacity  onPress={()=>{getModal(item)}}>
            <View
              style={{
                width: wp('22%'),
                height: hp('4%'),
            
                marginVertical: hp(1),
                borderRadius: 30,
                backgroundColor: 'lightgrey',
                justifyContent: 'center',
                marginLeft:wp('10%'),

                
              }}>
              <Text
                style={{
                  fontSize: RFValue(10, 580),
                
                  color: 'grey',
                  alignSelf:'center',
                }}>
                PENDING
              </Text>
            </View>
          </TouchableOpacity>}
          

                    </View>

</View>               

    </View>
    </TouchableOpacity>   
          
                        
            )
          }}/>  }
          
         
          
        
      
    </Container>
  );
}

const styles = StyleSheet.create({
    notificationTab:{
        minHeight: hp('22%'),
        maxHeight:hp('24%'),

        width:wp('98%'),
        alignSelf:'center',
        marginBottom:hp('1%'),
        borderColor:'white',
        borderBottomColor:'lightgrey',borderWidth:1
    },
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
  textareaContainer: {
    height: 120,
    padding: 5,
    backgroundColor: Colors.smallcard,
    borderWidth:1,
    borderColor:Colors.secondary,
    borderRadius: 30,
    margin: 15,
    width:'90%'
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    margin: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

});

export default MyAppoitments;
