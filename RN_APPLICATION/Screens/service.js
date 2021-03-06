import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  FlatList,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";

import { Card, Icon, Button, Avatar } from "react-native-elements";
import { topServices } from "../dummydata/topServices";
import { Rating, AirbnbRating } from "react-native-elements";
import { BaseUrl } from "../Constants/baseUrl.js";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Voice from "@react-native-community/voice";
import Toast from "react-native-toast-message";
import { Colors } from "../Constants/Colors.js";
import { useIsFocused } from "@react-navigation/native";
import AuthGlobal from "../Context/store/AuthGlobal";
import { loginUser } from "../Context/actions/Auth.actions";
import logo from "../assets/profile.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../Context/actions/Auth.actions";
import messaging from "@react-native-firebase/messaging";
import { cos } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heading, Center, NativeBaseProvider } from "native-base";
import { icon } from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { borderWidth } from "styled-system";
import { Divider } from "react-native-elements";
import { set } from "react-native-reanimated";
const Service = ({ route }) => {
  const [result, setResult] = useState("");
  const [isLoading, setLoading2] = useState(false);
  const [modalVisible, setModalVisible] = useState();
  const context = useContext(AuthGlobal);
  const [password, setPassword] = useState("");
  const [Data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [venData, setVenData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState("0");

  //   const data1 =  useSelector((state)=>{

  //     return state.data
  // })
  const stopRecording = async () => {
    console.log("stop recording")
    try {
      await Voice.stop();
    } catch (error) {
      console.log("error raised", error);
      
    }
    setLoading2(false);

  };
  const startRecording = async () => {
    console.log("start recording")
    setLoading2(true)
   getSubCategory1()
   
  };
  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e);
  };
  const onSpeechEndHandler = (e) => {
    setLoading2(false);
    console.log("stop handler", e);
  };

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0];
    setResult(text);
    console.log("speech result handler", e);
  };
  const data2 = useSelector((state) => {
    return state.services;
  });
  const getSubCategory1=()=>{
    const sentence=result;
    const user={
      sentence

    }
    console.log("result", result);
    fetch(`${BaseUrl.wifi}/api/v1/SubCategory/getSubCategories/`,{
      method:"POST",
      body: JSON.stringify({
        sentence: result    }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
  }) .then((res) => res.json())
  .then((data) => {
    console.log("data is",data)
    navigation.navigate("SimiliarSubCategory", {
      item: data.similar_subCategories,
    });
    setLoading2(false)
  })
 
  .catch(error => {
      //console.error(error);
    });
  }

  const onSubmit = (item) => {
    // dispatch({type:"ADD_CATEGORY",payload:item})
    // storeData(item)
  };
  const getTopVendors = () => {
    fetch(`${BaseUrl.wifi}/api/v1/vendor/all`, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log("vendors data is ", data);
          setVenData(data);

          //const value=AsyncStorage.getItem('jwt')
          //console.log("token value is ",value)
        }
      })
      .catch((err) => {
        alert("incorrect details.Check your details again");
        console.log(err);
      });
  };
  const getCategory = () => {
    // setData(data1)
    fetch(`${BaseUrl.wifi}/api/v1/category/`, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          //dispatch({type:"ADD_DATA",payload:data})
          setData(data);
          // console.log("redux data is ",Data)
          setLoading("1");

          //const categoryNow = data;

          //storeCategories(categoryNow)
          //console.log("user data is ",data)

          //const value=AsyncStorage.getItem('jwt')
          //console.log("token value is ",value)
        }
      })
      .catch((err) => {
        alert("incorrect details.Check your details again");
        console.log(err);
      });
  };

  const getSubCategory = () => {
    fetch(`${BaseUrl.wifi}/api/v1/SubCategory/all`, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log("sub data is ", data);

          setSubData(data);

          //const categoryNow = data;

          //storeCategories(categoryNow)
          //console.log("user data is ",data)

          //const value=AsyncStorage.getItem('jwt')
          //console.log("token value is ",value)
        }
      })
      .catch((err) => {
        alert("incorrect details.Check your details again");
        console.log(err);
      });
  };
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("categoryId", value);
      console.log("saved user data");
    } catch (e) {
      console.log("sorry cant save");
    }
  };
  useEffect(() => {
   
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;


    const { info } = route.params;
    console.log("info is", JSON.stringify(info));
    if (info == "cancel") {
      console.log("setting");
      setModalVisible(!modalVisible);
    }

    // console.log("data 1 is ",data1)
    getCategory();
    getSubCategory();
    getTopVendors();

    return () => {
      console.log("returninggg");
      setModalVisible();
      setData([]);
      setSubData([]);
      setVenData([]);
     
        Voice.destroy().then(Voice.removeAllListeners);
     
    };
  }, [isFocused]);
  const WATER_IMAGE = require("../assets/profile.jpg");
  return (
    <ScrollView>
      {modalVisible == true ? (
        <View
          style={{ alignSelf: "center", backgroundColor: Colors.smallcard }}
        >
          <Text
            style={{
              color: Colors.secondary,
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Really sorry for inconvenience..
          </Text>
          <Text style={{ color: Colors.secondary }}>
            Vendor has rejected your offer .Please find other one.
          </Text>
        </View>
      ) : null}
      <View style={styles.textInputStyle}>
        <TextInput
          value={result}
          placeholder="Tell us what actually do you want"
          style={{ flex: 1 }}
          onChangeText={(text) => setResult(text)}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.secondary} />
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <Icon2 name="search" size={25} color={Colors.secondary} />
          </TouchableOpacity>
        )}
      </View>
     

     

      {loading == "0" ? (
        <View style={{ alignSelf: "center", marginTop: "50%" }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.title}>CATEGORIES</Text>

            <Button
              type="clear"
              icon={<Icon name="code" color={Colors.secondary} />}
              buttonStyle={{
                borderRadius: 10,
                marginRight: 5,
                marginBottom: 2,
                padding: 1,
              }}
              title="VIEW ALL"
              titleStyle={{ color: Colors.secondary }}
            />
          </View>

          <Divider orientation="vertical" width={5} />
          <View style={styles.categories}>
            <FlatList
              data={Data}
              horizontal={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View>
                    <View
                      style={[
                        styles.cardBody,
                        {
                          backgroundColor: Colors.bigcard,
                          elevation: 10,
                          marginBottom: 10,
                          marginTop: 15,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.cardBodyIn,
                          { backgroundColor: Colors.bigcard, elevation: 10 },
                        ]}
                      >
                        <TouchableOpacity
                          style={[styles.card, { backgroundColor: item.color }]}
                          onPress={() => {
                            navigation.navigate("Services", {
                              categoryId: item.id,
                            });
                          }}
                        >
                          <Image
                            style={styles.cardImage}
                            source={{ uri: item.picture }}
                          />
                        </TouchableOpacity>

                        <View>
                          <Text
                            style={[
                              styles.title,
                              {
                                color: Colors.secondary,
                                alignSelf: "center",
                                marginTop: 22,
                                fontSize: 14,
                              },
                            ]}
                          >
                            {item.title}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
            <Divider orientation="vertical" width={5} />
            <View style={styles.heading}>
              <Text style={styles.title}>TOP SERVICES</Text>

              <Button
                type="clear"
                icon={<Icon name="code" color={Colors.secondary} />}
                buttonStyle={{
                  borderRadius: 10,
                  marginRight: 5,
                  marginBottom: 2,
                  padding: 1,
                }}
                title="VIEW ALL"
                titleStyle={{ color: Colors.secondary }}
              />
            </View>
            <Divider orientation="vertical" width={5} />
            <FlatList
              data={subData}
              horizontal={true}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ServicesByCategory", {
                        itemid: item.id,
                        info: "subCategory",
                      });
                    }}
                  >
                    <View>
                      <View
                        style={[
                          styles.cardBody2,
                          {
                            elevation: 10,
                            backgroundColor: Colors.bigcard,
                            marginBottom: 20,
                            marginRight: 13,
                          },
                        ]}
                      >
                        <Card>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Divider />

                          <Card.Image source={{ uri: item.picture }}>
                            <Button
                              buttonStyle={{ backgroundColor: "#f2f2f2" }}
                              icon={
                                <Icon name="code" color={Colors.secondary} />
                              }
                              containerStyle={{ elevation: 3 }}
                              title="Reviews"
                              titleStyle={{
                                color: Colors.secondary,
                                fontSize: 14,
                              }}
                            />
                            <View></View>
                          </Card.Image>
                        </Card>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <Divider orientation="vertical" width={5} />
            <Divider inset={true} insetType="middle" />
            <View style={styles.heading}>
              <Text style={styles.title}>TOP SERVICE PROVIDER</Text>

              <Button
                type="clear"
                icon={<Icon name="code" color={Colors.secondary} />}
                buttonStyle={{
                  borderRadius: 10,
                  marginRight: 5,
                  marginBottom: 2,
                  padding: 1,
                }}
                title="VIEW ALL"
                titleStyle={{ color: Colors.secondary }}
              />
            </View>
            <Divider orientation="vertical" width={5} />
            <FlatList
              data={venData}
              horizontal={true}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("VendorProfile", { item: item });
                    }}
                  >
                    <View>
                      <View style={styles.cardBodyRound2}>
                        <View
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
                        >
                          <Avatar
                            rounded
                            source={{ uri: item.image }}
                            size={"large"}
                          />
                        </View>
                        <Button
                          type="clear"
                          icon={<Icon name="person" color="grey" />}
                          buttonStyle={{
                            borderRadius: 10,
                            marginRight: 5,
                            marginBottom: 2,
                            padding: 1,
                          }}
                          title={item.userName}
                          titleStyle={{ color: "grey", fontSize: 10 }}
                        />
                        <Rating readonly imageSize={10} startingValue={5} />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.secondary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardBody: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 40,
    margin: 5,

    backgroundColor: "#E4E5E6",
  },
  cardBody2: {
    borderRadius: 50,
    margin: 5,

    backgroundColor: "#FAF9F6",
  },

  cardBodyRound: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 50,
    margin: 5,
    padding: 10,

    backgroundColor: "#E4E5E6",
  },
  cardBodyRound2: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 20,

    padding: 8,
    margin: 5,

    backgroundColor: "#f7f7f7",
  },
  cardBodyIn: {
    margin: 5,
    borderRadius: 5,

    backgroundColor: "white",
  },
  container: {
    justifyContent: "space-evenly",

    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,

    marginHorizontal: 40,
    backgroundColor: "#e2e2e2",
    //flexBasis: '42%',
    width: 20,
    height: 30,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  cardHeader: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: Colors.secondary,
  },
  cardImageRound: {
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 100,
    borderColor: Colors.secondary,
    borderWidth: 3,
  },
  title: {
    fontSize: 15,
    paddingLeft: 0,
    color: "grey",

    margin: 10,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: wp(100),
    height: hp(100),
    elevation: 10,

    backgroundColor: Colors.bigcard,
    borderColor: Colors.secondary,
    borderWidth: 4,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
export default Service;
