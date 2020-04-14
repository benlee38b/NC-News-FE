import React, { Component } from 'react';
import * as api from '../utils/api';

export class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    queryObj: {},
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchArticles();
    }
  }
  render() {
    const { articles } = this.state;
    return (
      <main>
        <h2 className="topic-title">
          {this.props.topic_slug || 'All Articles'}
        </h2>
        <ul className="articles-list">
          {articles.map((article) => {
            return (
              <li key={article.article_id} className="articles-list-item">
                <h3>{article.title}</h3>
                <p>{article.article_id}</p>
                <h5>Written By {article.author}</h5>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  fetchArticles = () => {
    const { topic_slug } = this.props;
    api
      .getArticles({ topic: topic_slug } || this.state.queryObj)
      .then((articles) => {
        this.setState({ articles, isLoading: false }, () => {
          console.log(this.state.articles);
        });
      });
  };

  componentDidMount() {
    this.fetchArticles();
  }
}

export default ArticleList;
