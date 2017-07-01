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
import RNFetchBlob from 'react-native-fetch-blob';
import { NetworkInfo } from 'react-native-network-info';
import config from 'config';

const last = (array) => {
  return array[array.length - 1]
}

const ip = NetworkInfo.getIPAddress()

export default class recipeCamera extends Component {

  constructor(props){
    super(props);
    this.state = {
      barcode: null,
    }
    this.onFocusChange = this.onFocusChange.bind(this)
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
          captureTarget={Camera.constants.CaptureTarget.disk}
          onFocusChanged={() => this.onFocusChange}
          defaultOnFocusComponent={true}
          keepAwake={true}
        >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  onComponentWillMount(){

  }

  onFocusChange(){}

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((obj) => {
        this.uploadFile(obj.path)
      })
      .catch(err => console.error(err));
  }

  uploadFile(path) {
    const address = "http://" + ip + ":3000"
    RNFetchBlob.fetch('POST', address, {
      'Content-Type': 'application/octet-stream'
    }, RNFetchBlob.wrap(path))
      .then(res => res.json())
      .then((resJSON) => {
        console.log(resJSON.text)
        Actions.productPage({
          productName: '',
          description: resJSON.text
        })
      })
      .catch((err) => {
        console.log(err)
      })

      Actions.loadingPage()
  }

  getProduct(upc){
    if(this.state.barcode){
      return
    }else{
      this.setState({barcode: upc});
      const url = "https://api.upcdatabase.org/json/" + config.API_KEY + "/" + upc;
      fetch(url).then((res) => res.json()).then((resJSON) => {
        Actions.productPage({
          productName: resJSON.itemname,
          description: resJSON.description,
        });
      });
      setTimeout(() => {this.setState({barcode: null})}, 3000);
    }
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