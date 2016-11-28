import React from 'react';
//import Post from '../Post';
import PostsView from '../PostsView';
//import {Actions} from 'react-native-router-flux';
import {selectSubReddit, fetchPostsIfNeeded, refreshSubReddit} from '../../../actions';

import {
  ListView,
  View,
  Text,
  ProgressBarAndroid,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Dimensions,
  RefreshControl
} from 'react-native';

class PostLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isFetching: true,
      after: "",
      count: 0,
      didRefresh: false,
    }
  }

  componentDidMount() {
    const { dispatch, selectedSubReddit, after, title } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubReddit, this.props.after));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, selectedSubReddit, after, title } = this.props;
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
    const { dispatch, selectedSubReddit, after, title } = this.props;
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
        <LoadingView size="small" color="#aa00aa"/>
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
    let preview = (typeof post.preview === 'undefined') ? '' : post.preview;
    
    return(
      <PostsView
        onPress={this._pressPost.bind(this, post)}
        title={post.title}
        ups={post.ups}
        thumbnail={post.thumbnail}
        preview={preview}
        author={post.author}/>
    )
  }

  _onRefresh() {
    const { dispatch, selectedSubReddit, after } = this.props;
    this.setState({didRefresh: false});
    dispatch(fetchPostsIfNeeded(selectedSubReddit, after));
  }

  render() {
    if (!this.state.didRefresh && this.state.isFetching && this.state.count === 0) {
      return this.renderLoadingView();
    } else {
      return(
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderPosts.bind(this)}
          renderFooter={this.renderFooter}
          onEndReached={this.onEndReached.bind(this)}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.didRefresh}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          style={styles.listview}
        />
      )
    }
  }

}

export default PostLayout;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#F4F4F4',
  },
  listview: {
    flex: 1,
  },
});
