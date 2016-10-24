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

import Icon from 'react-native-vector-icons/FontAwesome';


export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight onPress={()=>{}}>
           <View>
               <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
           </View>
       </TouchableHighlight>
     );
   }
};

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string
};
