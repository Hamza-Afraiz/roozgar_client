import React from "react";
import {Colors} from "../Constants/Colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
  } from 'react-native';
  import { withNavigationFocus } from "react-navigation";
  import AuthGlobal from "../Context/store/AuthGlobal";
  import {getService} from "../Context/actions/Auth.actions";
import { color } from "react-native-reanimated";
import { useNavigation } from '@react-navigation/native';
export default class Gardener extends React.Component {
 
  static contextType = AuthGlobal
    constructor(props) {
        super(props);
  this.state = {
    services: [],
    per: 9,
    page: 1,
    total_pages: null,
    id:''
    
  };
    }
    
    
    componentDidMount() {
    this.storage()
      
     
      
      }
      componentWillUnmount() {
        this.setState({ services : [] });
        
      }
    
       storage = async()=>{
         
         
      
       
        let contextDone=this.context;
        console.log("start")
        let categoryId = await AsyncStorage.getItem('categoryId');
        
        console.log("categories are ",categoryId)
        this.setState({
          id:categoryId
        });
        
        getService(this.state.id,contextDone.dispatch);
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

  

 
  render() {
    
 
 
   
    
  
    return (
       
           
       
        <View style={styles.container}>
           
        <FlatList 
          data={this.state.services}
          horizontal={false}
          numColumns={1}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.overall}>
                <TouchableOpacity style={[styles.card, {backgroundColor:Colors.secondary}]} onPress={() => {
          
          this.props.navigation.navigate('Profile',{item:item,vendorId:item.vendorId} );
        }}>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                
                </TouchableOpacity>

                <View >
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={[styles.title, {color:item.color}]}>{this.uppercase(item.title) 
                      }</Text>
                      <Text style={{paddingLeft:10,paddingRight:10}}>
                      {item.description
                      }
                      </Text>
                      <Text>{"Rs:"+item.price }</Text>
                  </View>
                </View>
              </View>
            )
          }}/>

      </View>
     
    );
  }
}


const styles = StyleSheet.create({
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
     
      backgroundColor:"#e2e2e2",
      //flexBasis: '42%',
     
      borderRadius:60,
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
    cardImage:{
      height: 220,
      width: 260,
      borderRadius:10,
      alignSelf:'center',
      alignItems:'center',
      justifyContent:'center'

    },
    title:{
      fontSize:20,
      
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
      }
  });     