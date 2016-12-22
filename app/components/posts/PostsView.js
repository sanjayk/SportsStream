'use strict'

import Swipeout from 'react-native-swipeout';

import React from 'react';
//import {isValidThumbnail} from '../../utils/UrlUtils';
import {isValidPreviewObject} from '../../common/Utils';

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

class PostsView extends React.Component {
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
    const isValidPreview = isValidPreviewObject(this.props.preview.images);
    let firstRow = this.props.rowID < 1 ? true : false;
    //const isValid = true;
    let v;

    if (isValidPreview) {

      v = <Image
            // source={{uri: this.props.thumbnail.replace('http://', 'https://')}}
            source={{uri: this.props.preview.images[0].source.url}}
            style={styles.thumbnail}
          />
    } else {
      v = <View>
            <Text>{this.props.thumbnail}</Text>
          </View>
    }

    let rowStyle;
    if (firstRow)
      rowStyle = StyleSheet.flatten([styles.rowStandard, styles.rowOne]);
    else
      rowStyle = StyleSheet.flatten([styles.rowStandard, styles.rowNext]);

    return (

        <TouchableComponent {...buttonProps} onPress={this.props.onPress} style={rowStyle}>
            <View>
              {v}
              <Text numberOfLines={2} style={styles.title}>{this.props.title}</Text>
              <Text>{this.props.author}</Text>
            </View>

        </TouchableComponent>

    )
  }
}

var styles = StyleSheet.create({
  container: {
    height: 210,
    backgroundColor: '#FF4C4C'
  },
  rowStandard: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    backgroundColor: '#F4E3D6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E2D5D3'
  },
  rowOne: {
    width: 300,
    height: 300,
  },
  rowNext: {
    width: 150,
    height: 150,
  },
  heroRow: {
    flex: 1
  },
  twoColRow: {
    flex: 2
  },
  bigContainer: {
    backgroundColor: '#FFFFFF'
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 5,
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14
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

export default PostsView;
