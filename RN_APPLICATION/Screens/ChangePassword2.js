import React from "react";
import { Container, Text, Grid, Col, View, Content } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BaseUrl } from "../Constants/baseUrl.js";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {Colors} from "../Constants/Colors.js";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../Context/store/AuthGlobal";
function ChangePassword2({ route,navigation }) {
  React.useEffect(() => {
    const {id,info}=route.params;
    console.log(id,info);
    var newdata="";
    if(info == 'forget'){
      console.log("if case");
      setInfo(info);
      setId(id)
       newdata=id;
    }
    else{
       newdata = context.stateUser.userProfile['user'].id;
       setId(newdata)
      console.log("new day ai s",newdata)
    }
  }, []);
  
  const context = React.useContext(AuthGlobal);
  
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const[Info,setInfo]= React.useState('');
  const[Id1,setId]= React.useState('')

  
  const changePassword = async () => {
    
    
    
    if ( !newPassword || !confirmNewPassword) {
      return Alert.alert("Error", "Please enter same p!");
    }
    
      if (newPassword.localeCompare(confirmNewPassword) === 0) {
        setIsLoading(true);
        console.log('Id1 is',Id1);
        fetch(`http://${BaseUrl.wifi}:3000/api/v1/client/changePassword2/?id=${Id1}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
         
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            setIsLoading(false);
            if (data.success) {
              Alert.alert("Success", data.success);
             // await AsyncStorage.setItem("token", data.token);
              navigation.navigate('Signin');
            } else if (data.error) {
              Alert.alert("Error", data.error);
            }
          })
          .catch((error) => {
            Alert.alert(
              "Error",
              "Looks like you aren't connected to the internet!"
            );
            setIsLoading(false);
          });
      } else {
        return Alert.alert("Error", "Entered passwords don't match!");
      }
   
  };

  if (isLoading) {
    return (
      <>
        <StatusBar backgroundColor={Colors.statusbar} />
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </>
    );
  }

  return (
    <Container>
      <StatusBar backgroundColor={Colors.statusbar} />
      <LinearGradient
        colors={["#00c13e", "#00c193"]}
        style={{ height: hp("7%") }}
      >
        <Grid>
          <Col style={{ width: "12%", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Icon
                name="arrow-left"
                size={25}
                color="#fff"
                style={{
                  marginTop: hp("2%"),
                }}
              />
            </TouchableOpacity>
          </Col>
          <Col style={{ width: "78%", alignItems: "center" }}>
            <Text
              style={{
                marginTop: hp("2%"),
                fontSize: RFValue(15, 580),
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              CHANGE PASSWORD
            </Text>
          </Col>
        </Grid>
      </LinearGradient>
      <ScrollView>
        <Content>
          <Grid>
            <Col style={{ width: "100%" }}>
            
              
              <Grid style={{ marginTop: hp("2.5%") }}>
                <Col style={{ paddingHorizontal: wp(3.4) }}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: "#000",
                      fontWeight: "bold",
                      marginLeft: wp("2%"),
                    }}
                  >
                    NEW PASSWORD
                  </Text>
                </Col>
              </Grid>
              <Grid style={{ marginTop: hp("0.5%") }}>
                <Col
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={styles.nametype}>
                    <TextInput
                      style={styles.textArea1}
                      value={newPassword}
                      onChangeText={setNewPassword}
                      placeholder="Enter your new password"
                      placeholderTextColor="grey"
                      secureTextEntry={true}
                    />
                  </View>
                </Col>
              </Grid>
              <Grid style={{ marginTop: hp("2.5%") }}>
                <Col style={{ paddingHorizontal: wp(3.4) }}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: "#000",
                      fontWeight: "bold",
                      marginLeft: wp("2%"),
                    }}
                  >
                    CONFIRM NEW PASSWORD
                  </Text>
                </Col>
              </Grid>
              <Grid style={{ marginTop: hp("0.5%") }}>
                <Col
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={styles.nametype}>
                    <TextInput
                      style={styles.textArea1}
                      value={confirmNewPassword}
                      onChangeText={setConfirmNewPassword}
                      placeholder="Re-enter your new password"
                      placeholderTextColor="grey"
                      secureTextEntry={true}
                    />
                  </View>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </Content>
      </ScrollView>
      <View
        style={{
          width: wp("100%"),
          height: hp("10%"),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          marginBottom: 0,
          bottom: 0,
          position: "absolute",
        }}
      >
        <TouchableOpacity onPress={changePassword}>
          <View
            style={{
              width: wp("90%"),
              alignItems: "center",
              paddingVertical: hp(1.5),
              borderRadius: 4,
              backgroundColor: Colors.secondary,
            }}
          >
            <Text
              style={{
                fontSize: RFValue(12, 580),
                paddingHorizontal: wp(3),
                color: "#fff",
              }}
            >
              Update
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    borderWidth: 4,
  },
  rect1: {
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: "#1D75D3",
  },
  nametype: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    flexDirection: "row",
  },
  textArea1: {
    width: "100%",
    height: 40,
    paddingLeft: wp("4%"),
    fontSize: RFValue(13, 580),
    justifyContent: "flex-start",
    borderColor: "lightgrey",
    color: "#000",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
});

export default ChangePassword2;
