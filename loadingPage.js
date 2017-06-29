import React, { Component } from 'react';
import{
  View,
  StyleSheet,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    fontSize: 48,
  },
})

export default class loadingPage extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    )
  }
}