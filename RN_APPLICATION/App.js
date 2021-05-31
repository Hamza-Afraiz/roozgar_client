
import React ,{useState}from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Gardener   from "./Screens/Gardener";
import  LoadingScreen from "./Screens/LoadingScreen";
import Profile   from "./Screens/Profile";
import {  Ionicons, AntDesign,FontAwesome5 } from "@expo/vector-icons";
import  Signin  from "./Screens/Signin";
import Signup from "./Screens/Signup";
import Auth from "./Context/store/Auth";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from './Constants/Colors';
import Service from "./Screens/service";
import Logout from './Screens/Logout'
import CustomSidebarMenu from './Screens/CustomSideBarMenu';
import Home from "./Screens/Home";
import Appoitment from "./Screens/appoitment";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducers/reducer'

const store  = createStore(reducer)
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App({navigation,routeName}) {
  
  return (
    <Provider store={store}>
    <Auth>
    <NavigationContainer>


   
      <Drawer.Navigator initialRouteName="Sign"
        drawerContentOptions={{
          activeTintColor: Colors.secondary,
          itemStyle: { marginVertical: 5 },
        }}
        
          
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
       >
         
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
        
        }}  name="Payments" component={ServicesNavigator} />
        <Drawer.Screen  options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
               name="cog"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        
        }}  name="Setting" component={ServicesNavigator} />
        <Drawer.Screen   options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
               name="person"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        
        }} name="Profile" component={ServicesNavigator} />
        <Drawer.Screen   options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
               name="time"
               size={size}
               color={focused ? '#7cc' : '#ccc'}
            />
         ),
        
        }} name="Appoitments" component={AppoitmentsNavigator} />

        
        <Drawer.Screen  
        options={{
          swipeEnabled: false,
          drawerLabel: () => null,
        
        }}
        enabled={false}
         name="Signup" component={SignupNavigator} />
      
      <Drawer.Screen  
        options={{
          swipeEnabled: false,
        
            
                drawerLabel: () => null,
            
        }
        }
         name="Sign" component={SignNavigator} />
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
      initialRouteName={"Home"}
      
    >
      <Stack.Screen
      
        name="Categories"
        component={Service}
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
