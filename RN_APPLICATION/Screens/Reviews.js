import React, {Component,useState,useCallback,useEffect} from 'react';
import { Rating, AirbnbRating } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import {
  Container,
  Text,
  Left,
  Grid,
  Col,
  View,
  Body,
  Right,
  Button,
  Title,
  Content,
} from 'native-base';

import { BaseUrl } from "../Constants/baseUrl.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressCircle from 'react-native-progress-circle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,FlatList,ActivityIndicator
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const DATA = [
    {
      id: '1',
      title: 'A****',
      letter:'A',
      color:"blue",
      Comment: 'I am properly informed about my health and care. I would have no qualms in recommending them to friendly and friends.'
    },
    {
      id: '2',
      title: 'O****',
      letter:'O',color:"red",
      Comment:'Great medical office, wonderful and warm experience from start to finish. Appreciate Dr. (Name) taking time to go over the diagnosis clearly and treatment options.'
    },
    {
      id: '3',
      hospital: 'Video Counsellation',
      title: 'S****',
      letter:'S',
      color:"lightgreen",
      Comment: 'I am properly informed about my health and care. I would have no qualms in recommending them to friendly and friends. Quite impreeseive technique and caliber of doctor .want to visit again'
    },
    {
      id: '4',
      hospital: 'Video Counsellation',
      title: 'L****',
      letter:'L',
      color:"blue",
      Comment:'Great medical office, wonderful and warm experience from start to finish. Appreciate Dr. (Name) taking time to go over the diagnosis clearly and treatment options.'
    },
    {
      id: '5',
      hospital: 'Video Counsellation',
      title: 'S****',
      letter:'S',
      color:"yellow",
      Comment:'Great medical office, wonderful and warm experience from start to finish. Appreciate Dr. (Name) taking time to go over the diagnosis clearly and treatment options.'
    },
    
  
  ];
function Reviews({route,navigation}) {
  const [reviewData,setReviewData]=React.useState([]);
  const [averageRating,setAverageRating]=React.useState(0);
  const [countReview,setCountReview]=React.useState(0);
  const {item,info} =route.params;
  const [loading, isLoading] = useState("0");
  
  useEffect(() => {
    var id1;
    if(info == 'vendorProfile'){
      id1=item.id;
      console.log('vendor from',id1)
    }
    if(info == 'allServices'){
      console.log();
      id1=item.vendorId.id;
      console.log('services boltay from',id1)
    }
    if(info =='ServicesByCategory'){
      console.log();
      id1=item.vendorId;
      console.log('servicesbycategry boltay from',id1)
    }
    fetch(`http://${BaseUrl.wifi}:3000/api/v1/review/?id=${id1}` ,{
        method: "GET",
        
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
          setReviewData(data);
          isLoading('1');
            console.log("review data from  ",item.id,"is",data)
            var count = 0, sumHeight = 0;
              for (var key in data) {
            if (data.hasOwnProperty(key)) {
            if (data[key].hasOwnProperty("rating")) {
             sumHeight += data[key].rating;
            count += 1;
   }

 }
          setAverageRating(sumHeight/count);
          setCountReview(count);
              
}
console.log("average rating is",sumHeight/count)
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
           

        }
    })
    .catch((err) => {
       alert("incorrect details.Check your details again .unable to send api")
       console.log(err)
    
       
    });
      
   /* fetch(`http://${BaseUrl.wifi}:3000/api/v1/review/` ,{
      method: "GET",
      
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
  })
  .then((res) => res.json())
  .then((data) => {
      if (data) {
          setData(data);
          setUpcomingData(data);
          console.log("review data is =",data);
      }
        
  })
  .catch((err) => {
     alert("incorrect details.Check your details again")
     console.log(err)
  
      
  });*/
  
  
   
  }, []);
 
    const [show,getShow]=useState(false);
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
    setTextShown(!textShown);
}

