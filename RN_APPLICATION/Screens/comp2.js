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
export const CardHome = ({title, info, noHeader, noFooter, book}) => {
    return (
      <View style={styles.cardContainer}>
        {!noHeader && (
          <View style={styles.cardHeaderContaner}>
            <Text style={styles.cardHeading}>{title}</Text>
            <Text style={styles.cardMore}>See All</Text>
          </View>
        )}
        <View style={styles.cardBody}>
          <View style={styles.cardBodyTop}>
            <Image
              style={styles.cardAvatar}
              source={{
                uri:
                  info.image,
              }}
            />
            <View style={styles.cardLeftSide}>
              <Text style={styles.tag}>Have a nice Service!</Text>
              <Text style={styles.cardAddress}>{info.vendorName}</Text>
              <Text style={styles.cardName}>{info.title}</Text>
              <Text style={styles.cardTime}>{info.serviceTitle}</Text>
              <Text style={styles.cardAddress}>Completion Time {" ",info.completionTime}</Text>
              <Text style={styles.cardAddress}>RS {" ",info.price}</Text>
              {info.rating && <Rating  />}
              <View style={styles.iconMore}>
                <FontAwesome5 name="angle-right" color="gray" />
              </View>
              {info.islike && (
                <View style={styles.iconLike}>
                  <AntDesign name="heart" color="#E8008D" size={22} />
                </View>
              )}
              {book && (
                <View style={styles.buttonBooks}>
                  <TouchableOpacity>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.btnGradient}
                      colors={['#554383', '#943F86']}>
                      <Text style={styles.btnBookText}>Book Visit</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {!noFooter && <View style={styles.margin} />}
  
          {!noFooter && (
            <View style={styles.cardBodyBottom}>
              <View style={styles.cardGroupIcon}>
                <AntDesign name="checkcircleo" size={32} />
                <Text style={styles.cardBottomTitle}>Appoint Now</Text>
              </View>
              <View style={styles.cardGroupIcon}>
                <AntDesign name="closecircleo" size={32} />
                <Text style={styles.cardBottomTitle}>Cancle</Text>
              </View>
             
             
            </View>
          )}
        </View>
      </View>
    );
  };
  const Rating = ({rating}) => {
    return (
      <View style={styles.rating}>
        {Array(5)
          .fill(0)
          .map((_, i) => {
            if (rating > i) {
              return (
                <AntDesign name="star" color="#FA8D00" style={{marginRight: 5}} />
              );
            }
            return <AntDesign name="staro" style={{marginRight: 5}} />;
          })}
      </View>
    );
  };
  const styles = StyleSheet.create({
    rating: {
      flexDirection: 'row',
      marginTop: 5,
    },
    tag: {
      color: '#B066A4',
    },
    cardContainer: {
      padding: 15,
      paddingBottom: 0,
    },
    margin: {
      height: 1,
      backgroundColor: '#F0F1F2',
      width: '100%',
      marginVertical: 10,
    },
    cardBodyBottom: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardBottomTitle: {
      fontSize: 14,
      marginTop: 5,
    },
    cardGroupIcon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconMore: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    iconLike: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    cardBody: {
      padding: 15,
      backgroundColor: '#fff',
      marginTop: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    cardBodyTop: {
      flexDirection: 'row',
    },
    cardLeftSide: {
      paddingHorizontal: 10,
      flex: 1,
    },
    cardName: {
      color: '#222',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardTime: {
      color: '#222',
      fontSize: 16,
      fontWeight: '500',
      marginTop: 5,
    },
    cardAddress: {
      color: 'gray',
      fontSize: 15,
      fontWeight: '500',
      marginTop: 5,
    },
    cardAvatar: {
      height: 60,
      width: 60,
      backgroundColor: 'gray',
      borderRadius: 60,
    },
    cardHeaderContaner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardHeading: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    cardMore: {
      fontWeight: 'bold',
      color: '#7B6C95',
    },
    faceGroup: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    faceContainer: {
      backgroundColor: '#fff',
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 20,
      marginHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      marginTop: 20,
    },
    faceText: {
      fontSize: 16,
      marginTop: 6,
    },
  
    container: {
      flex: 1,
    },
    headerContainer: {
      padding: 20,
      paddingHorizontal: 30,
      marginTop: 52,
    },
    heading: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
    },
    desc: {
      fontSize: 20,
      fontWeight: '400',
      color: '#fff',
      marginTop: 5,
    },
    buttonBooks: {
      flexDirection: 'row',
      marginTop: 20,
    },
    btnGradient: {
      padding: 10,
      borderRadius: 40,
    },
    btnBookText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
    },
  });