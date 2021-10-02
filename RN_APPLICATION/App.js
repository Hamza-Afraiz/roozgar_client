
import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View,Modal,Alert} from 'react-native';
import Gardener   from "./Screens/Gardener";
import  LoadingScreen from "./Screens/LoadingScreen";
import Profile   from "./Screens/Profile";
import {  Ionicons, AntDesign,FontAwesome5 } from "@expo/vector-icons";
import  Signin  from "./Screens/Signin";
import Signup from "./Screens/Signup";
import AllServices from "./Screens/allservices";
import Complaint from "./Screens/Complaint.js";
import Auth from "./Context/store/Auth";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from './Constants/Colors';
import Service from "./Screens/service";
import Logout from './Screens/Logout'
import Reviews from "./Screens/Reviews";
import MyAppoitments from "./Screens/MyAppoitments";
import messaging from '@react-native-firebase/messaging';
import GetComplaints from "./Screens/getComplaints";
import FAQs from "./Screens/Faqs";
import Time from "./Screens/time";
import CustomSidebarMenu from './Screens/CustomSideBarMenu';
import Home from "./Screens/Home";
import PreviousOrders from "./Screens/PreviousOrders";
import Appoitment from "./Screens/appoitment";
import VendorProfile from  "./Screens/VendorProfile";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducers/reducer'
import io from "socket.io-client";
import Map from "./Screens/map";
import Main from "./Screens/main";
import Service1 from "./Screens/Services1";
import Receipt from "./Screens/Receipt";
import Maps from "./Screens/maps";
import ServicesByCategory from "./Screens/servicesByCategory.js";
import Maps2 from "./Screens/maps2.js";
import { BaseUrl } from "./Constants/baseUrl.js";
import SignUp3 from "./Screens/signUp3.js";
import OTP from "./Screens/OTP.js";
import ForgetOtp from "./Screens/forgetOtp";
const store  = createStore(reducer)
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MyProfile from './Screens/MyProfile';
import ChangePassword from "./Screens/ChangePassword";
import ChangePassword2 from "./Screens/ChangePassword2";

