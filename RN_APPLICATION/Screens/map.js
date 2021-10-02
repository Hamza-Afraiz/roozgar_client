import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions ,Image} from 'react-native';

export default function Map() {
  React.useEffect(()=>{
    getDistance(3.148561,101.652778,3.145771,101.655449)
  }
    
  );
  const markers= [{
    title: 'hello',
    coordinates: {
      latitude: 3.148561,
      longitude: 101.652778
    },
  },
  {
    title: 'hello1',
    coordinates: {
      latitude: 3.145771,
      longitude: 101.655449
    },  
  }];
  const getDistance=( LAT1, LONG1,  LAT2,  LONG2)=> {
   
   
   let distance = 2 * 6371000 * Math.asin(Math.sqrt(Math.pow((Math.sin((LAT2 * (3.14159 / 180) - LAT1 * (3.14159 / 180)) / 2)), 2) + Math.cos(LAT2 * (3.14159 / 180)) * Math.cos(LAT1 * (3.14159 / 180)) * Math.sin(Math.pow(((LONG2 * (3.14159 / 180) - LONG1 * (3.14159 / 180)) / 2), 2))));
  console.log("distacne is",distance);
   return distance;
};
 
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 3.148561,
        longitude: 101.652778,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
         <Marker
        
        title={"Parking Meter"}
    coordinate = {{latitude: 3.248561,
      longitude: 101.652778,}}
     description={"This is a location of your vendor"} />
      {markers.map(marker =>(
          <Marker
        key={marker.title}
        title={"Parking Meter"}
    coordinate = {marker.coordinates}
     description={"This is a location of your vendor"} >
     <Image source={require('../assets/profile.jpg')} style={{height: 55, width:55,borderRadius:30 }} />
   
    </Marker>
        )

        )}
       
    
   
   
         

     

   
          
      </MapView>
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});