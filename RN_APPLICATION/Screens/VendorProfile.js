import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Colors} from "../Constants/Colors.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Container,
  Left,
  Grid,
  Col,
  Body,
  Right,
  Button,
  Title,
  Content,
  Form,
} from 'native-base';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

function VendorProfile({route,navigation}) {
  const {item}=route.params;
  console.log("vendor data is ",item);
  return (
    <>
      <StatusBar backgroundColor="#0183A8" />
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.secondary,Colors.secondary2 ]}
          style={styles.linearGradient}>
          <View style={{width: wp('100%'), flexDirection: 'row'}}>
            <View
              style={{
                width: wp('40%'),
                paddingHorizontal: wp(2),
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={wp(6)} color="#fff" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: wp('60%'),
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="share-social-outline"
                  size={wp(5)}
                  color="#fff"
                  style={{
                    paddingHorizontal: wp(2),
                  }}
                />

                <Ionicons
                  name="heart-outline"
                  size={wp(5)}
                  color="#fff"
                  style={{
                    paddingHorizontal: wp(2),
                  }}
                />
                <Icon
                  name="phone"
                  size={wp(4.8)}
                  color="#fff"
                  style={{
                    paddingHorizontal: wp(2),
                  }}
                />
              </View>
            </View>
          </View>
          {/*Image*/}
          <View
            style={{width: wp('100%'), alignItems: 'center', marginTop: hp(2)}}>
            <Image
              source={{uri: item.image}}
              
              style={{
                width: wp('35%'),
                height: wp('35%'),
                borderRadius: 100,
                borderWidth:5,
                borderColor:'white',
                
                
                
              }}></Image>
          </View>
          {/*Title and subtitle*/}
          <View
            style={{width: wp('90%'), flexDirection: 'row', marginTop: hp(1)}}>
            <View style={{width: wp('60%'), paddingHorizontal: wp(2),marginLeft:wp('3%')}}>
              <View style={{width: wp('90%')}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: RFValue(16, 580),
                    fontWeight: 'bold'
                  }}>
                 {item.firstName} {item.lastName}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    top: 2,
                    fontSize: RFValue(10, 580),
                  }}>
                  {item.email}
                </Text>
              </View>
              {/*icons*/}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(1),
                }}>
                <Icon
                  name="home"
                  size={16}
                  color={Colors.secondary}
                  style={{
                    backgroundColor: '#EFF2FB',
                    width: '11%',
                    borderRadius: 50,
                    padding: hp('0.5%'),
                
                    textAlign: 'center',
                  }}
                />
                <Icon
                  name="camera"
                  size={12}
                  color={Colors.secondary}
                  style={{
                    backgroundColor: '#EFF2FB',
                    width: '12%',
                    borderRadius: 50,
                    padding: hp('0.8%'),
                    margin: 3,
                    textAlign: 'center',
                  }}
                />
                <Icon
                  name="h-square"
                  size={16}
                  color={Colors.secondary}
                  style={{
                    backgroundColor: '#EFF2FB',
                    width: '12%',
                    borderRadius: 50,
                    padding: hp('0.6%'),
                    
                    textAlign: 'center',
                  }}
                />
                <MaterialCommunityIcons
                  name="alarm-light-outline"
                  size={16}
                  color={Colors.secondary}
                  style={{
                    borderColor: '#E6385D',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    width: '12%',
                    borderRadius: 50,
                    padding: hp('0.5%'),
                    margin: 3,
                    textAlign: 'center',
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: wp('40%'),
                
                paddingHorizontal: wp(5),
             
                
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#FBCC00"
                  style={{
                    margin: wp(0.4),
                  }}
                />
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#FBCC00"
                  style={{
                    margin: wp(0.4),
                  }}
                />
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#FBCC00"
                  style={{
                    margin: wp(0.4),
                  }}
                />
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#FBCC00"
                  style={{
                    margin: wp(0.4),
                  }}
                />
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color="#fff"
                  style={{
                    margin: wp(0.4),
                  }}
                />
              </View>
              <TouchableOpacity  onPress={() => navigation.navigate('Reviews',{item:item,info:'vendorProfile'})}>
            <View style={{marginTop: hp(0.2)}}>

                <Text
                  style={{
                    color: '#fff',
                    paddingHorizontal: wp(0.8),
                    textDecorationLine: 'underline',
                    fontSize: RFValue(11, 580),
                  }}>
                  See all reviews
                </Text>
                
              </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => navigation.navigate('ALL SERVICES',{item:item})}>
            <View style={{marginTop: hp(0.2)}}>

                <Text
                  style={{
                    color: '#fff',
                    paddingHorizontal: wp(0.8),
                    textDecorationLine: 'underline',
                    fontSize: RFValue(11, 580),
                  }}>
                  See all services
                </Text>
                
              </View>
              </TouchableOpacity>
              
              <View>
                <View
                  style={{
                    marginTop: hp(1.8),
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 18,
                    paddingVertical: hp(0.5),
                    paddingHorizontal: wp(2),
                    alignContent: 'center',
                    backgroundColor: '#EFF2FB',
                  }}>
                  <Icon
                    name="money"
                    size={16}
                    color={Colors.secondary}
                    style={{paddingHorizontal: wp(1)}}
                  />
                  <Text
                    style={{
                      fontSize: RFValue(10, 580),
                      paddingLeft: wp(1),
                      textAlign: 'center',
                    }}>
                    RS 1000
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <ScrollView>
          <View style={styles.main}>
            <View
              style={{
                width: wp('100%'),
                marginTop: hp(1),
                paddingHorizontal: wp(2),
              }}>
              <Text
                style={{
                  fontSize: RFValue(14, 580),
                  color: 'black'
                }}>
                About Me
              </Text>
            </View>
            <View
              style={{
                width: wp('100%'),
                marginTop: hp(1),
                paddingHorizontal: wp(2),
              }}>
              <Text
              numberOfLines={8}
                style={{
                  fontSize: RFValue(11, 580),
                  textAlign: 'justify',
                  color: 'grey',
                  
                }}>
               {item.firstName} is a Consultant Cardiologist practicing at
                Heart And Medical Centre, Cantt, Lahore . She did MBBS from ,
                FCPS (Cardiology) from College of Physicians and Surgeons
                Pakistan . He has an 11 years of experience in this field.{'\n'}
                {'\n'}She has worked as Trainee Registrar at Army Cardiac
                Center, Lahore., Senior Registrar at National Hospital and
                Medical Center, Lahore. . He is currently working as
                Cardiologist at Heart And Medical Centre.
              </Text>
            </View>
            {/*space rect*/}
            <View style={{width: wp('100%'), marginVertical: hp(2)}}></View>
            <View style={{width: wp('96%'), height:hp('6%'),display:'flex',flexDirection: 'row',justifyContent:'space-between',marginHorizontal:wp('4%')}}>
              <View style={{width: wp('25%'),height:hp('5%'),justifyContent:'space-between'}}>
              <Text
                style={{
                  fontSize: RFValue(11, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                Degree:
              </Text>
              <Text
                style={{
                  fontSize: RFValue(11, 580),
                  color: 'grey'
                }}>
                MBBS
              </Text>       
              </View>
              <View style={{width: wp('30%'),height:hp('5%'),justifyContent:'space-between'}}>
              <Text
                style={{
                  fontSize: RFValue(11, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                 Post Graduation:
              </Text>
              <Text
                style={{
                  fontSize: RFValue(11, 580),
                  color: 'grey'
                }}>
                FCPS
              </Text>       
              </View>
              <View style={{width: wp('25%'),height:hp('5%'),justifyContent:'space-between'}}>
              <Text
                style={{
                  fontSize: RFValue(11, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                Experience:
              </Text>
              <Text
                style={{
                  fontSize: RFValue(11, 580),
                  color: 'grey'
                }}>
                10 years
              </Text>       
              </View>

            </View>
          </View>
          <View style={{width: wp('100%'), marginVertical: hp(2),marginHorizontal:wp('2%')}}>
          <Text
                style={{
                  fontSize: RFValue(11, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                Specialization:
              </Text> 
              <View style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap'}}>
              <View style={{width: wp('26%'),marginTop:hp(1),marginHorizontal:hp(1),backgroundColor:'lightgrey',height:hp('5%'),borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text
                style={{
                  fontSize: RFValue(10, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                PLUMBER
              </Text> 
                </View>
                <View style={{width: wp('26%'),marginTop:hp(1),marginHorizontal:hp(1),backgroundColor:'lightgrey',height:hp('5%'),borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text
                style={{
                  fontSize: RFValue(10, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                PIPE FITTING
              </Text> 
                </View>
                <View style={{width: wp('26%'),marginTop:hp(1),marginHorizontal:hp(1),backgroundColor:'lightgrey',height:hp('5%'),borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text
                style={{
                  fontSize: RFValue(10, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                PIPE BINDING
              </Text> 
                </View>
                <View style={{width: wp('26%'),marginTop:hp(1),marginHorizontal:hp(1),backgroundColor:'lightgrey',height:hp('5%'),borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text
                style={{
                  fontSize: RFValue(10, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                PIPES EXPERT
              </Text> 
                </View>
                <View style={{width: wp('26%'),marginTop:hp(1),marginHorizontal:hp(1),backgroundColor:'lightgrey',height:hp('5%'),borderRadius:50,justifyContent:'center',alignItems:'center'}}>
              <Text
                style={{
                  fontSize: RFValue(10, 580),
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                GAS FITTING
              </Text> 
                </View>
                
                
                 
              </View>
              
              
          </View>
        </ScrollView>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    width: wp('100%'),
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  linearGradient: {
    width: '100%',
    paddingTop: '3%',
    paddingBottom: '6%',
    backgroundColor: '#1D75D3',
  },
  searchBtn: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'row',
  },
  textArea: {
    width: '90%',
    height: hp(5.5),
    paddingLeft: wp(2),
    fontSize: RFValue(11, 580),
    justifyContent: 'flex-start',
    borderColor: 'lightgrey',
    color: '#000',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});

export default  VendorProfile;
