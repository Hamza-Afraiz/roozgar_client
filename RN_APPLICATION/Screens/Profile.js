import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {  Ionicons, FontAwesome5,MaterialIcons,AntDesign,Alert} from "@expo/vector-icons";
import logo from '../assets/logoroozgaar.png';
import {Colors} from "../Constants/Colors.js";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BaseUrl } from "../Constants/baseUrl.js";
import Geolocation from "@react-native-community/geolocation";
import firestore from "@react-native-firebase/firestore";
import AuthGlobal from "../Context/store/AuthGlobal";
import messaging from '@react-native-firebase/messaging';
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  PermissionsAndroid,ActivityIndicator
} from 'react-native'
import {Button,Avatar, SearchBar,Rating } from 'react-native-elements'
 import { CardHome } from "./comp";
import {Email} from "../Components/Email";
import { Divider } from 'react-native-elements';
import { ThemeProvider } from 'styled-components';
import color from 'color';

class Profile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {

   vendorId: '', 
   vendorData:{},
   userData:{},
   superLat:'',
   superLong:"",
   token:"",
   vendorToken:"",
   clientToken:"",
   loading:'0',
   serviceData:{},
   value:'0'


   };
}
  componentDidMount() 
   {
     
  
    messaging().getToken().then((response) => {this.setState({clientToken:response})
      console.log(" client token istoken is",response)})
    this.onLoadData()
    //this.onLoadData("hello",this.getCurrentLocation)
    this.requestLocationPermission();
  
   // this.getCurrentLocation();
  
    this.storage()
    
    }
     requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //this.onLoadData()
          //To Check, If Permission is granted
        } else {
          alert("Permission Denied");
        }
      } catch (err) {
        alert("err", err);
      }
    };
  
   
   
  onPressPlace = () => {
    console.log('place')
  }
  storage = async()=>{
    let jsonValue = await AsyncStorage.getItem('userData');
    
    console.log("user are ",jsonValue)
   
    let newjsonValue=jsonValue != null ? JSON.parse(jsonValue) : null;
   
    
   
   // console.log(newjsonValue.image)
    console.log('newjson value is ',newjsonValue)
    this.setState({ userData: newjsonValue })
    //console.log('userData value is ',this.state.cat)

  }
  onPressTel = number => {
    const item =this.props.route.params.item;
    Linking.openURL(`tel://${item.phone}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = email => {
    const item =this.props.route.params.item;
    Linking.openURL(`mailto://${item.email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }
  onLoad = () => {
    const data =this.props.route.params.vendorId;
    this.setState({
      vendorid:data
    })
    console.log("vendorrr iddd",this.state.vendorid)
   
    
  }
   onLoadData=()=>{
     //console.log(message);
    const id =this.props.route.params.vendorId;
    
     console.log("fetching data")
    fetch(`${BaseUrl.wifi}/api/v1/vendor/?id=${id}` ,{
      method: "GET",
      
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
  })
  .then((res) => res.json())
  .then((data) => {
      if (data) {
         this.setState({
           vendorData:data,
           vendorId:data._id
         })
          console.log("Vendor data is ",data)
          console.log("VendoData is ",this.state.vendorData)
          this.getCurrentLocation();

      
          //const value=AsyncStorage.getItem('jwt')
         //console.log("token value is ",value)
         

      }
  })
  .catch((err) => {
     alert("incorrect details.Check your details again")
     console.log(err)
  
      
  });
/*  if (typeof callback == "function")
  callback();
 */
   }
    getCurrentLocation = async () => {
    console.log("get current location")
    Geolocation.getCurrentPosition(
      (data) => {
        this.setState({superLat:data.coords.latitude,
        superLong:data.coords.longitude})
        
        console.log(data.coords);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      }
    );
  /*  firestore()
  .collection("clientLocations")
  .add({
    clientId: clientId,
    clientLocation: new firestore.GeoPoint(superLat, superLong),
    token:token
  })
  .then(() => {
    console.log("Location added!");
  });
  firestore()
  .collection("vendorLocations")
  .onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data().vendorToken);
      let tok=doc.data(this.state.vendorData.id).vendorToken;
      console.log('token is',tok);
      this.setState({vendorToken:tok})
     // console.log(vendorToken);
      //list.push(doc.data());
    });
  });*/
  console.log('vendor data in checking is',this.state.vendorId);
  const vendorIdd=this.state.vendorId;
 console.log('vendor id is ',vendorIdd)
  const vendorLocation = await firestore()
          .collection("vendorLocations")
          .doc(vendorIdd).get();
          console.log("vendor location is",vendorLocation)
          if(vendorLocation.data()){
            const var1= vendorLocation.data().vendorToken;

            console.log("var 1 is",var1)
            this.onSet(var1)
          }
         
        // this.setState({vendorToken:vendorLocation.data().vendorToken})
 // this.onOrder();
}
onSet=(var1)=>{
  console.log('onset var 1 is ',var1)
  this.setState({vendorToken:var1})

}
   onOrder=()=>{
    const lat=this.state.superLat.toString();
    console.log("lat ois",lat)
    const long=this.state.superLong.toString()
     console.log('user data in order is  ',this.state.userData)
     this.setState({loading:'1'})
     console.log("vendor token is",this.state.vendorToken);
    const item =this.props.route.params.item;
    const serviceId=item.id;
    const serviceTitle=item.title;
    const vendorId=this.state.vendorId;
    const clientId=this.state.userData.id;
    const vendorName=this.state.vendorData.userName;
   
    const price=item.price;
    const completionTime="2 hour";
    const image=this.state.vendorData.image;
    const vToken=this.state.vendorToken;
    console.log("vendor token is ",vToken)
    const cToken=this.state.clientToken;
    console.log("order data before going  is", serviceId,
    vendorId,
    clientId,
    price,
    completionTime ,  serviceTitle,  
    vendorName,vToken);
    const user = {
      serviceId,
      vendorId,
      clientId,
      price,
      completionTime,
      serviceTitle,  
      vendorName,
      image,
      cToken,
      vToken,
      lat,long
      
    };
    

    
     console.log("fetching data")
     fetch(`${BaseUrl.wifi}/api/v1/ongoingOrder/`, {
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
      
          //const value=AsyncStorage.getItem('jwt')
         //console.log("token value is ",value)
         

      }
  })
  .catch((err) => {
     alert("incorrect details.Check your details again")
     console.log(err)
  
    
  });
  
   }
  renderHeader = () => {
    const item =this.props.route.params.item;
   
    
    
    
  

      

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={2}
          source={{uri:item.image}}
        >
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('VendorProfile',{item:this.state.vendorData})}}>
            <Image
              style={styles.userImage}
              source={{uri: this.state.vendorData.image}}
            />
      
            </TouchableOpacity>
          
            <View style={styles.userAddressRow}>
              <View>
               
              </View>
              <View style={[styles.userCityRow,{backgroundColor:Colors.smallcard,elevation:10,borderRadius:10,padding:6}]}>
                <Text style={[styles.userCityText,{color:Colors.secondary,fontSize:14}]}>
                  {item.vendorName}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  

  

  render() {
    const item =this.props.route.params.item;
    return (
      <ScrollView style={styles.scroll}>
        {(this.state.loading == "1")?
        <View style={{marginTop:"50%"}}>
          <ActivityIndicator size="large" color="#00ff00" />
          <View style={[styles.userCityRow,{backgroundColor:Colors.smallcard,elevation:10,borderRadius:10,padding:6}]}>
                <Text style={[styles.userCityText,{color:Colors.secondary,fontSize:14}]}>
                  Wait For Vendor Decision!
                </Text>
              </View>
              <TouchableOpacity
              onPress={()=>{this.props.navigation.pop()}}
              >
              <View style={[styles.userCityRow,{backgroundColor:Colors.smallcard,elevation:10,borderRadius:10,padding:6,marginTop:20}]}>
                <Text style={[styles.userCityText,{color:Colors.secondary,fontSize:14,alignSelf:'center'}]}>
                  Cancel!
                </Text>
              </View>
                </TouchableOpacity>
          </View>:
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
          {this.renderHeader()}
          <TouchableOpacity  onPress={() => {this.props.navigation.navigate('VendorProfile',{item:this.state.vendorData})}}>
          <CardHome
          title="See Vendor Profile "
          info={item}
        />
      <View style={[styles.iconRow,{elevation:10,backgroundColor:Colors.bigcard,padding:5,borderRadius:10}]}>
      <Icon name="phone" backgroundcolor="green"  underlayColor="green" size={40} color="black" 
      onPress={this.onPressTel}/>
          <Icon
            name="email"
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
            onPress={this.onPressEmail}
          />
          
                
        
      </View>
     
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.loginBtn}
         onPress={() => {this.onOrder()}}
        >
          <Text style={styles.loginText}>APPOINT NOW</Text>
         
        </TouchableOpacity >
        
      </View>
      
    
    
  </TouchableOpacity>


          </Card>
        </View>}
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  loginText:{
  color:Colors.primary},
  loginBtn:{
    width:"90%",
    backgroundColor:Colors.secondary,
    borderRadius:15,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
    marginLeft:15,
    marginRight:15
  },
  buttons:{
    width:"100%",
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignContent:'space-between'
  

  },
  texts:{
    backgroundColor: Colors.primary,
    borderRadius:15,
    borderWidth: 2,
    borderColor:Colors.secondary,
    
  
    
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    
    fontSize: 40,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-between',
    marginLeft:20,
    marginRight:20,
   
    


  
  },
  emailContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 10,
    paddingTop: 45,
    margin:3,
    marginBottom:0
  },
  headerContainer: {
    width:'90%',
    margin:20,
    marginBottom:0,
    backgroundColor: Colors.smallcard,
    borderRadius:20,
    borderColor: Colors.secondaryBorder,
    borderWidth:1,
    elevation:10

  },
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    
    fontSize: 40,
  },
  scroll: {
    backgroundColor: Colors.primary,
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: Colors.secondary,
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})


export default Profile
