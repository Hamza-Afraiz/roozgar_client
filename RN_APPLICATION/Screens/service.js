import React  ,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text,Image, View,FlatList,TextInput,TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from "../Constants/Colors.js";
import { useIsFocused } from '@react-navigation/native';
import AuthGlobal from "../Context/store/AuthGlobal";
import { loginUser } from "../Context/actions/Auth.actions";
import logo from '../assets/rglogo.png';
import {useSelector,useDispatch} from 'react-redux'
import {getCategory} from "../Context/actions/Auth.actions";
import { cos } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"
const Service = () => {
  const context = useContext(AuthGlobal);
  const [password, setPassword] = useState("");
  const [Data, setData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch  = useDispatch();
  const navigation = useNavigation();
  const data1 =  useSelector((state)=>{

    
    return state.data
})



   const getCategory = (data1) => {
    setData(data1)
     fetch('http://192.168.0.111:3000/api/v1/category/', {
         method: "GET",
         
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
         },
     })
     .then((res) => res.json())
     .then((data) => {
         if (data) {
            dispatch({type:"ADD_DATA",payload:data})
            setData(data)
            console.log("redux data is ",Data)
           
             //const categoryNow = data;
             
             //storeCategories(categoryNow)
             //console.log("user data is ",data)
         
             //const value=AsyncStorage.getItem('jwt')
            //console.log("token value is ",value)
            
 
         }
     })
     .catch((err) => {
        alert("incorrect details.Check your details again")
        console.log(err)
     
        
     });
 };
 const onSubmit = (item) =>{
    storeData(item)
   
 };
 const storeData = async (value) => {
   try {
     
     await AsyncStorage.setItem('categoryId', value)
     console.log("saved user data")
   } catch (e) {
     console.log("sorry cant save")
   }
 };
 useEffect(() => {
     console.log("data 1 is ",data1)
    getCategory(data1)
 
   }, []);
 
    return (
        <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={Data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {navigation.navigate('Gardener'),{categoryId:item.id};onSubmit(item.id)}}>
                  <Image style={styles.cardImage} source={{uri:item.icon}}/>
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={[styles.title, {color:item.color}]}>{item.name}</Text>
                  </View>
                </View>
                
              </View>
              
            )
          }}/>
      </View>
    );
    
  }



  const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:40,
      backgroundColor:'#fff',
    },
    list: {
      paddingHorizontal: 5,
      backgroundColor:"#fff",
    },
    listContainer:{
      alignItems:'center'
    },
    /******** card **************/
    card:{
      shadowColor: '#474747',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
  
      elevation: 12,
      marginVertical: 20,
      marginHorizontal: 40,
      backgroundColor:"#e2e2e2",
      //flexBasis: '42%',
      width:120,
      height:120,
      borderRadius:60,
      alignItems:'center',
      justifyContent:'center'
    },
    cardHeader: {
      paddingVertical: 17,
      paddingHorizontal: 16,
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
      height: 130,
      width: 105,
      alignSelf:'center',
      borderRadius:20,
      borderColor:Colors.secondary
      
    },
    title:{
      fontSize:24,
      flex:1,
      alignSelf:'center',
      fontWeight:'bold'
    },
  });     
export default Service;