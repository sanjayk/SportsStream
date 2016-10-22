import React from 'react';
import Post from './Post';
//import {Actions} from 'react-native-router-flux';
import {selectSubReddit, fetchPostsIfNeeded, refreshSubReddit} from '../../actions';

import {
  ListView,
  View,
  Text,
  ProgressBarAndroid,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native';

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isFetching: true,
      after: "",
      count: 0
    }
  }

  componentDidMount() {
    const { dispatch, selectedSubReddit, after } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubReddit, this.props.after));
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { dispatch, selectedSubReddit, after } = this.props;
    this.setState({
      isFetching: nextProps.isFetching,
      dataSource: this.state.dataSource.cloneWithRows(nextProps.posts),
      count: nextProps.posts.length
    })
    if (nextProps.selectedSubReddit !== this.props.selectedSubReddit) {
      dispatch(fetchPostsIfNeeded(nextProps.selectedSubReddit, nextProps.after));
    }
  }

  onEndReached() {
    const { dispatch, selectedSubReddit, after } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubReddit, after));
  }

  renderFooter() {
    let LoadingView;

    if (Platform.OS === 'ios') {
      LoadingView = ActivityIndicator;
    } else {
      LoadingView = ProgressBarAndroid;
    }

    return(
      <View>
        <LoadingView styleAttr='Small'/>
      </View>
    )
  }

  renderLoadingView() {
    let LoadingView;

    if (Platform.OS === 'ios') {
      LoadingView = ActivityIndicator;
    } else {
      LoadingView = ProgressBarAndroid;
    }

    return(
      <View>
        <LoadingView/>
      </View>
    )
  }

  renderEmptyView() {
    return(
      <View></View>
    )
  }

  _pressPost(post) {
    //Actions.postDetail({data: post});
  }

  _renderPosts(post) {
    return(
      <Post
        onPress={this._pressPost.bind(this, post)}
        title={post.title}
        ups={post.ups}
        thumbnail={post.thumbnail}
        author={post.author}/>
    )
  }

  _renderSectionHeader(data, sectionId) {
    var text;
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{sectionId}</Text>
      </View>
    );
  }

  render() {
    if (this.state.isFetching && this.state.count === 0) {
      return this.renderLoadingView();
    } else {
      return(
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderPosts.bind(this)}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached.bind(this)}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          renderSectionHeader={this._renderSectionHeader}
        />
      )
    }
  }

}

export default PostList;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  sectionHeader: {
    height:75,
    backgroundColor: '#FF0041',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionHeaderText: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10
  }
});
