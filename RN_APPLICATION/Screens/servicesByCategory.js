import React from "react";
import {Colors} from "../Constants/Colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {connect} from 'react-redux'
import { Card, Icon ,Button,Avatar, SearchBar,Rating } from 'react-native-elements'
import { BaseUrl } from "../Constants/baseUrl.js";


import RangeSlider from 'rn-range-slider';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    Dimensions,ActivityIndicator,
    FlatList,Modal,Textarea,TextInput,Pressable
  } from 'react-native';
  import { withNavigationFocus } from "react-navigation";
  import AuthGlobal from "../Context/store/AuthGlobal";
  import Slider from '@react-native-community/slider';
  import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Divider } from 'react-native-elements';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import UserCard from "./usersCard";
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
import logo from '../assets/profile.jpg';
import { ViewBase } from "react-native";
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


 class ServicesByCategory extends React.Component {
 
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
    loading:'0',
    modal: false,priceFilter:'0',
    vendorNameFilter:'',
    rangeLow:'',rangeHigh:'',categoryId:''
    
  };
    }
    
   
     onLoadData=()=>{
        this.setState({
           
            loading:'0'
          })
      
      
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
    onLoadDataBySubCategory=()=>{
      const id =this.props.route.params.itemid;
      this.setState({categoryId:id})
      
       console.log("fetching data from subcategory",id)
      fetch(`${BaseUrl.wifi}/api/v1/service/subCategory?id=${id}` ,{
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
    
    componentDidMount() {
     const  {itemid,info}=this.props.route.params;
     console.log(info)
     if(info=='all'){
      this.onLoadData()
     }
     if(info=='subCategory'){
        this.onLoadDataBySubCategory()
     }
      let contextDone=this.context;
     
      //const someData = this.props.someData;
     // const servicesData=this.props.servicesData;
      //console.log("garrrrdenerrr is",someData);
      //console.log("services data from redux is",servicesData)
      //this.setState({categoryIdNew:someData})
     // this.getService(someData);
    //this.storage()
      
     
      
      }
      componentWillUnmount() {
       
      
       
        
      }
      
      
  
  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  updateSearch = (search) => {
    this.setState({ search });
  };
handleSearchThroughFilter=()=>{
   const arr=this.state.services;
   // const search=this.state.search;
  const rangeL=this.state.rangeLow;
  const rangeH=this.state.rangeHigh;
//const name=this.state.vendorNameFilter;
  const search = this.state.search;
  console.log("search is ",search);
  
  var newArray = arr.filter(function (el) {
    return (el.price <= rangeH && el.price >= rangeL )
     
  });
  
  console.log('res is',newArray);
  this.setState({
    services:newArray,
    modal: false
    
  })

}
handleSearch=()=>{
    const arr=this.state.services;
    // const search=this.state.search;
    const arr1 = [
     {a:'abc', b:'efg', c:'hij'},
     {a:'abc', b:'efg', c:'hij'},
     {a:'123', b:'456', c:'789'},
   ];
  
   const search = this.state.search;
   console.log("search is ",search);
   
   const res = arr.filter(obj => Object.values((obj)).some(val => JSON.stringify(val).toLowerCase().includes(search.toLowerCase())));
   
   console.log(res);
   this.setState({
     services:res
     
   })
 
 }
onVendorFilter=(item)=>{
this.setState({ vendorNameFilter:item})
}
handleFilter=()=>{
    console.log("handleFilter")
    this.setState({modal:true})
}
setLowPriceFilter=(value)=>{
    
     this.setState({ rangeLow: value});
   
}
setHighPriceFilter=(value)=>{
    
    this.setState({ rangeHigh: value});
  
}
 
  render() {
    
 
    
    const { search } = this.state;
    const {modal}=this.state;
    
  
    return (
       
         
        <View style={styles.container}>
            {((this.state.modal)==true)?
        <Modal
        animationType="slide"
      
        visible={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setState({modal:false});
        }}
      >
     
        
    <View style={{width:'90%', height:'50%',alignSelf:'center',marginTop:'50%'}}>
    
      <Text style={{alignSelf:'center',marginTop:'3%',fontSize:16,fontFamily:'Helvetica',fontWeight:'bold'}}>
          Select Your desired price
      </Text>
     
     <View style={{backgroundColor:Colors.smallcard,borderColor:Colors.secondary,borderWidth:1,borderRadius:10
    ,width:"75%",height:"20%",alignSelf:"center",marginTop:'3%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<View style={{backgroundColor:Colors.bigcard,borderColor:Colors.secondaryBorder,height:"95%",width:'30%',borderWidth:1,borderRadius:10,alignSelf:'center'}}>
<TextInput
   style={{alignSelf:"center",marginTop:'10%'}}
        //style={styles.input}
       onChangeText={this.setLowPriceFilter}
        value={this.state.rangeLow}
        placeholder="MINIMUM"
        keyboardType="numeric"
      />
      
</View>
<Text style={{alignSelf:"center",fontWeight:'bold',}}>to</Text>
<View style={{backgroundColor:Colors.bigcard,borderColor:Colors.secondaryBorder,height:"95%",width:'30%',borderWidth:1,borderRadius:10,alignSelf:'center'}}>
<TextInput
   style={{alignSelf:"center",marginTop:'10%'}}
        //style={styles.input}
       onChangeText={this.setHighPriceFilter}
        value={this.state.rangeHigh}
        placeholder="MAXIMUM"
        keyboardType="numeric"
      />
      
</View>
     </View>

  
    </View>
   <Pressable
      style={[styles.button,{height:"3%",marginBottom:"2%",backgroundColor:Colors.secondary}]}
      onPress={() => this.setState({modal:'0'})}
    >
      <Text style={[styles.textStyle,{fontSize:18,width:"15%",alignSelf:'center',fontWeight:'bold',color:'white'}]}>Cancel</Text>
    </Pressable>
    <Pressable
      style={[styles.button,{height:"3%",backgroundColor:Colors.secondary}]}
      onPress={() => this.handleSearchThroughFilter()}
    >
      <Text style={[styles.textStyle,{fontSize:18,alignSelf:'center',fontWeight:'bold',color:'white'}]}>Search Through Filter</Text>
    </Pressable>
</Modal>:<View style={{display:'flex',flexDirection:'row',justifyContent:'center',width:'100%'}}>
  
<Button
            buttonStyle={{backgroundColor:'#f2f2f2'}}
            icon={<Icon3 name='map-marker-radius'
            color={Colors.secondary}
            size={40}
             />}
            containerStyle={{marginTop:10,marginLeft:3,marginRight:3,marginBottom:10,alignItems:'space-between',justifyContent:'space-between',elevation:10}}
            title="Search In 15 KM"
            titleStyle={{color:Colors.secondary,fontSize:14}}
            onPress={() => {
          
              this.props.navigation.navigate('Maps' ,{id:this.state.categoryId});
            }}
           />
  </View>}
     
           
         <View style={{margin:1,padding:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <View style={{width:'80%',}}>
        <SearchBar
        placeholder="Search Here..."
        onChangeText={this.updateSearch}
        value={search}
       // lightTheme={true}
        round={true}
        inputStyle={{color:'grey',backgroundColor:'#E4E5E6'}}
        containerStyle={{backgroundColor:'white'}}
        inputContainerStyle={{backgroundColor:'#dceedc'}}
      />
        </View>
         
       <Icon2 name='search1'
       size={25}
       onPress={()=>{this.handleSearch()}}
       style={{width:'10%',}}
                              color={Colors.secondary} />

                              <Icon2 name='filter'
       size={25}
       onPress={()=>{this.handleFilter()}}
       style={{width:'10%',}}
                              color={Colors.secondary} />
          </View>
           {(this.state.loading)=='0'?<View style={{alignSelf:'center',marginTop:'10%'}}>
       <ActivityIndicator size="large" color="#00ff00" />
      </View>:<View>
      <TouchableOpacity onPress={()=>{this.onLoadData()}}
           
               >
                   
               <View style={[styles.heading,{display:'flex',flexDirection:'row',justifyContent:'flex-start'}]} >
               <Text style={{fontSize:15,
             paddingLeft:0,
                color:Colors.secondary,
                margin:10,
            fontWeight:'bold'}}>
        REMOVE FILTERS</Text>
       
        <Icon2 name='arrowright'
            size={25}
            style={{alignSelf:'center'}}
                              color={Colors.secondary} />
            
         
        </View>
      
        
         
          
      
         </TouchableOpacity>
         {(this.state.services.length)==0? <View style={{marginTop:'50%',marginBottom:'50%',alignSelf:'center'}}>
            <Text style={{color:Colors.secondary,fontSize:22,fontWeight:'bold',alignSelf:'center'}}>
              Really sorry for inconvenience..
            </Text>
            <Text style={{color:Colors.secondary}}>
              No Online services for this subcategory.
            </Text>
          </View>:null}
          <Divider orientation="vertical" width={5} />
        
     
          <Divider orientation="vertical" width={5} />
          <Divider orientation="vertical" width={5} />
         
          <ScrollView 
          style={{padding:0,margin:0,marginBottom:"30%"}}
          //keyExtractor={item => item.id.toString()}
          keyExtractor={({item, index}) => item.id}
          >
            
            
         
  {
   
    this.state.services.map((u, i) => 
   
    
    
    {
     
     
      return (
       
        <TouchableOpacity
          key={u.id}>
         

        
        <View style={[styles.informationcard,{backgroundColor:'#FAF9F6',margin:3,borderWidth:1,borderColor:'#a6f1a6'}]}>
        <View key={i} style={[styles.usercard,{}]}>
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
          
              this.props.navigation.navigate('Reviews',{item:u,info:'ServicesByCategory'} );
            }}
           />
          </View>
         
          <View style={[styles.informationcard,{width:'75%',height:'100%'}]}>
          <View>
            <View style={[styles.usercard,{justifyContent:'space-between',}]}>
            <Text style={[styles.name,{width:'70%'}]}>{u.title}</Text>
            <Rating

         readonly
        imageSize={12}
        startingValue={5}
 
      />
            </View>
            <Divider orientation="vertical" width={5} />
         
          <Text >{u.vendorName}</Text>
          
         
          
          <Text style={[styles.textname,{maxHeight:'40%',minHeight:'20%'}]}>{u.description}</Text>
          <Text style={[styles.textname,{fontSize:15,color:'red',maxHeight:'20%',minHeight:'15%'}]}> Rs {u.price}</Text>
          <Divider orientation="vertical" width={5} />
          <View style={[styles.usercard,{justifyContent:'center',margin:2,alignSelf:'center'}]}>
            <TouchableOpacity>
            <Button
            buttonStyle={{backgroundColor:'#FAF9F6'}}
            title="Book Now"
            titleStyle={{color:Colors.secondary}}
            onPress={() => {
          
              this.props.navigation.navigate('Profile',{item:u,vendorId:u.vendorId} );
            }}
           />
            </TouchableOpacity>
        
                         
                           
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
    fontSize:14,
 
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
  export default ServicesByCategory