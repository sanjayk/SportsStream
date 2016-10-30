'use strict'

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';


export default class SSSwipeButton extends Component {
  render() {
    return (
      <TouchableHighlight underlayColor={this.props.underlayColor} onPress={()=>{}}>
           <View style={this.props.buttonStyle}>
               <Icon name={this.props.iconName} size={this.props.iconSize}
                     color={this.props.iconColor} />
           </View>
       </TouchableHighlight>
     );
   }
};

SSSwipeButton.propTypes = {
  ...TouchableOpacity.propTypes,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  underlayColor: PropTypes.string,
  buttonStyle: PropTypes.object
};
