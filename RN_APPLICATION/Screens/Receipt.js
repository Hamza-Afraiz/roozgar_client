import React, {Component,useEffect,useContext} from 'react';
import {
  Container,
  Text,
  Left,
  Grid,
  Col,
  View,
  Body,
  Right,
  Button,
  Title,
  Content,
  Switch
  
} from 'native-base';
import { BaseUrl } from "../Constants/baseUrl.js";
import { Rating, AirbnbRating } from 'react-native-elements';
import {Colors} from "../Constants/Colors.js";
import Icon from 'react-native-vector-icons/MaterialIcons';
const DATA = [
    {
      id: '1',
      title: 'MY PROFILE',
      hospital:'Nishter Hospital'
    },
    {
      id: '2',
      title: 'SETTINGS',
      hospital:'Home Visit'
    },
    {
      id: '3',
      hospital: 'FAQS',
      title: 'FAQS'
    },
    {
      id: '4',
      hospital: 'TERMS & CONDITIONS',
      title: 'TERMS & CONDITIONS'
    },
    {
      id: '5',
      hospital: 'CONTACT US',
      title: 'CONTACT US'
    },
    {
      id: '6',
      hospital: 'LOGOUT',
      title: 'LOGOUT'
    },
   
  ];
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,FlatList,Modal,Pressable
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Textarea from 'react-native-textarea';
import AuthGlobal from "../Context/store/AuthGlobal";

 
function Receipt({route,navigation}) {
  const context = useContext(AuthGlobal);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [vendorId,setVendorId]=React.useState('');
    const [clientId,setClientId]=React.useState('');
    const [clientName,setClientName]=React.useState('');
    const [serviceId,setServiceId]=React.useState('');
    const [rating,setRating]=React.useState(0);
    const [textarea, setTextarea] = React.useState('');
    const [data,setData]=React.useState({});
    const [vendorName,setVendorName]=React.useState('');
    const [appoitmentId,setAppoitmentId]=React.useState('');
    
    
    const onChange  = (item) =>  {
        setTextarea(item);
  
    };
   
    useEffect(() => {
      
      let newdata = context.stateUser.userProfile['user'].userName;
      setClientName(newdata)
      console.log('client name from contedxt is ',newdata);
      const { item } = route.params;
    
      console.log("item is",JSON.stringify(item))
    
      
      console.log("item is",item);
      setVendorId(item.vendorId);
      setClientId(item.clientId);
      setServiceId(item.serviceId);
      setVendorName(item.vendorName);
      setAppoitmentId(item.id);
      setData(item);
        return () => {
          
        }
      }, [])
    const uploadReview=()=>{
      setModalVisible(!modalVisible);

      const review={
        vendorId,
        clientId,
        serviceId,
        textarea,
        rating,
        vendorName,
        clientName,
        appoitmentId

      };
      console.log('review before publishing is',review);
     
        
        fetch(`http://${BaseUrl.wifi}:3000/api/v1/review/`, {
            method: "POST",
            body: JSON.stringify(review),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
              
            
                
                console.log("review data is  ",data)
            
                //const value=AsyncStorage.getItem('jwt')
               //console.log("token value is ",value)
              // logoutUser(dispatch)
               
    
            }
        })
        .catch((err) => {
           alert("incorrect details.Check your details again")
           console.log(err)
        
            
        });
    };
    const ratingCompleted=(rating)=>{
      setRating(rating);

    }
    
  return (

    <Container>
        <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <AirbnbRating
  count={5}
  reviews={["Terrible", "Bad", "Best", "OK", "Excellent", "Needs Improvement", "Very Good", "Amazing", ]}
  defaultRating={1}
  size={wp(10)}
  onFinishRating={ratingCompleted}
/>
<Textarea
    containerStyle={styles.textareaContainer}
    style={styles.textarea}
    onChangeText={onChange}
    defaultValue={textarea}
    maxLength={120}
    placeholder={'Write your experience here'}
    placeholderTextColor={'black'}
    underlineColorAndroid={'transparent'}
  />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={uploadReview}
            >
              <Text style={styles.textStyle}>SUBMIT</Text>
            </Pressable>
            <Pressable
              style={[styles.button,{marginTop:hp(1),backgroundColor:'lightgrey'}]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </View>
      
        
          <LinearGradient
            colors={[Colors.secondary,Colors.secondary]}
            style={{height: hp('8%'),borderBottomRightRadius:40,alignSelf:'center',}}>
            <Grid>
              <Col style={{width: '100%', alignItems: 'center'}}>
                  <View style={{height:hp('8%'),display:'flex',flexDirection: 'row',width: '100%',justifyContent:'center'}}>
                 
                 <Text
                    style={{
                      color: 'white',
                      fontSize: RFValue(16, 580),
                     fontWeight:'700',
                      alignSelf:'center',
                      marginRight:wp(5)
                    }}> RECEIPT</Text>
            
               
                  </View>
                
                
             
               
               
              </Col>
            </Grid>
          </LinearGradient>
          
            
          <View style={{width:'100%', height:'100%',backgroundColor:Colors.smallcard,elevation:10,}}>
          <ScrollView>
              <View style={{width:'80%', height:'100%',backgroundColor:'#FFFFFF',alignSelf:'center',marginTop:hp(8),elevation:10,marginBottom:hp('10%')}}>
                  <View style={{width:'100%', height:hp('13%'),borderWidth:1,borderColor:'white',borderBottomColor:'lightgrey',display:'flex',flexDirection:'row'}}>
                    
                        <View style={{width:'50%',display:'flex',flexDirection: 'row',height:'70%',alignSelf:'flex-end',marginBottom:'4%',marginLeft:'2%',}}> 
                            
                        <Image
                     source={{uri: data.image}}
                  style={{
                    alignSelf: 'flex-start',
                    
                    height: hp('7%'),
                    width: wp('10%'),
                    borderRadius:10
                
                  }}
                />
                <View style={{marginLeft:wp(2),marginTop:hp(0.5)}}>   
                <Text
                    style={{
                      color: '#333132',
                      fontSize: RFPercentage(2),
                     fontWeight:'bold',
                     alignSelf:'center',
                     marginTop: hp('0%')
                     
                    }}> {data.vendorName}</Text>
                    <View style={{display:'flex',flexDirection: 'row',marginTop:'4%'}}>
                    <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(9, 580),
                   
                     height: hp('3'),
                     width:wp(18),
                     backgroundColor: Colors.secondary,
                     borderRadius:10,marginRight:wp(1),textAlign:'center',textAlignVertical:'center'
                     
                    }}> CashPay</Text>
                     <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(9, 580),
                    
                     height: hp('3'),
                     width:wp(18),
                     backgroundColor: Colors.secondary,
                     borderRadius:10,textAlign:'center',textAlignVertical:'center'
                     
                    }}> Discount</Text>

                    </View>

                </View>
                <View style={{marginTop:hp(0.5),width:wp(30)}}>   
                <Text
                    style={{
                      color: '#333132',
                      fontSize: RFPercentage(1.5),
                     fontWeight:'bold',
                     alignSelf:'center'
                     
                    }}>Rs{data.price}</Text>
                      <Text
                    style={{
                      color: 'lightgrey',
                      fontSize: RFValue(12, 580),
                     fontWeight:'bold',
                     textAlign:'center',
                     
                    }}> {data.completionTime} </Text>
                    

                  

                </View>
                
                        </View>
                        
                     

                  </View>
                  <Ionicons
                 name='menu'
                 size={wp(8)}
                 color='lightgrey'
                 style={{
                    alignSelf:'flex-start',
                    marginVertical: hp('0%'),
                  
                    marginLeft: wp('3%'),
                    marginTop:hp('0%'),
                    
                  }}
                />
                <View style={{display: 'flex',flexDirection: 'row',justifyContent:'space-between'}}>
                <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFValue(15, 580),
                     fontWeight:'bold',
                     marginLeft:wp(3)
                     
                    }}> Invoice </Text>
                <TouchableOpacity onPress={() => {navigation.navigate('Complaint',{item:data})}}>
                       <Text
                    style={{
                      color: 'white',
                      fontSize: RFPercentage(2),
                     fontWeight:'700',
                     marginRight:wp(5),
                     backgroundColor:Colors.secondary,
                     borderRadius:10,padding:wp(2),
                     
               
                     alignSelf:'flex-start',
                     
                  
                    }}> Complain Now</Text>
                       </TouchableOpacity>
                     
                </View>
                 
                    <View style={{marginVertical:hp(1)}}>
                        <Text style={{color: 'lightgrey',alignSelf:'center'}}>
                            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        </Text>
                    </View>
                    <Text
                    style={{
                      color: 'lightgrey',
                      fontSize: RFValue(12, 580),
                
                     marginLeft:wp(3),marginBottom:hp(0.5)
                     
                    }}> Service Name </Text>
                     <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginLeft:wp(3)
                     
                    }}> {data.serviceTitle} </Text>
                    <View style={{marginVertical:hp(1)}}>
                        <Text style={{color: 'lightgrey',alignSelf:'center'}}>
                            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        </Text>
                    </View>
                    <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFValue(12, 580),
                
                     marginLeft:wp(3),marginBottom:hp(0.5)
                     
                    }}> Description </Text>
                     <Text
                     numberOfLines={3}
                    style={{
                      color: '#333132',
                      fontSize: RFValue(13, 580),
                      
                     
                     marginLeft:wp(3)
                     
                    }}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                         <View style={{marginVertical:hp(1)}}>
                        <Text style={{color: 'lightgrey',alignSelf:'center'}}>
                            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        </Text>
                    </View>
                    <Text
                    style={{
                      color: 'lightgrey',
                      fontSize: RFValue(12, 580),
                
                     marginLeft:wp(3),marginBottom:hp(0.5)
                     
                    }}> TRIP FARE </Text>
                    <View style={{marginBottom:hp(1),display:'flex',flexDirection: 'row',justifyContent:'space-between',marginHorizontal:wp(1)}}>

                    <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginLeft:wp(2)
                     
                    }}> Cash Pay </Text>
                    <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginRight:wp(3)
                     
                    }}>Rs{data.price}</Text>
                   
                    </View>
                    <View style={{marginBottom:hp(1),display:'flex',flexDirection: 'row',justifyContent:'space-between',marginHorizontal:wp(1)}}>

                    <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginLeft:wp(2)
                     
                    }}> Discount </Text>
                    <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginRight:wp(3)
                     
                    }}>Rs 0.00</Text>
                   
                    </View>
                    <View style={{marginBottom:hp(1),display:'flex',flexDirection: 'row',justifyContent:'space-between',marginHorizontal:wp(1)}}>

                    <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginLeft:wp(2)
                     
                    }}> Paid Amount </Text>
                    <Text
                    style={{
                      color: '#333132',
                      fontSize: RFValue(14, 580),
                     
                     marginRight:wp(3)
                     
                    }}>Rs{data.price}</Text>
                   
                    </View>
                    <View style={{marginVertical:hp(0)}}>
                        <Text style={{color: 'lightgrey',alignSelf:'center'}}>
                            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        </Text>
                    </View>
                    <TouchableOpacity  onPress={() => setModalVisible(true)}>
            <View
              style={{
                width:'90%',
                height:hp(5),
                alignSelf:'center',
                marginVertical: hp(1),
                borderRadius: 5,
                backgroundColor: '#333132',
              }}>
              <Text
                style={{
                  fontSize: RFValue(17, 580),
                  
                  color: 'white',
                  height: hp(5),
                  textAlignVertical:'center',
                  alignSelf:'center'
                  
                  
                }}>
                Give Review
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {navigation.navigate('Home')}}>
            <View
              style={{
                width:'90%',
                height:hp(5),
                alignSelf:'center',
                marginVertical: hp(1),
                borderRadius: 5,
                backgroundColor: Colors.secondary,
              }}>
              <Text
                style={{
                  fontSize: RFValue(17, 580),
                  
                  color: '#333132',
                  height: hp(5),
                  textAlignVertical:'center',
                  alignSelf:'center'
                  
                  
                }}>
                        FINISHED
              </Text>
            </View>
          </TouchableOpacity>




              </View>
              <Text style={{color: '#FFB901',alignSelf:'center',fontWeight:'bold',fontSize: RFValue(12, 580),}}>
                  ____________________________
              </Text>
              </ScrollView>
          </View> 
          
         
          
        
      
    </Container>
  );
}

const styles = StyleSheet.create({
card:{
    height:hp('10%'),
    backgroundColor:'#fff3',
   
    width:wp('95%'),
    alignSelf:'center',
    display:'flex',flexDirection: 'row',
    justifyContent:'space-between',
    padding:hp('1%'),
    borderBottomColor:'lightgrey',borderWidth:1,borderColor:'white'


},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    width: wp('75%'),
    height: hp('6.5%'),
    backgroundColor: '#02C2EA',
    borderRadius: 30,
    padding: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
   

    
  },
  modalView: {
    width:wp(75),
    height:hp(60),
    elevation:10,

    backgroundColor: Colors.bigcard,
    borderColor: Colors.secondary,
    borderWidth:4,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.secondary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textarea: {
    textAlignVertical: 'top',
      // hack android
 
    
  },
  textareaContainer: {
      backgroundColor:Colors.smallcard,
      height:hp(18),marginVertical:hp(3),
      elevation:10,borderRadius:10,
      borderBottomColor:Colors.secondary,
      borderWidth:1,
      borderColor:'white'

    
  },

});

export default Receipt;
