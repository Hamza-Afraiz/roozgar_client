import React, { PureComponent } from 'react';
import { TextInput, StyleSheet,View,Image } from 'react-native';
import {Colors} from "../Constants/Colors.js";

class Input extends PureComponent {
  _onChangeText = text => {
    this.props.onChangeValue(this.props.name, text);
  };

  render() {
    const { onChangeValue, name, ...rest } = this.props;
    return (
       
            
              <TextInput
        style={styles.root}
        {...rest}
        onChangeText={this._onChangeText}
      />
        
     
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.primary,
    width: '80%',
    height: 50,
    paddingHorizontal: 16,
    borderColor: Colors.secondary,
    borderRadius: 10,
    borderWidth: 2,
  },
  

});

export default Input;