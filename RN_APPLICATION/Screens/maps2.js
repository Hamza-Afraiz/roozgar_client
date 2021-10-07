import React ,{useEffect,useContext,useRef}from 'react'
import { backHandler,View, Text,Button,TouchableOpacity ,Linking,PermissionsAndroid,Dimensions,StyleSheet,Image,ActivityIndicator,Alert} from 'react-native'
import Geolocation from "@react-native-community/geolocation";
import firestore from "@react-native-firebase/firestore";
import AuthGlobal from "../Context/store/AuthGlobal";
import messaging from '@react-native-firebase/messaging';
import { BaseUrl } from "../Constants/baseUrl.js";
import MapView, { Marker } from 'react-native-maps';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from "../Constants/Colors.js";
import Geocoder from "react-native-geocoder";
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { BackHandler } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector,useDispatch} from 'react-redux'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import MapViewDirections from 'react-native-maps-directions';
const markers= [{
  title: 'hello',
  coordinates: {
    latitude: 33.7396,
    longitude: 73.1791
  },
},
{
  title: 'hello1',
  coordinates: {
    latitude: 33.7805,
    longitude: 73.2424
  },  
}]
function Maps2  ({navigation,route}) {
  const dispatch  = useDispatch();
  const {info }=route.params;
  if((info=='accepted')&& (value1=='0')){
    console.log("infoo is accepted")
    alert("Request Accepted")
    setValue1("1")
  }

    const context = useContext(AuthGlobal);
    const [vendorsData,setVendorsData]= React.useState({});
const [superLat, setSuperLat] = React.useState(55.9754);
  const [superLong, setSuperLong] = React.useState(21.4735);
  const [superLat1, setSuperLat1] = React.useState(55.9754);
  const [superLong1, setSuperLong1] = React.useState(21.4735);
  const[image,setImage] = React.useState('')
  const [value, setValue] =React.useState("0")
  const [value1,setValue1]=React.useState('0')
  const[appoitmentData,setAppoitmentData]=React.useState({})
  const[condition,setCondition]=React.useState('0')
  const [clientLocation, setClientLocation] = React.useState("");
  const[distance,setDistance]=React.useState('');
  const [appoitmentId,setAppoitmentId]=React.useState('');
  const [phoneNumber,setPhoneNumber]=React.useState('');
  const[vToken,setVToken]=React.useState('');
  const[token,setToken] =React.useState('');
  const[clientId,setClientId] =React.useState('60b3b80d9a52a4223c4eb2eb');

  const[marker,setMarker]= React.useState({});

 
const newdata = context.stateUser.userProfile['user'].id;
console.log("new data is ",newdata)
//setClientId(newdata);
const data3 =  useSelector((state)=>{
  console.log("getting arrived now")


 return state.arrivedData
})
const data4 =  useSelector((state)=>{
  console.log("getting interval now")


 return state.intervalData
})
    React.useEffect(() => {
    //  let isMounted = true;
    
        messaging().getToken().then((response) => {setToken(response);
          console.log(" client token istoken is",response)})
        // navigation.addListener('beforeRemove', (e) => {
          
  
        //   // Prevent default behavior of leaving the screen
        //   e.preventDefault();
  
        //   // Prompt the user before leaving the screen
        //   Alert.alert(
        //     'Discard service?',
        //     '. Are you sure you want to cancel the service and leave the screen?',
        //     [
        //       { text: "Don't cancel", style: 'cancel', onPress: () => {} },
        //       {
        //         text: 'Cancel',
        //         style: 'destructive',
        //         // If the user confirmed, then we dispatch the action we blocked earlier
        //         // This will continue the action that had triggered the removal of the screen
        //         onPress: () => navigation.dispatch(e.data.action),
        //       },
        //     ]
        //   );
        // }),
        console.log("react useeeeeeeeeeeeeee effectttttttttttttttttttttttt")
     
        getData()
        
        getCurrentLocation();
   
       
       navigation.setOptions({
        title: "LOCATION",
       
                      headerRight: () => (
                        <Icon2
                        name='phone'
                        size={wp(7)}
                        color='white'
                        onPress={() =>{Linking.openURL(`tel://${phoneNumber}`).catch(err => console.log('Error:', err))}}
                        style={{
                           alignSelf: 'flex-end',
                          
                           height: hp('5%'),
                           width: wp('6%'),
                           marginLeft: wp('1%'),
                           marginRight:wp("2%"),
                           marginTop:hp('2%'),
                           
                         }}
                       />
                      )
      })
      
        //console.log('vendir data is ',vendorsData)
       
      
        requestLocationPermission();
       
       
        //console.log("get current location")
        Geolocation.getCurrentPosition(
          (data) => {
            
            setSuperLat(data.coords.latitude);
            setSuperLong(data.coords.longitude);
            console.log('cureent location is',data.coords);
          },
          (error) => console.log(error),
          {
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 30000,
          }
        );
  
        const intervalId=setInterval(getCurrentLocation, 15000);
        console.log('interval is ',intervalId);
        dispatch({type:"ADD_INTERVALDATA",payload:intervalId})
       
       // console.log('direeeeeeectlty getting is ',getCurrentLocation())
      
        
        
      
     // console.log("get cururrrrrrrent location ",)
     
      
        
         // setClientId(newdata);
       
          //getCurrentLocation();
          
       //   console.log('vendors length is',vendorsData.length)
       //   if(vendorsData.length>1){
            //console.log('vendors length is',vendorsData.length)
           // console.log("calling filtering")
           // filterVendors();
         // }
        
         const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          () => true
        );
        
      
   
      return () => backHandler.remove();
     
    }, []);
  
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("value has been set")
          setValue('1')
          //To Check, If Permission is granted
        } else {
          
          alert("Permission Denied");
        }
      } catch (err) {
        alert("err", err);
      }
    };
    const getDistance=( LAT1, LONG1,  LAT2,  LONG2)=> {
   
   
      let distance = 2 * 6371000 * Math.asin(Math.sqrt(Math.pow((Math.sin((LAT2 * (3.14159 / 180) - LAT1 * (3.14159 / 180)) / 2)), 2) + Math.cos(LAT2 * (3.14159 / 180)) * Math.cos(LAT1 * (3.14159 / 180)) * Math.sin(Math.pow(((LONG2 * (3.14159 / 180) - LONG1 * (3.14159 / 180)) / 2), 2))));
     console.log("distacne in method is ",distance);
     distance=distance/1000;
     distance=distance.toFixed(1)
     setDistance(distance);
      return distance;
   };
    
  const getData = () => {
    console.log("getCurrentLocation called")
    const { orderId , vendorId } = route.params;
    fetch(`http://${BaseUrl.wifi}:3000/api/v1/ongoingOrder/appoitmentId/?id=${orderId}` ,{
      method: "GET",
      
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
  })
  .then((res) => res.json())
  .then((data) => {
      if (data) {
         
        setAppoitmentData(data);
          console.log("appoitment  data is ",data)
         
         // this.getCurrentLocation();

      
          //const value=AsyncStorage.getItem('jwt')
         //console.log("token value is ",value)
         

      }
  })
  .catch((err) => {
     alert("incorrect details.Check your details again")
     console.log(err)
  
      
  });
     
    /*  firestore()
    .collection("clientLocations")
    .add({
      clientId: clientId,
      clientLocation: new firestore.GeoPoint(superLat, superLong),
      token:token
    })
    .then(() => {
      console.log("Location added!");
    });*/
   // var array = [];
   // console.log("simpple array is ",array)

    /*firestore()
    .collection("vendorLocations")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().vendorToken);
        setVendorToken(doc.data().vendorToken);
       // console.log('vendor token is',vendorToken)
        console.log("data we get is ",doc.data());
        setVendorsData( vendorsData => [...vendorsData, doc.data()]);

       // console.log('vendors data new after checking is',vendorsData)

       // setVendorsData(vendorsData:[...vendorsData,doc.data()])
      // this.setState({ myArray: [...this.state.myArray, 'new value'] })
       array.push(doc.data())
       console.log("array is ",array)
       console.log("vendors data set");
       
       
       //console.log("vendors data in firstire is ",vendorsData)
    
        
        //list.push(doc.data());
      });
      var arraydemo=array;
     // console.log("arraydemo is ",arraydemo)
     // console.log("arraydemo is ",array)
     // setVendorsData(arraydemo);
      console.log("vendors data outside firstire is ",vendorsData)
      console.log("all dataaaa we have get");
    
      
    
    
      
    });*/
  
    console.log("fetching data")
    fetch(`http://${BaseUrl.wifi}:3000/api/v1/vendor/?id=${vendorId}` ,{
      method: "GET",
      
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
  })
  .then((res) => res.json())
  .then((data) => {
      if (data) {
         
        setVendorsData(data);
          console.log("Vendor data is ",data)
          setPhoneNumber(data.phone)
         
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
   
    const getCurrentLocation = async() => {
      if(superLat==55.9754 && superLong==21.4735){
       

      }
      console.log("getCurrentLocation calleddddddddddddddddddddd")
      const { orderId , vendorId } = route.params;
    //   fetch(`http://${BaseUrl.wifi}:3000/api/v1/ongoingOrder/appoitmentId/?id=${orderId}` ,{
    //     method: "GET",
        
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //     },
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //     if (data) {
           
    //       setAppoitmentData(data);
    //         console.log("appoitment  data is ",data)
           
    //        // this.getCurrentLocation();
  
        
    //         //const value=AsyncStorage.getItem('jwt')
    //        //console.log("token value is ",value)
           
  
    //     }
    // })
    // .catch((err) => {
    //    alert("incorrect details.Check your details again")
    //    console.log(err)
    
        
    // });
       
    //   /*  firestore()
    //   .collection("clientLocations")
    //   .add({
    //     clientId: clientId,
    //     clientLocation: new firestore.GeoPoint(superLat, superLong),
    //     token:token
    //   })
    //   .then(() => {
    //     console.log("Location added!");
    //   });*/
    //  // var array = [];
    //  // console.log("simpple array is ",array)

    //   /*firestore()
    //   .collection("vendorLocations")
    //   .onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.data().vendorToken);
    //       setVendorToken(doc.data().vendorToken);
    //      // console.log('vendor token is',vendorToken)
    //       console.log("data we get is ",doc.data());
    //       setVendorsData( vendorsData => [...vendorsData, doc.data()]);

    //      // console.log('vendors data new after checking is',vendorsData)

    //      // setVendorsData(vendorsData:[...vendorsData,doc.data()])
    //     // this.setState({ myArray: [...this.state.myArray, 'new value'] })
    //      array.push(doc.data())
    //      console.log("array is ",array)
    //      console.log("vendors data set");
         
         
    //      //console.log("vendors data in firstire is ",vendorsData)
      
          
    //       //list.push(doc.data());
    //     });
    //     var arraydemo=array;
    //    // console.log("arraydemo is ",arraydemo)
    //    // console.log("arraydemo is ",array)
    //    // setVendorsData(arraydemo);
    //     console.log("vendors data outside firstire is ",vendorsData)
    //     console.log("all dataaaa we have get");
      
        
      
      
        
    //   });*/
    
    //   console.log("fetching data")
    //   fetch(`http://${BaseUrl.wifi}:3000/api/v1/vendor/?id=${vendorId}` ,{
    //     method: "GET",
        
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //     },
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //     if (data) {
           
    //       setVendorsData(data);
    //         console.log("Vendor data is ",data)
           
    //        // this.getCurrentLocation();
  
        
    //         //const value=AsyncStorage.getItem('jwt')
    //        //console.log("token value is ",value)
           
  
    //     }
    // })
    // .catch((err) => {
    //    alert("incorrect details.Check your details again")
    //    console.log(err)
    
        
    // });
      console.log("vendorid is",vendorId)
      const vendorLocation = await firestore()
      .collection("vendorLocations")
      .doc(vendorId).get();
      console.log("vendor location is",vendorLocation)
      setVToken(vendorLocation.data().vendorToken)
     const var1= vendorLocation.data();

     console.log("var 1 is",var1)
     onSet(var1);
     //setMarker(var1);
     
      
  //    <MapViewDirections
  //    origin={{latitude: superLat,
  //      longitude: superLong}}
  //    destination={{latitude:superLat1,
  //      longitude:superLong1}}
  //    apikey={GOOGLE_MAPS_APIKEY}
  //    strokeWidth={3}
  //    strokeColor="hotpink"
  //  />

      
     // onOrder();
    }
    const deleteOngoing=() => {
      const { orderId , vendorId } = route.params;
      const cToken=token;
      
      const user={
        
        cToken,vToken,clientId
      }
      console.log("user is ",user)
      fetch(`http://${BaseUrl.wifi}:3000/api/v1/ongoingOrder/delete1/?id=${orderId}` ,{
            method: "DELETE",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
               
             // setVendorsData(data);
            // alert("Are you sure?")
                console.log("appoitment is ",data)
                navigation.navigate("Home")
              
                
               
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
    const onCancel = ()=>{
      console.log('on caaaaaaaaaaanceeelllllll')
      console.log("data 3 is ",data3)
      if(data3==''){
        const user={

        };
        
              const { orderId , vendorId } = route.params;
             fetch(`http://${BaseUrl.wifi}:3000/api/v1/cancelledOrder/` ,{
                    method: "POST",
                    body: JSON.stringify(appoitmentData),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                       
                     // setVendorsData(data);
                    // alert("Are you sure?")
                        console.log("appoitment is ",data)
                        console.log("data4 is ",data4)
                        clearInterval(data4)
                        deleteOngoing()
                      
                        
                       
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
      else{
        alert("Vendor is arrived !You cant cancel now")
      }
      
    
     
     }
    const onSet=(var1)=>{
        console.log("onseet var 1 uis",var1)
        setMarker(var1);
        setSuperLat1(var1.vendorLocation._latitude);
        setSuperLong1(var1.vendorLocation._longitude);
        setImage(var1.vendorImage);
        let clientLoc = {
          lat: parseFloat(var1.vendorLocation._latitude),
          lng: parseFloat(var1.vendorLocation._longitude),

        };
        Geocoder.geocodePosition(clientLoc).then((res) => {
          setClientLocation(
            res[0].streetName +
              ", " +
              res[0].locality +
              ", " +
              res[0].subLocality +
              ", " +
              res[0].subAdminArea
          );
        });
        console.log("super long is",superLong,"super lat is",superLat)
        Geolocation.getCurrentPosition(
          (data) => {
            setSuperLat(data.coords.latitude);
            setSuperLong(data.coords.longitude);
            const dd=getDistance(data.coords.latitude,data.coords.longitude,var1.vendorLocation._latitude,var1.vendorLocation._longitude)
            console.log('cureent location is',data.coords);
          },
          (error) => {console.log(error)
         // alert("Location error .Please check your location")
        }
          ,
          {
            enableHighAccuracy: false,
            timeout: 2000,
            maximumAge: 3000,
          }
        );
        // if(superLat!=55.9754 && superLong!=21.4735){
        //   console.log("if called");
        //   const dd=getDistance(superLat,superLong,var1.vendorLocation._latitude,var1.vendorLocation._longitude)
        // }
       
      // setCondition('1');
        
    }
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCBXTIffD69ZbWGyAcQlZduzuqcf7cRjok';
    return (
        
            <View style={styles.container}>
              {(value=='0')?<View style={{alignSelf:'center',marginTop:'10%'}}>
       <ActivityIndicator size="large" color="#00ff00" />
      </View>:
      <View>
<View style={{display:'flex',flexDirection:'row',justifyContent:'center',position:'absolute',width:'100%',height:'15%',marginTop:'15%',}}>
  
  
    </View>
    
      <MapView style={styles.map}
     
      region={{latitude: superLat,
        longitude: superLong,
        latitudeDelta: 0.2922,
        longitudeDelta: 0.3421,}}
        showsUserLocation={true}
        followsUserLocation={true}
        zoomEnabled={true}>
         
         <Marker
        
        title={"Parking Meter"}
    coordinate = {{latitude: superLat,
      longitude: superLong,}}
     description={"This is a location of your vendor"} />
     <Marker
      
        title={"Parking Meter"}
    coordinate = {{latitude:superLat1,
    longitude:superLong1}}
     description={"This is a location of your vendor"}
     
      >
     <Image source={{uri:vendorsData.image}} style={{height: 55, width:55,borderRadius:30 }} />
   
    </Marker>
   
        

       
       
    
   
   
         

     

   
          
      </MapView>
      </View>}
      
      <View style={{width:'90%', backgroundColor:'#FFFFFF',alignSelf:'center',marginTop:hp(3),elevation:10,position:'absolute',marginBottom:0,bottom:0}}>
                  <View style={{width:'100%', height:hp('15%'),borderWidth:1,borderColor:'white',borderBottomColor:'lightgrey',display:'flex',flexDirection:'row'}}>
                    
                        <View style={{width:'90%',display:'flex',flexDirection: 'row',height:'80%',alignSelf:'flex-end',marginBottom:'4%',marginLeft:'2%',}}> 
                            
                        <Image
                     source={{uri: vendorsData.image}}
                  style={{
                    alignSelf: 'flex-start',
                    
                    height: hp('7%'),
                    width: wp('10%'),
                    borderRadius:10
                
                  }}
                />
                <View style={{marginLeft:wp(2),marginTop:hp(0.5),width:'80%'}}>   
                <View style={{display:"flex",flexDirection:'row',justifyContent:'space-between'}}>
            <View>
            <Text
                    style={{
                      color: '#333132',
                      fontSize: RFPercentage(2),
                     fontWeight:'bold',
                     
                    }}> {vendorsData.userName} </Text>
                     <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFPercentage(1.5),
                     fontWeight:'bold',
                     alignSelf:'center'
                     
                    }}> is on the way </Text>
              </View>   
                    <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFPercentage(1.5),
                     fontWeight:'bold',
                     textAlign:'center',
                     width:wp(40)
                     
                    }}> {clientLocation} </Text>
                  
                </View>
               
                    
                    <View style={{display:'flex',flexDirection: 'row',marginTop:'2%'}}>
                      <TouchableOpacity
                      onPress={()=>{navigation.navigate('VendorProfile',{item:vendorsData})}}
                      >
                      <Text
                    style={{
                      color: 'white',
                      fontSize: RFPercentage(1.5),
                   
                     height: hp('4'),
                     width:wp(20),

                     backgroundColor: Colors.secondary,
                     borderRadius:10,marginRight:wp(1),textAlign:'center',textAlignVertical:'center'
                     
                    }}> See Profile</Text>
                      </TouchableOpacity>

                    
                    <TouchableOpacity onPress={()=>{onCancel()}}>

                    <Text
                    style={{
                      color:'white',
                      fontSize:RFPercentage(1.5),
                      fontWeight:'bold',
                   
                     height: hp('4'),
                     width:wp(20),

                    
                     backgroundColor: Colors.secondary,
                     borderRadius:10,marginRight:wp(1),textAlign:'center',textAlignVertical:'center'
                     
                    }}> CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >

                    <Text
                    style={{
                      color:'white',
                      fontSize:RFPercentage(1.5),
                      fontWeight:'bold',
                   
                     height: hp('4'),
                     width:wp(30),
                     marginRight:hp(2),

                    
                     backgroundColor: Colors.secondary,
                     borderRadius:10,marginRight:wp(1),textAlign:'center',textAlignVertical:'center'
                     
                    }}> {distance} Km Away</Text>
                    </TouchableOpacity>
                    

                    </View>

                </View>
                
                
                        </View>
                        
                     

                  </View>
                  
                         <View style={{marginVertical:hp(1)}}>
                        <Text style={{color: 'lightgrey',alignSelf:'center'}}>
                            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        </Text>
                    
                    </View>
                    
                    




              </View>
     
    </View>
    

           
      
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Maps2
