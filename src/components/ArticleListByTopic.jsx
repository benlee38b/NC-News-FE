import React, { Component } from 'react';
import * as api from '../utils/api';

export class ArticleListByTopic extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchArticlesByTopic();
    }
  }
  render() {
    const { articles } = this.state;
    return (
      <main>
        <h2>{this.props.topic_slug}</h2>
        <ul className="articles-list">
          {articles.map((article) => {
            return (
              <li key={article.article_id} className="articles-list-item">
                <h3>{article.title}</h3>
                <h5>Written By {article.author}</h5>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  fetchArticlesByTopic = () => {
    const { topic_slug } = this.props;
    api.getArticles({ topic: topic_slug }).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };

  componentDidMount() {
    this.fetchArticlesByTopic();
  }
}

export default ArticleListByTopic;
