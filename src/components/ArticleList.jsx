import React, { Component } from 'react';

export class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps['*'] !== this.props['*']) {
      console.log(this.props);
    }
  }
  render() {
    return <main></main>;
  }

  componentDidMount() {
    console.log(this.props['*']);
  }
}

export default ArticleList;
