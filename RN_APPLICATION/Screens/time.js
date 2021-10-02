import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { Animated } from 'react-native';
import { TextInput } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function Time() {
    const [value,setValue]=useState(0);
    const [fromValue,setFromValue]=useState('');
    const [toValue,setToValue]=useState('');
  return (
    <View style={styles.container}>
        <View style={styles.day}>
           <Text style={styles.dayText}> 
               Monday</Text> 
        </View>
        <View>
            <Text
            style={{color:'#add8e6',fontSize:24,margin:10,fontWeight:'bold'}}>
                Appoitment Duration
            </Text>
        </View>
  <Slider
    style={{width: 200, height: 40,alignSelf:'center'}}
    minimumValue={0}
    maximumValue={120}
    minimumTrackTintColor="#add8e6"
    maximumTrackTintColor="#add8e6"
    onValueChange={value=>setValue(value)}
  />
  <View style={styles.text}>
  <Text style={{alignSelf:'center',color:'#add8e6',fontSize:20}}>{value}</Text>
  </View>
 
  <View style={styles.textInput}>
  <TextInput
  style={{alignSelf:'flex-start',width:80,borderColor:"#add8e6",borderWidth:2,borderRadius:15}}
      label="FROM"
      value={fromValue}
      onChangeText={fromValue => setFromValue(fromValue)}
      color='#add8e6'
    />
      <TextInput
      style={{alignSelf:'flex-end',width:80,borderColor:"#add8e6",borderWidth:2,borderRadius:15}}
      label="TO"
      value={toValue}
      onChangeText={toValue => setToValue(toValue)}
    />
 
   
</View>
<View style={styles.buttons}>
<TouchableOpacity
        style={styles.button}
        
      >
        <Text style={{color:'white'}}>Add Slots</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        
      >
        <Text style={{color:'white'}}>Save Now </Text>
      </TouchableOpacity>
</View>
<View style={styles.day}>
           <Text style={styles.dayText}> 
               Tuesday</Text> 
        </View>
        <View style={styles.day}>
           <Text style={styles.dayText}> 
               Wednesday</Text> 
        </View>
</View>
  );
}

const styles = StyleSheet.create({
    textInput:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:100,
        marginLeft:30,
        marginRight:30,
        maxWidth:wp('95%')
        
        
        
       
    },
    day:{
        height:50,
        margin:10,
        width:'95%',
        borderColor:'lightgrey',
        borderWidth:1,
        alignSelf:'center',
        maxWidth:wp('95%')


    },
    dayText:{
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10,
        paddingTop:10,
        fontSize:24,
        fontWeight:'bold'
    },
    buttons: {
        marginTop:60,
        justifyContent:'space-between',
        flexDirection:'row',
       // backgroundColor: "blue",
        padding: 10,
        maxWidth:wp('95%')
      },
      button: {
        
        backgroundColor: "#add8e6",
        color:'white',
        padding: 15,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#add8e6'

      },
  container: {
    
    flex:1,
    
    
    backgroundColor: '#eef1f6',
    
  },
  text:{
      width:100,
      height:50,
      borderColor:"#add8e6",
      borderWidth:1,
      borderRadius:8,
      padding:5,
      alignSelf:'center',
      paddingLeft:10,
      paddingRight:10,
      marginTop:15,


  }
});
