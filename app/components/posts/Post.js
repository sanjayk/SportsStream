'use strict'

import Swipeout from 'react-native-swipeout';

import React from 'react';
//import {isValidThumbnail} from '../../utils/UrlUtils';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image
} from 'react-native';

import Colors from '../../common/Colors';
import SSSwipeButton from '../common/SSSwipeButton'

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let TouchableComponent;
    let buttonProps = {};

    if (Platform.OS === 'ios') {
      TouchableComponent = TouchableOpacity;
    } else {
      TouchableComponent = TouchableNativeFeedback;
      buttonProps = {
        background: TouchableNativeFeedback.Ripple('#ddd', false)
      }
    }

    //let isValid = isValidThumbnail(this.props.thumbnail)
    const isValid = true;
    let v;

    if (isValid) {
      v = <Image
            source={{uri: this.props.thumbnail.replace('http://', 'https://')}}
            style={styles.thumbnail}
          />
    } else {
      v = <View>
            <Text>{this.props.thumbnail}</Text>
          </View>
    }
    return (

        <TouchableComponent {...buttonProps} onPress={this.props.onPress}>
          <View style={styles.container}>
            { /* <Text style={styles.ups}>{this.props.ups}</Text> */ }
            <Swipeout right={swipeoutBtns}>
            <View style={styles.middleContainer}>
              <Text numberOfLines={2} style={styles.title}>{this.props.title}</Text>
              <Text>{this.props.author}</Text>
            </View>
            <View style={styles.rightContainer}>
              {v}
            </View>
            </Swipeout>
          </View>
        </TouchableComponent>

    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.grey
  },
  middleContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  ups: {
    flex: 0.3,
    fontSize: 16,
    marginLeft: 8,
    backgroundColor: '#474747'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14
  },
  rightContainer: {
    flex: 0.3
  },
  thumbnail: {
    width: 80,
    height: 80
  },
  button: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    height: 50,
    width: 50
  }
});

// Buttons
var swipeoutBtns = [
  {
    text: 'Like',
    underlayColor: Colors.mutedGrey,
    component: <SSSwipeButton underlayColor={Colors.mutedWhite} iconName="favorite"
                          buttonStyle={styles.button} iconColor={Colors.darkPink} iconSize={30}></SSSwipeButton>
  },
  {
    text: 'DisLike',
    underlayColor: Colors.mutedGrey,
    component: <SSSwipeButton underlayColor={Colors.mutedWhite} iconName="thumb-down"
                          buttonStyle={styles.button}  iconColor={Colors.mutedGrey} iconSize={30}></SSSwipeButton>
  }
]

export default Post;
