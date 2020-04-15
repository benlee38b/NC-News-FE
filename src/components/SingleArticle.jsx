import React, { Component } from 'react';
import * as api from '../utils/api';
import { formatDate } from '../utils/formatDate';

export class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
  };

  componentDidMount() {
    this.fetchArticle();
    formatDate(this.state.article.created_at);
  }
  fetchArticle = () => {
    api.getArticleById(this.props.article_id).then((article) => {
      this.setState({ article, isLoading: false }, () => {
        console.log(article);
      });
    });
  };

  render() {
    const {
      title,
      body,
      author,
      created_at,
      votes,
      // comment_count,
    } = this.state.article;

    return (
      <main className="single-article-container">
        <h2>{title}</h2>
        <h4>
          written by{author} on {created_at}
        </h4>
        <h5>Total votes: {votes}</h5>
        <p>{body}</p>
      </main>
    );
  }
}

export default SingleArticle;
