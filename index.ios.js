import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Camera from './camera';
import ProductPage from './productPage';

export default class RecipesApp extends Component {
  render(){
    return(
      <Router>
        <Scene key="root">
          <Scene key="camera" component={Camera} title="Camera" initial={true} />
          <Scene key="productPage" compnent={ProductPage} title="ProductPage" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('RecipesApp', () => RecipesApp);