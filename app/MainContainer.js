import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import Main from './components/Main';

class MainContainer extends React.Component {
  render() {
    return (
      <Main {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  console.log("====");
  console.log(state);
  console.log("====");
  const { selectedSubReddit, postsBySubReddit } = state;
  const {
    isFetching,
    items: posts,
    after
  } = postsBySubReddit[selectedSubReddit] || {
    isFetching: true,
    items: [],
    after: ""
  }
  return {
    selectedSubReddit,
    posts,
    isFetching,
    after
  }
}

export default connect(mapStateToProps)(MainContainer);
