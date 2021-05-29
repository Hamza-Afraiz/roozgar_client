


import React from 'react';
import { StyleSheet, Text, View, TextInput ,Image} from 'react-native';
import Wizard from './Wizard';
import Input from './Input';
import logo from '../assets/rglogo.png';
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
 
  render() {
    return (
      <View style={styles.root}>
        <Wizard
          initialValues={{
            
            email: '',
            image:''
            
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
});