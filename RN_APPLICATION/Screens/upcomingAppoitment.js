import React, {useState, useEffect} from 'react';
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
  Form,
} from 'native-base';
import Textarea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from "../Constants/Colors.js";
import Ionicons from 'react-native-vector-icons/Ionicons';

function  UpcomingAppoitment({navigation}) {
  React.useLayoutEffect(() => {
   
  }, [navigation]);

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [textarea, setTextarea] = useState('');
  const onChange  = (item) =>  {
      setTextarea(item);

  };
  return (
    <Container>
      <ScrollView>
        <Content>
          <Grid>
            <Col style={{width: '100%'}}>
              <Grid
                style={{
                  marginTop: hp('2%'),
                }}>
                <Col style={{width: '60%', paddingHorizontal: 20}}>
                  <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: RFValue(18, 580),
                      fontWeight: 'bold',
                    }}>
                    Emergency
                  </Text>
                </Col>
                <Col style={{width: '40%', paddingHorizontal: 20}}>
                  <Switch
                    trackColor={{false: 'lightgrey', true: '#31C855'}}
                    thumbColor={isEnabled ? 'white' : '#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </Col>
              </Grid>

              <Grid
                style={{
                  marginTop: hp(1),
                  borderWidth: 1,
                  paddingTop: hp(1),
                  paddingBottom: hp(1),
                }}>
                <Col style={{width: '20%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    MON
                  </Text>
                </Col>
                <Col style={{width: '20%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    TUE
                  </Text>
                </Col>
                <Col style={{width: '20%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    WED
                  </Text>
                </Col>
                <Col style={{width: '20%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    THU
                  </Text>
                </Col>
                <Col style={{width: '20%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: 'grey',
                      fontWeight: 'bold',
                    }}>
                    FRI
                  </Text>
                </Col>
              </Grid>
              <Grid style={{marginTop: hp(2)}}>
                <Col
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons size={28} color="#A1A8BB" name={'partly-sunny'} />
                </Col>
                <Col style={{width: '80%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: '#637180',
                      fontWeight: 'bold',
                    }}>
                    MORNING
                  </Text>
                </Col>
              </Grid>
              <Grid style={{marginTop: hp(2)}}>
                <Col style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingHorizontal: wp(3),
                    }}>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        09:30 AM
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        10:00 AM
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        10:30 AM
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        11:00 AM
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        11:30 AM
                      </Text>
                    </View>
                  </View>
                </Col>
              </Grid>
              {/*After noon*/}
              <Grid style={{marginTop: hp(2)}}>
                <Col
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons size={28} color="#A1A8BB" name={'ios-sunny'} />
                </Col>
                <Col style={{width: '80%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: '#637180',
                      fontWeight: 'bold',
                    }}>
                    AFTERNOON
                  </Text>
                </Col>
              </Grid>
              <Grid style={{marginTop: hp(2)}}>
                <Col style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingHorizontal: wp(3),
                    }}>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        02:00 PM
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        02:30 Pm
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        03:00 PM
                      </Text>
                    </View>
                  </View>
                </Col>
              </Grid>
              {/*Night*/}

              <Grid style={{marginTop: hp(2)}}>
                <Col
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons size={28} color="#A1A8BB" name={'moon'} />
                </Col>
                <Col style={{width: '80%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(13, 580),
                      color: '#637180',
                      fontWeight: 'bold',
                    }}>
                    Night
                  </Text>
                </Col>
              </Grid>
              <Grid style={{marginTop: hp(2)}}>
                <Col style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingHorizontal: wp(3),
                    }}>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        08:00 PM
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        08:30 PM
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        margin: 5,
                        backgroundColor: '#F7F7FA',
                        padding: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13, 580),
                          color: '#637180',
                          fontWeight: 'bold',
                        }}>
                        09:00 PM
                      </Text>
                    </View>
                  </View>
                </Col>
              </Grid>
              <Textarea
    containerStyle={styles.textareaContainer}
    style={styles.textarea}
    onChangeText={onChange}
    defaultValue={textarea}
    maxLength={120}
    placeholder={'Write your complete problem here in details'}
    placeholderTextColor={'black'}
    underlineColorAndroid={'transparent'}
  />

              {/*Button*/}

              <TouchableOpacity
               >
                <Grid style={{marginTop: hp(1)}}>
                  <Col style={{width: '100%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '90%',
                        padding: 10,
                        backgroundColor: Colors.secondary,
                        alignItems: 'center',
                        borderRadius: 6,
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(15, 580),
                          color: '#fff',
                        }}>
                        Save Appoitment
                      </Text>
                    </View>
                  </Col>
                </Grid>
              </TouchableOpacity>
            </Col>
          </Grid>
        </Content>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#02C2EA',
    padding: 12,
    borderRadius: 4,
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    margin: 10
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
    margin: 15
  },
});

export default UpcomingAppoitment;
