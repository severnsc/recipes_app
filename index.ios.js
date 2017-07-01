import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import recipeCamera from './camera';
import ProductPage from './productPage';
import loadingPage from './loadingPage';
import receiptPage from './receiptPage';

export default class RecipesApp extends Component {
  render(){
    return(
      <Router>
        <Scene key="root">
          <Scene key="camera" component={recipeCamera} title="Camera" initial={true} />
          <Scene key="loadingPage" component={loadingPage} title="Loading" />
          <Scene key="productPage" component={ProductPage} title="ProductPage" />
          <Scene key="receiptPage" component={receiptPage} title="ReceiptPage" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('RecipesApp', () => RecipesApp);