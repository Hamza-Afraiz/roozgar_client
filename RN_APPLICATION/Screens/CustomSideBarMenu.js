

import React ,{useState,useEffect,useContext}from 'react';
import {
  
  View,
  StyleSheet,
  Image,
  Text,
  DrawerItems

} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import logo from '../assets/rglogo.png';
import AuthGlobal from "../Context/store/AuthGlobal";
const CustomSidebarMenu = (props) => {
    const context = useContext(AuthGlobal);
    const [userData,setUserData] = useState({"firstName":"sasa"})
    const [profileImage,setProfileImage] = useState('https://besthqwallpapers.com/Uploads/16-3-2020/124945/thumb2-hamza-4k-wallpapers-with-names-horizontal-text-hamza-name.jpg')
    
  useEffect(() => {
    const storage = async()=>{
       console.log(context.stateUser.userProfile) ;
       if(context.stateUser.isAuthenticated){
        let newdata = context.stateUser.userProfile['user'];
        setUserData(newdata);
        console.log("  new data is  ",newdata)
        setProfileImage(newdata.image)
       }
      
     

    }
    storage()
  }, [context.stateUser.isAuthenticated]);
   
 

  return (
    <View style={{ paddingTop:80,flex: 1 }}>
      {/*Top Large Image */}
      <Image
      
        source={{uri:profileImage }}
        style={styles.sideMenuProfileIcon}
      />
       <Text style={{ fontSize: 22, textAlign: 'center', color: '#37B44E' }}>
        {userData.firstName}
      </Text>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
       
        
      </DrawerContentScrollView>
      <Image
        source={logo}
        style={styles.sideMenuProfileIcon2}
      />
      <Text style={{ fontSize: 16, textAlign: 'center', color: '#37B44E' }}>
        www.Roozgar.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 130,
    height: 160,
    borderRadius: 200 ,
    alignSelf: 'center',
  },
  sideMenuProfileIcon2: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    borderRadius: 50,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
