


import React from 'react';
import { StyleSheet, Text, View, TextInput ,Image} from 'react-native';
import Wizard from './Wizard';
import Input from './Input';
import logo from '../assets/rglogo.png';
import {logoutUser} from '../Context/actions/Auth.actions';
import AuthGlobal from "../Context/store/AuthGlobal";
const forms = [
   
    {
        placeholder: 'Firstname here...',
        name: 'firstName',
      },
      {
        placeholder: 'lastName here...',
        name: 'lastName',
      },
  {
    placeholder: 'Username here...',
    name: 'userName',
  },
  {
    placeholder: 'Password  here...',
    name: 'password',
  },
 
  {
    placeholder: 'Email here...',
    name: 'email',
  },
  {
    placeholder: 'Phone number here...',
    name: 'phone',
  },
  {
    placeholder: 'City  here...',
    name: 'city',
  },
  {
    placeholder: 'Street number HERE...',
    name: 'streetNumber',
  },
  
  {
    placeholder: 'HOUSE NUMBER HERE...',
    name: 'houseNumber',
  },
  {
    placeholder: 'Cnic HERE...',
    name: 'cnic',
  },
 
];

export default class SignUp extends React.Component {
  static contextType = AuthGlobal
  componentDidMount() {
  //  let contextDone=this.context;
    //logoutUser(contextDone.dispatch)

  }
 
  render() {
    return (
      <View style={styles.root}>
        <Wizard
          initialValues={{
            
            email: '',
            image:'',
            userName:'',
            firstName:'',
            lastName:'',
            cnic:'',
            streetNumber:'',
            houseNumber:'',
            phone:' ',
            password:'',
            
          }}
        >
          {forms.map(el => (
            <Wizard.Step key={el.name}>
              {({ onChangeValue, values }) => (
                    
                <View style={styles.container}>
                    <Image
                    style={styles.userImage}
                     source={logo}
                   />
                 <Text style={styles.cardName}>Please Enter Your {el.name}</Text>
                  <Input
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder}
                    value={values[el.name]}
                    name={el.name}
                  />
                </View>
              )}
            </Wizard.Step>
          ))}
        </Wizard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  userImage: {

    height: 270,
    marginBottom: 15,
    width: 255,
  },
  cardName: {
    color: 'gray',
      fontSize: 15,
      fontWeight: '500',
      marginTop: 5,
      fontSize: 22,
  },
});