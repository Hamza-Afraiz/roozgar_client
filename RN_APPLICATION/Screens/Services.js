import React, { useEffect,Component } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  BackHandler
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import {Colors} from "../Constants/Colors.js";
import AuthGlobal from "../Context/store/AuthGlobal";
import { Vendors_list } from "../dummydata/Vendors_list";
import {getCategory} from "../Context/actions/Auth.actions";
import {connect} from 'react-redux'

 class Services extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      cat: []
    };
  }
  static contextType = AuthGlobal
 /* backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
*/
  componentDidMount() {
    /*this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );*/
    const id=props.route.params.categoryId;
    getCategory();
    const someData = this.props.data;
    console.log("redux data ia",someData)
  
   
    let contextDone=this.context;
    
   
   /* const storage = async()=>{
      let jsonValue = await AsyncStorage.getItem('categories');
      
      console.log("categories are ",jsonValue)
     
      let newjsonValue=jsonValue != null ? JSON.parse(jsonValue) : null;
     
      
     
     // console.log(newjsonValue.image)
      console.log('newjson value is ',newjsonValue)
      this.setState({ cat: newjsonValue })
      console.log('cat value is ',this.state.cat)

    }
    storage()
    */
    }
  componentWillUnmount() {
   // this.backHandler.remove();
  }


  clickEventListener(item) {
    Alert.alert(item.title)
  }
  onSubmit(item){
     this.storeData(item)
    
  }
  storeData = async (value) => {
    try {
      
      await AsyncStorage.setItem('categoryId', value)
      console.log("saved user data")
    } catch (e) {
      console.log("sorry cant save")
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.cat}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {this.props.navigation.navigate('Services'),{categoryId:item.id};this.onSubmit(item.id)}}>
                  <Image style={styles.cardImage} source={{uri:item.icon}}/>
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={[styles.title, {color:item.color}]}>{item.name}</Text>
                  </View>
                </View>
                
              </View>
              
            )
          }}/>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
      someData: state.someData
  }
}
export default connect(mapStateToProps)(Services)
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:40,
    backgroundColor:'#fff',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#fff",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
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
    paddingHorizontal: 16,
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
    height: 130,
    width: 105,
    alignSelf:'center',
    borderRadius:20,
    borderColor:Colors.secondary
    
  },
  title:{
    fontSize:24,
    flex:1,
    alignSelf:'center',
    fontWeight:'bold'
  },
});     