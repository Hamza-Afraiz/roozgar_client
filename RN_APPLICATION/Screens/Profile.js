import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {  Ionicons, FontAwesome5,MaterialIcons,AntDesign} from "@expo/vector-icons";
import logo from '../assets/logoroozgaar.png';
import {Colors} from "../Constants/Colors.js";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage"
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
} from 'react-native'
 import { CardHome } from "./comp";
import {Email} from "../Components/Email";
import { ThemeProvider } from 'styled-components';
import color from 'color';

class Profile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {

   vendorid: '', 
   vendorData:{},
   userData:{}

   };
}
  componentDidMount() 
   {
    
    this.onLoad()
    this.onLoadData()
    this.storage()
    
    }
    componentWillUnmount() {
    
    }
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
    console.log('userData value is ',this.state.cat)

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
    const id =this.props.route.params.vendorId;
    
     console.log("fetching data")
    fetch(`http://192.168.0.111:3000/api/v1/vendor/?id=${id}` ,{
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
           vendorData:data
         })
          console.log("Vendor data is ",data)
          console.log("VendoData is ",this.state.vendorData)

      
          //const value=AsyncStorage.getItem('jwt')
         //console.log("token value is ",value)
         

      }
  })
  .catch((err) => {
     alert("incorrect details.Check your details again")
     console.log(err)
  
      
  });
  
   }
   onOrder=()=>{
    const item =this.props.route.params.item;
    const serviceId=item.id;
    const serviceTitle=item.title;
    const vendorId=this.state.vendorid;
    const clientId=this.state.userData.id;
    const vendorName=this.state.vendorData.userName;
    const price=item.price;
    const completionTime="2 hour";
    const image=this.state.vendorData.image;
    console.log("order data before going  is", serviceId,
    vendorId,
    clientId,
    price,
    completionTime ,  serviceTitle,  
    vendorName);
    const user = {
      serviceId,
      vendorId,
      clientId,
      price,
      completionTime,
      serviceTitle,  
      vendorName,
      image
      
    };
    

    
     console.log("fetching data")
     fetch('http://192.168.0.111:3000/api/v1/orders/', {
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
          source={{uri:this.state.vendorData.image}}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{uri: item.image}}
            />
      
            <View style={styles.userAddressRow}>
              <View>
               
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
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
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
          {this.renderHeader()}
          <TouchableOpacity >
          <CardHome
          title="Specialist in your area"
          info={item}
        />
      <View style={styles.iconRow}>
      <Icon name="phone" backgroundcolor="green"  underlayColor="green" size={40} color="black" 
      onPress={this.onPressTel}/>
          <Icon
            name="email"
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
            onPress={this.onPressEmail}
          />
           <Icon
                  name="place"
                 
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
                
        
      </View>
     
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.loginBtn}
         onPress={() => {this.props.navigation.navigate('Appoitments');this.onOrder()}}
        >
          <Text style={styles.loginText}>APPOINT NOW</Text>
         
        </TouchableOpacity >
        
      </View>
      
    
    
  </TouchableOpacity>


          </Card>
        </View>
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
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
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
