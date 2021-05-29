import React from "react";
import {Colors} from "../Constants/Colors.js";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
  } from 'react-native';
import { color } from "react-native-reanimated";
export default class Gardener extends React.Component {
    constructor(props) {
        super(props);
  this.state = {
    users: [],
    
  };
    }
  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  

  componentDidMount() {
    
  }

  render() {
    return (
       
           
       
        <View style={styles.container}>
           
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.users}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id.value;
          }}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity style={[styles.card, {backgroundColor:Colors.secondary}]} onPress={() => {
          
          this.props.navigation.navigate('Profile', {
            item
           
          });
        }}>
                  <Image style={styles.cardImage} source={{uri:item.picture.large}}/>
                
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={[styles.title, {color:item.color}]}>{this.uppercase(item.name.first) +
                      " " +
                      this.uppercase(item.name.last)}</Text>
                      <Text style={{paddingLeft:10,paddingRight:10}}>
                      {item.location.city +
                      ", " +
                      this.uppercase(item.location.state)}
                      </Text>
                      <Text>{item.phone}</Text>
                  </View>
                </View>
              </View>
            )
          }}/>
<TouchableOpacity style={styles.loginBtn}
         onPress={this.loadData}
        >
          <Text style={styles.loginText}>Load More</Text>
         
        </TouchableOpacity>
      </View>
     
    );
  }
}


const styles = StyleSheet.create({
    container:{
      flex:1,
      marginLeft:10,
      marginRight:10,
      backgroundColor:'#fff',
    },
    list: {
      paddingHorizontal: 10,
      backgroundColor:"#fff",
    },
    listContainer:{
      alignItems:'center',
      justifyContent:"space-between"
    },
    /******** card **************/
    card:{
        width:"90%",
      shadowColor: '#474747',
      shadowOffset: {
        width: 90,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
  
      elevation: 12,
      marginVertical: 20,
      marginHorizontal: 40,
      backgroundColor:"#e2e2e2",
      //flexBasis: '42%',
      width:120,
      height:120,
      borderRadius:60,
      alignItems:'center',
      justifyContent:'center'
    },
    cardHeader: {
      paddingVertical: 17,
      paddingHorizontal: 20,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      alignItems:"center", 
      justifyContent:"center"
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardFooter:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    cardImage:{
      height: 100,
      width: 100,
      borderRadius:10,
      alignSelf:'center'
    },
    title:{
      fontSize:20,
      
      alignSelf:'center',
      fontWeight:'bold'
    },
    loginBtn:{
        width:"100%",
        backgroundColor:Colors.secondary,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
          color:Colors.primary,
          fontSize:20
      }
  });     