const onTextLayout = useCallback(e =>{
    setLengthMore(e.nativeEvent.lines.length >=3); //to check the text is more than 4 lines or not
     console.log(e.nativeEvent);
},[]);

  return (
    <Container>
      {(loading)=='0'?<View style={{alignSelf:'center',marginTop:'50%'}}>
       <ActivityIndicator size="large" color="#00ff00" />
      </View>:<View>

      
        
         <View style={styles.RatingCard}>
         <ProgressCircle
            percent={90}
            radius={50}
            borderWidth={4}
            color="#f1c40f"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{  fontSize: RFValue(25, 580), }}>{averageRating}</Text>
        </ProgressCircle>
             <View style={{backgroundColor:'#fff2',height:hp('10%'),marginHorizontal:wp('2%'),display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                
                 
                <Rating
                imageSize={20}
                readonly
            startingValue={averageRating}     

                            />
                            <Text
                    style={{
                      color: 'grey',
                      fontSize: RFValue(10, 580),
                     fontWeight:'700',
                      marginTop: hp('1%')
                    }}> {countReview} Review</Text>

             </View>
             </View> 
             
            
             <FlatList 
             style={{marginBottom:hp(20)}}
          
          data={reviewData}
          
          
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            console.log(item.clientName.substring(0,1))
            return (
                <View style={styles.commentcard}>
                <View style={styles.commentinfocard}> 
                <View style={{display:'flex',flexDirection:'row'}}>

                <View style={{marginHorizontal:wp('1%'),backgroundColor:'lightblue',height:hp('4%'),width:hp('4%'),borderRadius:20,justifyContent:'center',alignItems:'center',alignSelf:'flex-end'}}>
                <Avatar
  size="small"
  rounded
  title={item.clientName.substring(0,1)}
  onPress={() => console.log("Works!")}
  activeOpacity={0.5}
/>

                </View>
                <View>
                <Text
                   style={{
                     color: 'black',
                     fontSize: RFValue(12, 580),
                    fontWeight:'700',
                    marginBottom:hp('0.3%')
                   
                   }}> {item.clientName} </Text>
                    <Text
                   style={{
                     color: 'grey',
                     fontSize: RFValue(11, 680),
                    fontWeight:'700',
                     
                   }}> 2 minutes ago </Text>
                </View>
                </View >
                <View style={{marginRight:wp('4%')}}>
                <Rating
               imageSize={14}
               readonly
           startingValue={item.rating}     

                           />
                </View>
             

                </View>
                <View style={{marginHorizontal:wp('2%'),marginVertical:hp('1%')}}>
                 
                      
                <Text
                       onTextLayout={onTextLayout}
                       numberOfLines={textShown ? undefined : 3}
                       style={{
                         color: 'grey',
                         fontSize: RFValue(10, 580),
                        fontWeight:'600',
                       
                       }}> {item.description} </Text>
                        
                     
                         
                   
                    
                
                </View>
                
            </View>
                        
            )
          }}/>

          
</View>}
      
    </Container>
  );
}

const styles = StyleSheet.create({
    commentinfocard:{

        backgroundColor:'#fff2',
        height:hp('6%'),
        display:'flex',flexDirection:'row',
        justifyContent:'space-between',alignItems:'center'
    },
    commentcard: {
        marginVertical: hp('1%'),height:hp('15%'),backgroundColor:'#fff2',width:wp('90%'),alignSelf:'center',borderBottomColor:"lightgrey",borderWidth:1,borderColor:"#fff2",},
    RatingCard:{
        height: hp('15%'),backgroundColor:'white',width:wp('100%'),display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    width: wp('75%'),
    height: hp('6.5%'),
    backgroundColor: '#02C2EA',
    borderRadius: 30,
    padding: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width:wp('32%'),height:hp('15%'),marginHorizontal:wp('3%'),marginVertical:hp('2%'),borderWidth:0.7,borderColor:'#02C2EA',borderRadius:10,alignItems:'center'
  },
  bigcard:{
    marginTop:hp('12%'),backgroundColor:'white',
    width: wp('80%'),height:hp('40%'),marginHorizontal:wp('10%'),flexDirection:'row',flexWrap:"wrap"
  },
  appoitmentscard:{
    borderColor:'lightgrey',borderWidth:1
  }
});

export default Reviews;
