import React from 'react';
import {   StyleSheet,
  Navigator,
  PropTypes,
  View,
  Text,
  BackAndroid,
  ToolbarAndroid,
  Platform } from 'react-native';
import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';

//import Main from '../components/Main';
//import PostDetail from '../components/post/PostDetail';
import MainContainer from './MainContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this._isHomeScreen.bind(this);
  }

  _isHomeScreen() {
    //FIXME May not be a correct way to detect home screen...
    return Actions.currentRouter.currentRoute.title === 'Home';
  }

  render() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this._isHomeScreen()) {
          return false;
        };
        Actions.pop();
        return true;
    });
    const shouldHideToolbar = Platform.OS === 'ios' ? false : true;
    return (
      <Router hideNavBar={shouldHideToolbar}>
        <Route key="home" name="home" component={MainContainer} initial={true} wrapRouter={false} title="Home" navBar={ToolbarAndroid}/>
      </Router>
    )
  }
}

export default App;
