

import React ,{useState,useEffect}from 'react';
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
const CustomSidebarMenu = (props) => {
    const [userData,setUserData] = useState({"firstName":"ha,za"})
    const [profileImage,setProfileImage] = useState('https://besthqwallpapers.com/Uploads/16-3-2020/124945/thumb2-hamza-4k-wallpapers-with-names-horizontal-text-hamza-name.jpg')
    
  useEffect(() => {
    const storage = async()=>{
     
      let data = await AsyncStorage.getItem('userData');
      
      console.log("data is  ",data)
      
      let newjsonValue=data != null ? JSON.parse(data) : null;
      setUserData(newjsonValue)
      if(newjsonValue.image == ""){
          newjsonValue.image=profileImage
      }
      console.log("userData is ",newjsonValue)
     
     // console.log(newjsonValue.image)
      console.log('newjson value is ',newjsonValue)
      setProfileImage(newjsonValue.image)
    }
    storage()
  }, [props.navigation]);
   
 

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
    width: 150,
    height: 160,
    borderRadius: 100 ,
    alignSelf: 'center',
  },
  sideMenuProfileIcon2: {
    resizeMode: 'center',
    width: 200,
    height: 200,
    borderRadius: 100 / 2,
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
