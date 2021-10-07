import React ,{useEffect,useContext}from 'react'
import { View, Text,Button,TouchableOpacity ,PermissionsAndroid,Dimensions,StyleSheet,Image,ActivityIndicator,Alert} from 'react-native'
import Geolocation from "@react-native-community/geolocation";
import firestore from "@react-native-firebase/firestore";
import AuthGlobal from "../Context/store/AuthGlobal";
import messaging from '@react-native-firebase/messaging';
import { BaseUrl } from "../Constants/baseUrl.js";
import MapView, { Marker } from 'react-native-maps';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from "../Constants/Colors.js";
import { useIsFocused } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector,useDispatch} from 'react-redux'
import { BackHandler } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
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
function Maps  ({navigation,route}) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyA10-6fg72eLjJr5Y0kvT129IPQoULlHDE';
    const context = useContext(AuthGlobal);
const [superLat, setSuperLat] = React.useState(55.9754);
  const [superLong, setSuperLong] = React.useState(21.4735);
const[clientId,setClientId] =React.useState('60b3b80d9a52a4223c4eb2eb');
const[appoitmentData,setAppoitmentData]=React.useState({})
const[token,setToken] =React.useState('');
const[vendorToken,setVendorToken] =React.useState('')
const isFocused = useIsFocused();
const [vendorsData,setVendorsData]=React.useState([])
const[filteredVendors,setFilteredVendors]=React.useState([])
const [value,setValue]=React.useState('0');
const [value2,setValue2]=React.useState('0');
const[condition,setCondition]=React.useState('0')
const[subCategory,setSubCategory]=React.useState('');
// let componentMounted = true;
const dispatch  = useDispatch();
let isMounted = true; 
    React.useEffect(() => {
     
      if (isMounted)  {
        
       
      navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity                
            onPress={() =>navigation.replace('Home')}
        >
         <Ionicons style = {{paddingLeft : 10,marginTop:5}} name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        ),
    });
      
     // setInterval(getCurrentLocation, 30000);
    //  if (componentMounted){
     const {id}=route.params;
     console.log("id in maps ",id);
     setSubCategory(id);
      let newdata = context.stateUser.userProfile['user'].id;
      console.log("clientId is ",newdata);
      setClientId(newdata)

      console.log("react useeeeeeeeeeeeeee effectttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
      getCurrentLocation();
      //console.log('vendir data is ',vendorsData)
    
       
      
    
      requestLocationPermission();
     
      messaging().getToken().then((response) => {setToken(response);
      console.log(" client token istoken is",response)})
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
          timeout: 20000000,
          maximumAge: 360000,
        }
      );
     // console.log('direeeeeeectlty getting is ',getCurrentLocation())
    
      
      
    
   // console.log("get cururrrrrrrent location ",)
   
  //  const intervalId=setInterval(getCurrentLocation, 15000);
  //  dispatch({type:"ADD_INTERVALDATA",payload:intervalId})
      
       // setClientId(newdata);
     
        //getCurrentLocation();
        
     //   console.log('vendors length is',vendorsData.length)
     //   if(vendorsData.length>1){
          //console.log('vendors length is',vendorsData.length)
         // console.log("calling filtering")
         // filterVendors();
       // }
    //  }}
    //  const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   () => true
    // );
    // return () => backHandler.remove();
      }
      return () => { 
        console.log("returninggg")
        isMounted = false };
    }, [superLat,superLong]);
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
   
    const filterVendors2=(array)=>{
     
      
      const array2=[]
      console.log('filterrrrrrrrrrrrrrrrrring vendorsss start')
     // console.log('vendors data is ',array);
      console.log("length  is ",array.length);
if(superLat!=55.9754 && superLong!=21.4735){
  if(array.length>=1){
    for(  let i=0;i<array.length;i++){
      let lat2=array[i].vendorLocation._latitude;
      
  console.log('lat2 is',lat2)
  console.log('super lat is ',superLat)
    let long2=array[i].vendorLocation._longitude;
     var distance= getDistance(superLat,superLong,lat2,long2);
     console.log('distance in filtered ',distance);
     if(distance<15000){
  array2.push(array[i])
     }
  
    }
    //console.log('array2 is ',array2)
    //var length=array2.length;
  }
}
     
if((array2.length)!= 0 ){
  console.log('vendord found is ',array2.length)
 // alert('  Vendors Found')
 

}

      
      setFilteredVendors(array2);
     // console.log('filtered vendors is ',filteredVendors)
    }
    const filterVendors=()=>{
      
      const array2=[]
      console.log('filterrrrrrrrrrrrrrrrrring vendorsss start')
      console.log('vendors data is ',vendorsData);
      console.log("length  is ",vendorsData.length);
if((vendorsData.length)!= 0){
  console.log("length is not zerp")
  for(  let i=0;i<vendorsData.length;i++){
    console.log('for loop start');
    let lat2=vendorsData[i].vendorLocation._latitude;
    
console.log('lat2 is',lat2)
  let long2=vendorsData[i].vendorLocation._longitude;
   var distance= getDistance(superLat,superLong,lat2,long2);
   console.log('distance in filtered is ',distance);
   if(distance<100000){
array2.push(vendorsData[i])
   }

  }
}
      
      setFilteredVendors(array2);
      console.log('filtered vendors is ',filteredVendors)
    }
    const getDistance=( LAT1, LONG1,  LAT2,  LONG2)=> {
      console.log("coordinates are",LAT1,LONG1,LAT2,LONG2,"HEREEEEE");
   
   
      let distance = 2 * 6371000 * Math.asin(Math.sqrt(Math.pow((Math.sin((LAT2 * (3.14159 / 180) - LAT1 * (3.14159 / 180)) / 2)), 2) + Math.cos(LAT2 * (3.14159 / 180)) * Math.cos(LAT1 * (3.14159 / 180)) * Math.sin(Math.pow(((LONG2 * (3.14159 / 180) - LONG1 * (3.14159 / 180)) / 2), 2))));
     console.log("distacne in method is ",distance);
      return distance;
   };
   const  onOrder=(item)=>{
     setValue('0');
     
     // const item =this.props.route.params.item;
     console.log('on order')
    // const serviceId="212123";
    // const serviceTitle="212123";
     const vendorId=item.id;
     
     const vendorName=item.userName;
     
      const price="NOT FIXED ";
      const completionTime="2 hour";
      const vToken=vendorToken;
      const cToken=token;
      
     // const image=this.state.vendorData.image;
     console.log("base url is",vendorToken)
    const lat=superLat.toString();
    console.log("client id is ",clientId)
    console.log("lat ois",lat)
    const long=superLong.toString();
      const user = {
       
        vendorId,
        clientId,
        price,
        completionTime,
        //serviceTitle,  
        vendorName,vToken,
        cToken,
       lat,long

        
        
      };
      
  
      
       console.log("fetching data")
       
       fetch(`http://${BaseUrl.wifi}:3000/api/v1/ongoingOrder/`, {
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
            const userNow = data;
        
          
            console.log("orders data is ",data)
            setAppoitmentData(data);
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           
  
        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again")
       console.log(err)
    
      
    });
    
     }
     const deleteOngoing=() => {
      const { orderId , vendorId } = route.params;
      const cToken=token;
      const vToken=vendorToken;
      
      const user={
        
        cToken,vToken,clientId
      }
      fetch(`http://${BaseUrl.wifi}:3000/api/v1/ongoingOrder/delete1/?id=${appoitmentData.id}` ,{
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
     const getVendorsData =(vendorId)=>{
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
            //console.log("Vendor data is ",data)
            onOrder(data);
           
  
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           
  
        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again")
       console.log(err)
    
        
    });

     }
    const getCurrentLocation = () => {
       console.log("get cuurent locationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
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
      console.log("gettttttttttttting firebase ")
    
      const {id}=route.params;
      console.log("subCategory is",id)
      return firestore()
      .collection("vendorLocations")
     //.where('vendorSubCategories', 'in', [id])
  
     .where("vendorSubCategories", "array-contains",  subCategory )
     .get()
      .then((querySnapshot) => {
        console.log("query running")
        const array = [];
        querySnapshot.forEach((doc) => {
         console.log("doc dataaaaaaaaaaaaaaaaaaaaaa is ",doc.data());
          setVendorToken(doc.data().vendorToken);
          array.push(doc.data())
        });
       // console.log("array is ",array)
        filterVendors2(array)
        setVendorsData(array);      
      });
     
      
      if(array.length>1){
        console.log("checkinggggggggg")
        setVendorsData(array);
      }
      setValue2('1');

      // {filteredVendors.map(marker =>(
      //   <MapViewDirections
      //   origin={{latitude: superLat,
      //     longitude: superLong}}
      //   destination={{latitude:marker.vendorLocation._latitude,
      //     longitude:marker.vendorLocation._longitude}}
      //   apikey={GOOGLE_MAPS_APIKEY}
      //   strokeWidth={3}
      //   strokeColor="hotpink"
      // />
      // )

      // )}
     // onOrder();
    }
    return (
        
            <View style={styles.container}>
              {(value=='0')?<View style={{alignSelf:'center',marginTop:'10%'}}>
                
       <ActivityIndicator size="large" color="#00ff00" />
       <View style={[styles.userCityRow,{backgroundColor:Colors.smallcard,elevation:10,borderRadius:10,padding:6}]}>
                <Text style={[styles.userCityText,{color:Colors.secondary,fontSize:14}]}>
                  Wait For Vendor Decision!
                </Text>
              </View>
              <TouchableOpacity
              onPress={()=>{onCancel()}}
              >
              <View style={[styles.userCityRow,{backgroundColor:Colors.smallcard,elevation:10,borderRadius:10,padding:6,marginTop:20}]}>
                <Text style={[styles.userCityText,{color:Colors.secondary,fontSize:14,alignSelf:'center'}]}>
                  Cancel!
                </Text>
              </View>
                </TouchableOpacity>
              
      </View>:
      <View>

    
    
      <MapView style={styles.map}
     
      region={{latitude: superLat,
        longitude: superLong,
        latitudeDelta: 0.2922,
        longitudeDelta: 0.3421,}}
        showsUserLocation={true}
        followsUserLocation={true}
        zoomEnabled={true}
        >
          
     
       
      {filteredVendors.map(marker =>(
          <Marker
        key={marker.vendorId}
        title={"Request Sent"}
    coordinate = {{latitude:marker.vendorLocation._latitude,
    longitude:marker.vendorLocation._longitude}}
     description={"Please wait for approval"}
     onPress={()=>{getVendorsData(marker.vendorId)}}
      >
     <Image source={{uri:marker.vendorImage}} style={{height: 55, width:55,borderRadius:30,borderColor:Colors.secondary,borderWidth:4 }} />
   
    </Marker>
        )

        )}
        
       
    
   
   
         

     

   
          
      </MapView>
      
      </View>}
      
     
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
    marginTop:0,
   
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Maps
