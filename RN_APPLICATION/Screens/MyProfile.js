import React, {Component} from 'react';
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
} from 'native-base';
import {Colors} from "../Constants/Colors.js";
import Icon from 'react-native-vector-icons/MaterialIcons';
const DATA = [
    {
      id: '1',
      title: 'CHANGE PASSWORD',
      hospital:'Nishter Hospital'
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
  Image,FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function MyProfile({navigation}) {
  const navigationMethod =(item)=>{
    if(item.id == 1){
      navigation.navigate('ChangePassword');
    }
    if(item.id == 3){
      navigation.navigate('FAQs');
    }
    if(item.id == 6){
      navigation.navigate('Logout');
      
    }
    if(item.id == 5){
      navigation.navigate('SendMessage');
    
    }
  
  }
  return (
    <Container>
      
        
          <LinearGradient
            colors={[Colors.secondary,Colors.secondaryBorder]}
            style={{height: hp('15%')}}>
            <Grid>
              <Col style={{width: '100%', alignItems: 'center'}}>
                  <View style={{height:hp('8%'),display:'flex',flexDirection: 'row',width: '100%',justifyContent:'space-between'}}>
                
                <View style={{width:wp('20%'),display:'flex',flexDirection:'row',marginTop:hp('2%'),marginRight:hp('1%')}}>
                    <View style={{height:hp('3%')}}>
                  
                
                    </View>
               <View>
                 
               </View>
                

                </View>
               
                  </View>
                
                
              <View style={{ 
                    height: hp('13%'),
                    width: hp('12.8%'),
                    borderWidth: 3,
                    borderColor: 'white',
                    backgroundColor: '#fff2',
                    borderRadius: 100,
                    overflow:'visible'}}>
              <Image
                  source={require('../assets/profile.jpg')}
                  style={{
                  
                    height: hp('12%'),
                    width: hp('12%'),
                    borderWidth: 3,
                    borderColor: Colors.secondary,
                    borderRadius: 100,
                    overflow:'visible'
                  }}
                />
              </View>
               
               
              </Col>
            </Grid>
          </LinearGradient>
          <View style={{ marginTop:hp('5%')}}></View>
          <FlatList 
          
          data={DATA}
        //  onPress={navigationMethod}
          
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={()=>{navigationMethod(item)}}>

             
                
<View style={styles.card}>
          <Text
                    style={{
                      color: '#5c5c5c',
                      fontSize: RFValue(11, 480),
                     fontWeight:'700',
                      marginTop: hp('0%'),
                      alignSelf: 'center',
                      letterSpacing:0,
                      
                    }}> {item.title}</Text>

                     {((item.id)==6?null: <Icon
                 name='arrow-forward-ios'
                 size={25}
                 color='grey'
                 onPress={()=>{navigationMethod(item)}}
                 style={{
                   
                  
                  alignSelf:'center'
                  }}
                />) 
                  }

          </View>
               
                
          </TouchableOpacity>
                        
            )
          }}/>
          
         
          
        
      
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

});

export default MyProfile;
