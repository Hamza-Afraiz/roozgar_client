import React from "react";
import { Title, Header, Text, View, Button, Body, H1 } from "native-base";
import { TouchableOpacity, StatusBar ,Alert} from "react-native";
import SMSVerifyCode from "react-native-sms-verifycode";
import {Colors} from "../Constants/Colors.js";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { BaseUrl } from "../Constants/baseUrl.js";
const OTP = ({ route,navigation }) => {
  const [generatedOTP, setGeneratedOTP] = React.useState(
    Math.floor(1000 + Math.random() * 9000)
  );
  const [enteredOTP, setEnteredOTP] = React.useState();
 const {item}=route.params;
 const phone=item;
 console.log("phone is",phone);
 React.useEffect(() => {
   console.log("use EFFect")
  fetch(`${BaseUrl.wifi}/api/v1/client/sendOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: phone.substring(1),
      otp: generatedOTP,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}, [generatedOTP]);

const verifyOTP = () => {
  const {item,item1}=route.params;
  const user=item1;
  console.log("user data before going is",user);
  if (generatedOTP === parseInt(enteredOTP)) {
    fetch(`${BaseUrl.wifi}/api/v1/client/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const userNow = data;
        
           // storeCategories(userNow)
            console.log("User data is ",data)
            navigation.navigate('Signin')
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
          // logoutUser(dispatch)
           

        }
    })
    .catch((err) => {
       alert("incorrect details for signin.Check your details again")
       console.log(err)
    
        
    });
  } else {
    Alert.alert("Sorry", "The OTP you entered was invalid!");
  }
};
  return (
    <>
      <StatusBar backgroundColor={Colors.statusbar} />
      <Header style={{ backgroundColor: Colors.primary }}>
        <Body>
          <Title style={{ alignSelf: "center" }}>ROOZGAR</Title>
        </Body>
      </Header>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: Colors.secondary,
        }}
      >
        <H1 style={{ textAlign: "center", marginVertical: hp("2%") }}>
          Enter SMS Code
        </H1>
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFValue(15, 580),
            color: "white",
          }}
        >
          SMS Code was sent to: +92{phone.substring(1)}
        </Text>
        <View style={{ alignItems: "center" }}>
          <SMSVerifyCode
            containerPaddingHorizontal={30}
            verifyCodeLength={4}
            containerBackgroundColor={Colors.secondary}
            focusedCodeViewBorderColor="white"
            onInputChangeText={setEnteredOTP}
          />
        </View>
        <Button
          rounded
          success
          onPress={verifyOTP}
          style={{ alignSelf: "center", marginVertical: hp("2%") }}
        >
          <Text style={{ fontSize: RFValue(15, 580) }}>VERIFY!</Text>
        </Button>
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <Text>Didn't get code? </Text>
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold", color: Colors.primary }}>
              RESEND
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OTP;
