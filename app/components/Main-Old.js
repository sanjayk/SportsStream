import React, { Component, PropTypes } from 'react';
import { StyleSheet,
View,
DrawerLayoutAndroid,
Text,
Image,
ToolbarAndroid,
Platform,
Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const DEFAULT_SUBREDDIT = 'sports';
import Colors from '../common/Colors';
//import React from 'react-native';
//import SubRedditList from './subreddits/SubRedditList';
//import PostList from './posts/PostList';
import PostLayout from './posts/layout_news/PostLayout';
import {selectSubReddit, fetchPostsIfNeeded, refreshSubReddit} from '../actions';

import {connect} from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const { dispatch, selectedSubReddit, after } = this.props;
    // dispatch(fetchPostsIfNeeded(selectedSubReddit, this.props.after));
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // if (nextProps.selectedSubReddit !== this.props.selectedSubReddit) {
    //   const { dispatch, selectedSubReddit, after } = this.props;
    //   dispatch(fetchPostsIfNeeded(selectedSubReddit, after));
    // }
  }

  _renderSubreddits() {
    return(
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.menuHeader}>
          <Image
            resizeMode="cover"
            style={styles.menuHeaderBackground}
            source={{uri: 'https://s3.amazonaws.com/pomodoro-exp/patch.jpg'}} />
          <View style={styles.menuHeaderOverlay} />
        </View>
        // <SubRedditList {...this.props}/>
      </View>
    );
  }

  render() {
    if (Platform.OS === 'ios') {
      const windowDims = Dimensions.get('window');
      return (
        <View style={{ height: windowDims.height}}>
          <View style={styles.sectionHeader}>
              <Icon name="strikethrough-s" style={styles.sectionHeaderIcon} size={50} color={Colors.blue} />
              {/* <Image style={{width: 150, height: 75}} source={require('../images/ss-logo.png')} /> */}
          </View>
          <PostLayout {...this.props}/>
        </View>
      )
    }

    return(
      <DrawerLayoutAndroid
        style={styles.container}
        drawerWidth={300}
        renderNavigationView={this._renderSubreddits.bind(this)}
        ref={(drawer) => {this.drawer = drawer}}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
      >
        <ToolbarAndroid
          titleColor="#fff"
          style={styles.toolbar}
          title="RedditReactReduxNative"/>
          <PostLayout {...this.props}/>
      </DrawerLayoutAndroid>
    )
  }
}

Main.propTypes = {
  selectedSubReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  after: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Main;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#CCCCCC'
  },
  dummy: {
    flex: 1,
  },
  menuHeader: {
    height: 150,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  menuHeaderBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  menuHeaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  toolbar: {
    backgroundColor: '#222',
    height: 56,
    marginTop: 24,
  },
  sectionHeader: {
    height:75,
    backgroundColor: Colors.blue,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionHeaderText: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10
  },
  sectionHeaderIcon: {
    color: Colors.mutedWhite,
    marginTop: 15
  }
});