import SendMessage from "./Screens/SendMessage";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export default function App({navigation,routeName}) {
  React.useEffect(() => {
    
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("remote",remoteMessage.data);
          fetch(`http://${BaseUrl.wifi}:3000/api/v1/ongoingOrder/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              vToken: remoteMessage.data.vendorToken,
              cToken: remoteMessage.data.clientToken,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console,log("data push is ",data)
            });
        }
      });
     
  }, []);
  
  return (
    <Provider store={store}>
    <Auth>
    <NavigationContainer>


   
      <Drawer.Navigator initialRouteName="Services"
        drawerContentOptions={{
          activeTintColor: Colors.secondary,
          itemStyle: { marginVertical: 5 },
        }}
        
          
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
       >
           <Drawer.Screen   options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
               name="person"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        
        }} name="My Profile" component={MyProfile} />
         
        <Drawer.Screen 
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
               name="hammer"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        
        }}  name="Services" component={ServicesNavigator} />
        
        <Drawer.Screen  options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
               name="card"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        
        }}  name="Set an appoitment" component={MyAppoitments} />
      
      
       

        
       
      
         
        
       
         <Drawer.Screen 
        options={{
          drawerIcon: ({focused, size}) => (
            <AntDesign
               name="logout"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        
        }}  name="Logout" component={LogoutNavigator} />
     
        
        
      

      
     
      </Drawer.Navigator>
    
  </NavigationContainer>
  </Auth>
</Provider>
  );
}
const ServicesNavigator = ({navigation}) => {
 
  
  return (
    
    <Stack.Navigator mode='modal'
      initialRouteName={"Signin"}
      
    >
        <Stack.Screen
      
      name="VendorProfile"
      component={VendorProfile}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerShown:false
                  
                
                       
              })
              }
      
    />
    <Stack.Screen
      
      name="OTP"
      component={OTP}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerShown:false
                  
                
                       
              })
              }
      
    />
    

    <Stack.Screen
      
      name="ChangePassword"
      component={ChangePassword}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                 headerShown:false
                  
                
                       
              })
              }
      

    />
     <Stack.Screen
      
      name="ChangePassword2"
      component={ChangePassword2}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                 headerShown:false
                  
                
                       
              })
              }
      
    />
     <Stack.Screen
      
      name="ForgetOtp"
      component={ForgetOtp}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerShown:false
                  
                
                       
              })
              }
      
    />
     <Stack.Screen
      
      name="SignUp3"
      component={SignUp3}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerShown:false
                  
                
                       
              })
              }
      
    />
     <Stack.Screen
      
      name="Maps"
      component={Maps}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                  
                
                       
              })
              }
      
    />
    <Stack.Screen
      
      name="SendMessage"
      component={SendMessage}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                  
                
                       
              })
              }
      
    />
    <Stack.Screen
      
      name="FAQs"
      component={FAQs}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                  
                
                       
              })
              }
      
    />
     <Stack.Screen
      
      name="Maps2"
      component={Maps2}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                  
                
                       
              })
              }
      
    />
   
    <Stack.Screen
      
      name="GetComplaints"
      component={GetComplaints}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerShown:false
                  
                
                       
              })
              }
      
    />
    
    
      <Stack.Screen
      
      name="Reviews"
      component={Reviews}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                  
                  
                
                       
              })
              }
      
    />
      <Stack.Screen
      
      name="map"
      component={Map}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                
                       
              })
              }
      
    />
    
    
     <Stack.Screen
      
      name="ServicesByCategory"
      component={ServicesByCategory}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                
                       
              })
              }
      
    />
       <Stack.Screen
      
      name="Receipt"
   
      component={Receipt}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerShown:false
                  
                
                       
              })
              }
      
    />
       <Stack.Screen
      
      name="ALL SERVICES"
      component={AllServices}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                
                       
              })
              }
      
    />
    <Stack.Screen
      
      name="APPOITMENTS"
      component={MyAppoitments}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerShown:false
                
                       
              })
              }
      
    />
    <Stack.Screen
      
      name="Complaint"
      component={Complaint}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                
                       
              })
              }
      
    />
     
    <Stack.Screen
      
      name="main"
      component={Main}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  
                
                       
              })
              }
      
    />
      <Stack.Screen
      
        name="Categories"
        component={Service}
        initialParams={{ info: 42 }}
       options={({ navigation }) => ({
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: Colors.secondary
                    },
                    headerLeft: () =>
                        <View style={{ paddingLeft: 10 }}>
                            <Ionicons
                                name="md-menu"
                                color="white"
                                size={32}
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </View>,
                         
                })
                }
        
      />
            <Stack.Screen
      
      name="Home"
      component={Home}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  swipeEnabled: false,
                  drawerLabel: () => null,
                  headerLeft: () =>
                      <View style={{ paddingLeft: 10 }}>
                          <Ionicons
                              name="md-menu"
                              color="white"
                              size={32}
                              onPress={() => navigation.toggleDrawer()}
                          />
                      </View>,
                       
              })
              }
      
    />
       <Stack.Screen
      
      name="Signin"
      component={Signin}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  swipeEnabled: false,
                  drawerLabel: () => null,
                
                       
              })
              }
      
    />
    
      <Stack.Screen
      
      name="Services"
      component={Gardener}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerLeft: () =>
                      <View style={{ paddingLeft: 10 }}>
                          <Ionicons
                              name="md-menu"
                              color="white"
                              size={32}
                              onPress={() => navigation.toggleDrawer()}
                          />
                      </View>,
                       
              })
              }
      
    />
        <Stack.Screen
      
      name="Signup"
      component={Signup}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  swipeEnabled: false,
                  drawerLabel: () => null,
                
                       
              })
              }
      
    />
    <Stack.Screen
    
      
      name="PreviousOrders"
      component={PreviousOrders}
     options={({ navigation }) => ({
                  headerTintColor: 'white',
                  headerStyle: {
                      backgroundColor: Colors.secondary
                  },
                  headerLeft: () =>
                      <View style={{ paddingLeft: 10 }}>
                          <Ionicons
                              name="md-menu"
                              color="white"
                              size={32}
                              onPress={() => navigation.toggleDrawer()}
                          />
                      </View>,
                       
              })
              }
      
    />
    <Stack.Screen
    
      
    name="Profile"
    component={Profile}
   options={({ navigation }) => ({
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: Colors.secondary
                },
                headerLeft: () =>
                    <View style={{ paddingLeft: 10 }}>
                        <Ionicons
                            name="md-menu"
                            color="white"
                            size={32}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    </View>,
                     
            })
            }
    
  />
     
      
    </Stack.Navigator>
    
  )

}
const LogoutNavigator = ({navigation}) => {
 
  
  return (
    
    <Stack.Navigator mode='modal'
      initialRouteName={"Logout"}
      
    >
      <Stack.Screen
      
        name="Logout"
        component={Logout}
       options={({ navigation }) => ({
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: Colors.secondary
                    },
                    
                  
                         
                })
                }
        
      />
     
      
    </Stack.Navigator>
    
  )
}
const SignNavigator = ({navigation}) => {
 
  
  return (
    
    <Stack.Navigator mode='modal'
      initialRouteName={"Signin"}
      
    >
      <Stack.Screen
      
        name="Signin"
        component={Signin}
       options={({ navigation }) => ({
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: Colors.secondary
                    },
                    
                  
                         
                })
                }
        
      />
     
      
    </Stack.Navigator>
    
  )
}
const TimeNavigator = ({navigation}) => {
 
  
  return (
    
    <Stack.Navigator mode='modal'
      initialRouteName={"Time"}
      
    >
      <Stack.Screen
      
        name="Set Up My Clinic"
        component={Time}
       options={({ navigation }) => ({
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: "#add8e6"
                    }, 
                    headerRight: () =>
                    <View style={{flexDirection:'row',marginRight:15}}>
                       <Text style={{color:'white',marginRight:10,marginTop:3,fontSize:20}}>Logout</Text>
                        <AntDesign
                            name="logout"
                            color="white"
                            size={32}
                            
                        />
                        
                    </View>
                    
                  
                         
                })
                }
        
      />
     
      
    </Stack.Navigator>
    
  )
}
const AppoitmentsNavigator = ({navigation}) => {
 
  
  return (
    
    <Stack.Navigator mode='modal'
      initialRouteName={"Appoitment"}
      
    >
      <Stack.Screen
      
        name="Appoitment"
        component={Appoitment}
       options={({ navigation }) => ({
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: Colors.secondary
                    },
                    
                  
                         
                })
                }
        
      />
       
     
      
    </Stack.Navigator>
    
  )
}

const SignupNavigator = ({navigation}) => {
 
  
  return (
    
    <Stack.Navigator mode='modal'
      initialRouteName={"Signup"}
      
    >
      <Stack.Screen
      
        name="Signup"
        component={Signup}
       options={({ navigation }) => ({
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: Colors.secondary
                    },
                    
                  
                         
                })
                }
        
      />
     
      
    </Stack.Navigator>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
