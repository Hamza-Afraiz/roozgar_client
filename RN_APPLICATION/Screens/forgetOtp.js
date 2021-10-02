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
const ForgetOtp = ({ route,navigation }) => {
  const [generatedOTP, setGeneratedOTP] = React.useState(
    Math.floor(1000 + Math.random() * 9000)
  );
  const [Id,setId] = React.useState("");
  const [enteredOTP, setEnteredOTP] = React.useState();
  const {item,id}=route.params;
    const phone=item;
 React.useEffect(() => {
  
    setId(id)
    console.log("phone number is",phone);
    console.log("id is ",id)
  fetch(`http://${BaseUrl.wifi}:3000/api/v1/client/sendOTP`, {
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
 
  if (generatedOTP === parseInt(enteredOTP)) {
      console.log('id before sendin is ',Id)
    navigation.navigate("ChangePassword2",{info:'forget',id:Id})
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

export default ForgetOtp;
