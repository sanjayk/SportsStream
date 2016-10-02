'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
/*import {
  setSearchKeyword,
  runSearch,
  moreVideos,
  newSearch,
} from './actions'
import Search from './components/search'*/

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a test</Text>
      </View>
    )
  }
}

const stateToProps = (state) => {
  return {
    //search: state.search
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    /*setSearchKeyword,
    runSearch,
    moreVideos,
    newSearch,*/
  }, dispatch)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  scene: {
    flex: 1,
    paddingTop: 63,
  }
})

export default connect(stateToProps, dispatchToProps)(App)
