import React from "react";
import {Colors} from "../Constants/Colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {connect} from 'react-redux'
import { Card, Icon ,Button,Avatar, SearchBar,Rating } from 'react-native-elements'
import { BaseUrl } from "../Constants/baseUrl.js";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    Dimensions,ActivityIndicator,
    FlatList,
  } from 'react-native';
  import { withNavigationFocus } from "react-navigation";
  import AuthGlobal from "../Context/store/AuthGlobal";
  import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Divider } from 'react-native-elements';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import UserCard from "./usersCard";
import { useIsFocused } from '@react-navigation/native';

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
 export default function(props) {
  const isFocused = useIsFocused();

  return <Allservices {...props} isFocused={isFocused} />;
}

 class Allservices extends React.Component {
 
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
    loading:'0'
    
  };
    }
   
     onLoadData=()=>{
      const id =this.props.route.params.item.id;
      
       console.log("fetching data from",id)
      fetch(`http://${BaseUrl.wifi}:3000/api/v1/service/vendorId?id=${id}` ,{
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
             services:data,
             loading:'1'
           })
            console.log("service data is ",data)
           
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           
  
        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again")
       console.log(err)
    
        
    });
    
     }
    updateSearch = (search) => {
      this.setState({ search });
    };
    
    
    componentDidMount() {
      let contextDone=this.context;
      this.onLoadData()
      //const someData = this.props.someData;
     // const servicesData=this.props.servicesData;
      //console.log("garrrrdenerrr is",someData);
      //console.log("services data from redux is",servicesData)
      //this.setState({categoryIdNew:someData})
     // this.getService(someData);
    //this.storage()
      
     
      
      }
      componentWillUnmount() {
       
        this.setState({ services : [] });
       
        
      }
      
      
  
  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
   

 
  render() {
    const { isFocused } = this.props;
 
    const id =this.props.route.params.item.id;
    console.log('id in rendr is',id)
    
    
  
    return (
       
           
       
        <View style={styles.container}>
           {(this.state.loading)=='0'?<View style={{alignSelf:'center',marginTop:'10%'}}>
       <ActivityIndicator size="large" color="#00ff00" />
      </View>:<View>
             
           <View style={styles.heading}>
          <Text style={{fontSize:15,
      paddingLeft:0,
      color:'grey',
      margin:10,
      fontWeight:'bold'}}>
        TOP SERVICES</Text>
        <View>
 <Icon name='beenhere'
                              color={Colors.secondary} />
        </View>
       
        
          
          
      
          </View>
          <Divider orientation="vertical" width={5} />
        
     
          <Divider orientation="vertical" width={5} />
          <Divider orientation="vertical" width={5} />
         
          <ScrollView 
          style={{padding:0,margin:0}}
          keyExtractor={({item, index}) => item.id.toString()}
          
          >
            
            
         
  {
    this.state.services.map((u, i) => {
      
      return (
        <TouchableOpacity key={u.id}>

        
        <View style={[styles.informationcard,{backgroundColor:'#FAF9F6',margin:3,borderWidth:1,borderColor:'#a6f1a6'}]}>
        <View key={i} style={styles.usercard}>
          <View>
            <View style={{elevation:2,backgroundColor:Colors.smallcard,borderRadius:10,margin:5}}>
            <Image
            style={styles.userImage}
            resizeMode="cover"
            source={{uri:u.image}}
          />
          
            </View>
         
           <View style={[styles.usercard,{justifyContent:'space-between',marginTop:20,margin:10,backgroundColor:'#f2f2f2',borderRadius:10,elevation:3}]}>
          <Icon name='phone'
                              color={Colors.secondary} />
                              <Icon name='sms'
                              color={Colors.secondary} />
                            
          </View>
          <Button
            buttonStyle={{backgroundColor:'#f2f2f2'}}
            icon={<Icon name='rate-review'
            color={Colors.secondary}
             />}
            containerStyle={{marginTop:10,marginLeft:3,marginRight:3,alignItems:'space-between',justifyContent:'space-between',elevation:3}}
            title="Reviews"
            titleStyle={{color:Colors.secondary,fontSize:14}}
            onPress={() => {
          
              this.props.navigation.navigate('Reviews',{item:u,info:'allServices'} );
            }}
           />
          </View>
         
          <View style={[styles.informationcard,{width:'75%'}]}>
          <View>
            <View style={[styles.usercard,{justifyContent:'space-between'}]}>
            <Text style={[styles.name,{width:'70%'}]}>{u.title}</Text>
            <Rating

         readonly
        imageSize={12}
        startingValue={5}
 
      />
            </View>
            <Divider orientation="vertical" width={5} />
         
          <Text >{u.vendorName}</Text>
         
         
          
          <Text style={[styles.textname,{minHeight:'40%'}]}>{u.description}</Text>
          <Text style={[styles.textname,{fontSize:15,color:'red',maxHeight:'20%',minHeight:'15%'}]}> Rs {u.price}</Text>
          <Divider orientation="vertical" width={5} />
          <View style={[styles.usercard,{justifyContent:'center',margin:10}]}>
           
        
                         
                           
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
          
</View>}
        
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
    backgroundColor:'#f2f2f2',borderRadius:10,padding:10,elevation:5
  },
  usercard:{
    display:'flex',
    flexDirection:'row',
  
    justifyContent:'center',
    margin:3,
    elevation:5
    
    
  },
  userImage:{
    height:75,
    width:75,
    borderRadius:50,margin:10
  },
  heading:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
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
  //export default Allservices