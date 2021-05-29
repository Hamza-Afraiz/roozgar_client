import React, { PureComponent,useContext } from 'react';
import { View, Button, StyleSheet,TouchableOpacity } from 'react-native';


class Step extends PureComponent {
     
  state = {};
  render() {
    
    return (
      <View style={styles.root}>
        {this.props.children({
          onChangeValue: this.props.onChangeValue,
          values: this.props.values,
        })}
        <View style={styles.buttonWrapper}>
          <Button
            title="Prev"
            color='#37B44E'
            disabled={this.props.currentIndex === 0}
            onPress={this.props.prevStep}
          />
          
          {this.props.isLast ? (
            <Button title="Upload a photo"  color='#37B44E' onPress={this.props.onSubmit} />
          ) : (
            <Button title="Next"  color='#37B44E' onPress={this.props.nextStep} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Step;
