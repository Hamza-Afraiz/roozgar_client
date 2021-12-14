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
    Dimensions,
    FlatList,ActivityIndicator
  } from 'react-native';
  import {topServices} from "../dummydata/topServices";
  import { withNavigationFocus } from "react-navigation";
  import AuthGlobal from "../Context/store/AuthGlobal";
  import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Divider } from 'react-native-elements';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import UserCard from "./usersCard";
import Icon2 from 'react-native-vector-icons/AntDesign';
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
 class SimiliarSubCategory extends React.Component {
 
  static contextType = AuthGlobal
    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this)
  this.state = {
    services: [],
    per: 9,
    page: 1,
    total_pages: null,
    categoryIdNew:'',
    index: 0,    search: '',
    loading:'0',subCategories:[],
    
  };
    }
    updateSearch = (search) => {
      this.setState({ search });
    };
    _renderItem({ item }) {
      return (
        <View style={styles.itemContainer}>
          <TouchableOpacity 
           onPress={() => {
          
            this.props.navigation.navigate('Profile',{item:item,vendorId:item.vendorId} );
          }}>

         
         <Card>
         <Image source={{uri: item.image}}
          style={{width: 200, height: 120,alignSelf:'center'}}  />
           <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={[styles.title, {color:item.color}]}>{this.uppercase(item.title) 
                      }</Text>
                      <Divider orientation="vertical" width={5} />
                      <Text style={{paddingLeft:10,paddingRight:10}}>
                      
                      
                      {item.description
                      }
                      </Text>
                      <Divider orientation="vertical" width={5} />
                      <View style={{alignItems:"center", justifyContent:"center",display:'flex',flexDirection: 'column'}}>
                     <View style={{display:'flex',flexDirection: 'row',margin:5}}>
                     <View>

                     <Text style={{backgroundColor:Colors.bigcard,elevation:3,marginLeft:25,padding:4}}>{"Rs:"+item.price }</Text>
                       </View>
                       <View style={{marginLeft:15}}>
                       <Icon name='book-online'
                              color={Colors.secondary} />
                       </View>
                     
                       <View style={{backgroundColor:Colors.bigcard,elevation:5,marginLeft:15,padding:4}}>
                                              <Text>3000 Bookings</Text>
                                             
                       </View>
                       </View> 
                      <Text>Availability 24/7</Text>
                      </View>
                      
                  </View>
         </Card>
          
       
         </TouchableOpacity>

        </View>
      );
    }
    
    
    componentDidMount() {
      console.log('loading is',this.state.loading);
     
      const id=this.props.route.params.item;
      console.log("garrrrdenerrr idddddddis",id);
      //console.log("services data from redux is",servicesData)
     // this.setState({categoryIdNew:id})
      this.getService();
      this.getSubCategoryById(id);
     
      
    //this.storage()
      
     
      
      }
      componentWillUnmount() {
       
        this.setState({ services : [] });
       
        
      }
      getCategories = () => {
        this.setState({ loading:'0'})
    
        console.log("fetchingggggggggggggg categories from ")
       
      fetch(`${BaseUrl.wifi}/api/v1/SubCategory/` ,{
      method: "GET",
      
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      })
      .then((res) => res.json())
      .then((data) => {
      if (data) {
        console.log("when we gett data from databse services are",data)
        this.setState({
          subCategories:data,
          loading:'1'
        })
          
         
          //storeServices(categoryNow)
          console.log("service data in gardener is ",data)
      
          //const value=AsyncStorage.getItem('jwt')
         //console.log("token value is ",value)
         
      
      }
      })
      .catch((err) => {
      alert("incorrect details.Check your details again .unable to send api")
      console.log(err)
      
      
      });
      };
      
    
       storage = async()=>{
         
         
      
       
        let contextDone=this.context;
        console.log("start")
        let categoryId = await AsyncStorage.getItem('categoryId');
        
        console.log("categories are ",categoryId)
        this.setState({
          id:categoryId
        });
        
      //  getService(this.state.id);
        let jsonValue = await AsyncStorage.getItem('services');
      
        console.log("services are ",jsonValue)
       
        let newjsonValue=jsonValue != null ? JSON.parse(jsonValue) : null;
       
        
       
       // console.log(newjsonValue.image)
        console.log('newjson value is ',newjsonValue)
        this.setState({ services: newjsonValue })
        console.log('services value is ',this.state.services)
       
        
       
       // console.log(newjsonValue.image)
        
       
       
  
      }
      
      
  
  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  getSubCategoryById = (id) => {
    
    console.log("fetchingggggggggggggg subCategirues from ",id)
    this.setState({
      subCategories:id
    })
   

};
   getServiceById = (id) => {
    
          console.log("fetchingggggggggggggg services from ",id)
         
    fetch(`${BaseUrl.wifi}/api/v1/service/?id=${id}` ,{
        method: "GET",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
          console.log("when we gett data from databse services are",data)
          this.setState({
            services:data
          })
          this.setState({loading:'1'})
            
           
            //storeServices(categoryNow)
            console.log("service data in gardener is ",data)
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           

        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again .unable to send api")
       console.log(err)
    
       
    });
};
getService = () => {
    
  console.log("fetchingggggggggggggg services from ",)
 
fetch(`${BaseUrl.wifi}/api/v1/service/` ,{
method: "GET",

headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
},
})
.then((res) => res.json())
.then((data) => {
if (data) {
  console.log("when we gett data from databse services are",data)
  this.setState({
    services:data,
    loading:'1'
  })
    
   
    //storeServices(categoryNow)
    console.log("service data in gardener is ",data)

    //const value=AsyncStorage.getItem('jwt')
   //console.log("token value is ",value)
   

}
})
.catch((err) => {
alert("incorrect details.Check your details again .unable to send api")
console.log(err)


});
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
        TOP SERVICES</Text>
        <View>
 <Icon name='beenhere'
                              color={Colors.secondary} />
        </View>
       
        
          
          
      
          </View>
          <Divider orientation="vertical" width={5} />
          
     
          <Divider orientation="vertical" width={5} />
          <Divider orientation="vertical" width={5} />
          <TouchableOpacity   onPress={() => {
          
          this.props.navigation.navigate('ServicesByCategory',{info:'all'});
        }}>

         
          <View style={[styles.heading,{display:'flex',flexDirection:'row',justifyContent:'flex-start'}]} >
               <Text style={{fontSize:15,
             paddingLeft:0,
                color:Colors.secondary,
                margin:10,
            fontWeight:'bold'}}>
        SEE ALL SERVICES</Text>
       
        <Icon2 name='arrowright'
            size={25}
            style={{alignSelf:'center'}}
                              color={Colors.secondary} />
            
         
        </View>

          
        </TouchableOpacity>
        <FlatList 
          
          data={this.state.subCategories}
          horizontal={true}
          keyExtractor={item => item.id.toString()}
        
          renderItem={({item}) => {
            return (
              <TouchableOpacity  onPress={() => {
          
                this.props.navigation.navigate('ServicesByCategory',{itemid:item.id,info:'subCategory'});
              }} >

             
              <View>
                <View  style={[styles.cardBody2,{elevation:10,backgroundColor:Colors.bigcard,marginBottom:20,marginRight:13}]}>
                
               
                <Card   > 
  <Card.Title>{item.title}</Card.Title>
  <Card.Divider/>
  
  <Card.Image   source={{uri:item.picture}}>
    
  <Button
            buttonStyle={{backgroundColor:'#f2f2f2'}}
            icon={<Icon name='code'
            color={Colors.secondary}
             />}
            containerStyle={{elevation:3}}
            title="Services"
            titleStyle={{color:Colors.secondary,fontSize:14}}
           />
      <View>
        
      </View>
  </Card.Image>
</Card>

                
                
              
                </View>
                </View>
                </TouchableOpacity>
                
                
             
              
            )
          }}/>
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
  export default connect(mapStateToProps)(SimiliarSubCategory)