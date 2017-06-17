import React, { Component } from 'react';
import{
  View,
  Stylesheet,
  Text
} from 'react-native';

const styles = Stylesheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  }
})

export default class ProductPage extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>
          {this.props.productName}
        </Text>
      </View>
    )
  }
}