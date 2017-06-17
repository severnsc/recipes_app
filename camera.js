'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

export default class recipeCamera extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      product: [],
      productName: "",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={(data) => this.getProduct(data.data)}
        >
          <Text>{this.state.productName}</Text>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  getProduct(upc){
    const url = "https://api.upcdatabase.org/json/ce7255bdd76c9c67e48f28e6d56b0ed0/" + upc;
    fetch(url).then((res) => res.json()).then((resJSON) => {
      this.setState({
        product: resJSON,
        productName: resJSON.itemname,
      });
      Actions.productPage({productName: resJSON.itemname});
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});