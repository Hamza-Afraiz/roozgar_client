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
import {  CardHome} from "./comp2";
class Appoitment extends Component {
 
    constructor(props) {
      super(props);
      this.state = {
  
     
     appoitmentData:[],
     
  
     };
  }
    componentDidMount() 
     {
      
  
      this.onLoadData()
     
      
      }
      componentWillUnmount() {
      
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
   
     onLoadData=()=>{
     
      
       console.log("fetching data")
      fetch(`http://192.168.0.111:3000/api/v1/orders/` ,{
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
             appoitmentData:data
           })
            console.log("appoitment data is ",data)
            console.log("appoitmentDATAAA is ",this.state.vendorData)
  
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           
  
        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again")
       console.log(err)
    
        
    });
    
     }
     
    
    
  
    
  
    render() {
    
      return (
        <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.appoitmentData}
          horizontal={false}
          numColumns={1}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View>
                 <CardHome
          title="Specialist in your area"
          info={item}
        />
              </View>
            )
          }}/>
      </View>
        
      );
    }}
  
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
  
  
  export default Appoitment
  