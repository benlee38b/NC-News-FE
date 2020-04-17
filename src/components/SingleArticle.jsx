import React, { Component } from 'react';
import * as api from '../utils/api';
import Voter from './Voter';
import CommentsList from './CommentsList';
import { ErrorDisplay } from './ErrorDisplay';
import { formatDate } from '../utils/formatDate';

import { Loader } from './Loader';

export class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    homepage: false,
    error: null,
  };

  componentDidMount() {
    this.fetchArticle();
  }
  fetchArticle = () => {
    if (this.props.article_id) {
      api
        .getArticleById(this.props.article_id)
        .then((article) => {
          article.created_at = formatDate(article.created_at);

          this.setState({ article, isLoading: false, homepage: false });
        })
        .catch((err) => {
          console.dir(err);
          console.log(err.response.data.message);
          this.setState({
            error: {
              status: err.response.status,
              msg: err.response.data.message,
            },
            isLoading: false,
          });
        });
    } else {
      api
        .getArticles({})
        .then((articles) => {
          const arrLength = articles.length;
          this.setState({
            article: articles[Math.floor(Math.random() * arrLength)],
            homepage: true,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.dir(err);
          this.setState({
            error: {
              status: err.response.status,
              msg: err.response.data.message,
            },
            isLoading: false,
          });
        });
    }
  };

  render() {
    if (this.state.error)
      return (
        <ErrorDisplay
          status={this.state.error.status}
          msg={this.state.error.msg}
        />
      );
    const {
      title,
      body,
      author,
      created_at,
      votes,
      article_id,
      // comment_count,
    } = this.state.article;
    // isLoading
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <>
        <main className="single-article-container">
          {this.state.homepage ? (
            <h2>Please enjoy this random article</h2>
          ) : null}
          <h2 className="single-article-heading">{title}</h2>
          <h5 className="single-article-subheading">
            written by{author} on {created_at}
          </h5>
          <h5>
            <Voter votes={votes} type={'articles'} article_id={article_id} />
          </h5>
          <p className="single-article-body">{body}</p>
        </main>
        <section className="comments-container">
          <CommentsList article_id={article_id} user={this.props.user} />
        </section>
      </>
    );
  }
}

export default SingleArticle;
