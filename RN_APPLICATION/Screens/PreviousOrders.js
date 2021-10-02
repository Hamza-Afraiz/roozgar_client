import React from "react";
import {Colors} from "../Constants/Colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {connect} from 'react-redux'
import { Card, Icon ,Button,Avatar, SearchBar,Rating } from 'react-native-elements'

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    Dimensions,
    FlatList,
  } from 'react-native';
  import { withNavigationFocus } from "react-navigation";
  import AuthGlobal from "../Context/store/AuthGlobal";
  import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Divider } from 'react-native-elements';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import UserCard from "./usersCard";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
import logo from '../assets/profile.jpg';
const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i)
}
const users = [
  {
     name: 'Brynn Alpado',
     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
  {
    name: '  Brynn Alpado',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },

 {
  name: 'Brynn Alpado',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
},

{
  name: 'Brynn Alpado',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
},

{
  name: 'Brynn Alpado',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
},

{
  name: 'Brynn Alpado',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
},


 ]
  
import { color, cond } from "react-native-reanimated";
import { useNavigation } from '@react-navigation/native';
import { marginRight } from "styled-system";
 class PreviousOrders extends React.Component {
 
  static contextType = AuthGlobal
    constructor(props) {
        super(props);
        
  this.state = {
    services: [],
    per: 9,
    page: 1,
    total_pages: null,
    categoryIdNew:'',
    index: 0,    search: '',
    
  };
    }
    updateSearch = (search) => {
      this.setState({ search });
    };
    
    
    componentDidMount() {
      //let contextDone=this.context;
      //const someData = this.props.someData;
     // const servicesData=this.props.servicesData;
     // console.log("garrrrdenerrr is",someData);
      //console.log("services data from redux is",servicesData)
      //this.setState({categoryIdNew:someData})
      //this.getService(someData);
    //this.storage()
      
     
      
      }
      componentWillUnmount() {
       
        this.setState({ services : [] });
       
        
      }
    
       
      
      
  
  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  

  

 
  render() {
    
 
    const { search } = this.state;
   
    
  
    return (
       
           
       
        <View style={styles.container}>
         
             
           <View style={styles.heading}>
          <Text style={{fontSize:15,
      paddingLeft:0,
      color:'grey',
      margin:10,
      fontWeight:'bold'}}>
        PREVIOUS RECORD</Text>
        <View>
 <Icon name='beenhere'
                              color={Colors.secondary} />
        </View>
       
        
          
          
      
          </View>
          <Divider orientation="vertical" width={5} />
          <View>
        
          <Divider orientation="vertical" width={5} />
        
        
      </View>
     
          <Divider orientation="vertical" width={5} />
          <Divider orientation="vertical" width={5} />
         
          <ScrollView 
          style={{padding:0,margin:0}}>
            
         
  {
    users.map((u, i) => {
      return (
        <TouchableOpacity
        onPress={() => {
          
          this.props.navigation.navigate('Complaint' );
        }}>

        
        <View style={[styles.informationcard,{backgroundColor:'#FAF9F6',margin:3,width:'100%'}]}>
        <View  style={styles.usercard}>
         
          <View style={[styles.informationcard,{width:'95%'}]}>
          <View>
            <View style={[styles.usercard]}>
            <Text style={[styles.name]}>{u.name}</Text>
            <Rating

         readonly
        imageSize={12}
        startingValue={5}
 
      />
            </View>
         
          <Text style={styles.textname}>BHARA KAHU,ISLAMABAD</Text>
          <Text style={styles.textname}>PLUMBER</Text>
          <Text style={styles.textname}>Cash Paid = Rs 1000</Text>
          <Text style={styles.textname}>10.12 PM 12 APRIL,2021</Text>
          <View style={[styles.usercard,{justifyContent:'space-between',margin:10}]}>
          <Icon name='share'
                              color={Colors.secondary}  size={30}/>
                            
                          
                                <Button
                                title='Complain Now'
                                titleStyle={{color:Colors.secondary}}
            buttonStyle={{backgroundColor:Colors.smallcard,elevation:5,}}
            icon={<Icon name='report-problem'
            color={Colors.secondary}
            size={30}
           

             />}/>
          </View>
          
          </View>
          </View>
         
          
         
        </View>
        </View>
        </TouchableOpacity>
        
      );
    })
  }
 




</ScrollView>
          
           
        
      </View>
     
    );
  }
}
const mapStateToProps = state => {
  return {
      someData: state.categoryId,
      //servicesData: state.services
  }
}

const styles = StyleSheet.create({
  name:{
    fontSize:15,
    fontWeight:'bold',
    fontFamily:'italic',

  },
  textname:{
    fontSize:10,
 
    fontFamily:'italic',

  },
  informationcard:{
    backgroundColor:'#f2f2f2',borderRadius:10,padding:10
  },
  usercard:{
    display:'flex',
    flexDirection:'row',
    alignContent:'space-between',
    justifyContent:'space-between',
    margin:3
    
    
  },
  userImage:{
    height:75,
    width:75,
    borderRadius:50,margin:10,
  },
  heading:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  overall:{
   display:'flex',
  flexDirection:'column',
  justifyContent:'space-around'

  },
    container:{
      flex:1,
      marginLeft:10,
      marginRight:10,
      backgroundColor:'#fff',
    
    },
    list: {
      
      backgroundColor:"#fff",
    },
    listContainer:{
      alignItems:'center',
      justifyContent:"space-between"
    },
    /******** card **************/
    card:{
        width:"95%",
      shadowColor: '#474747',
      shadowOffset: {
        width: 90,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
  
      elevation: 12,
     
      backgroundColor:'white',
      //flexBasis: '42%',
     
      
      alignItems:'center',
      justifyContent:'center'
    },
    cardHeader: {
      paddingVertical: 17,
      paddingHorizontal: 20,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardFooter:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    cardBody:{
      borderColor:'lightgrey',
      borderWidth:1,
     borderRadius:40,
     margin:5,
     width:"40%",
     
    
      backgroundColor:"#E4E5E6",
    },
    cardImage:{
      height: 100,
      width: 80,
      borderRadius:10,
      alignSelf:'center',
      alignItems:'center',
      justifyContent:'center'

    },
    title:{
      fontSize:15,
      fontFamily:'Helvetica',
      
      alignSelf:'center',
      fontWeight:'bold'
    },
    loginBtn:{
        width:"100%",
        backgroundColor:Colors.secondary,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
          color:Colors.primary,
          fontSize:20
      }, carouselContainer: {
    marginTop: 10,
  },
  itemContainer: {
    width: ITEM_WIDTH,
   //height: ITEM_HEIGHT,
  marginBottom:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a6f1a6',
  },
  });     
  export default PreviousOrders