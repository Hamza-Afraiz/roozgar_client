//Make Circular Image in React Native using Border Radius
//https://aboutreact.com/react-native-round-shape-image/

//import React in our code
import React from 'react';

//import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Image, Text } from 'react-native';

const About = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
          }}
          //borderRadius style will help us make the Round Shape Image
          style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
        />
        <Text style={styles.textHeadingStyle}>Our emergency plumbers provide the full range of Roto-Rooter services including toilet repair, unclogging drains, leak repair, water damage cleanup and restoration, and more. Roto-Rooter professionals are standing by to provide 24/7 plumbing services.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0dcdc',
  },
  textHeadingStyle: {
    marginTop: 30,
    fontSize: 40,
    color: '#0250a3',
    fontWeight: 'bold',
  },
});

export default About;
