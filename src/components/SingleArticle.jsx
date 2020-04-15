import React, { Component } from 'react';
import * as api from '../utils/api';
import Voter from './Voter';
// import { formatDate } from '../utils/formatDate';

export class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    homepage: false,
  };

  componentDidMount() {
    this.fetchArticle();
  }
  fetchArticle = () => {
    if (this.props.article_id) {
      api.getArticleById(this.props.article_id).then((article) => {
        this.setState({ article, isLoading: false, homepage: false });
      });
    } else {
      api.getArticles({}).then((articles) => {
        const arrLength = articles.length;
        this.setState({
          article: articles[Math.floor(Math.random() * arrLength)],
          homepage: true,
          isLoading: false,
        });
      });
    }
  };

  render() {
    const {
      title,
      body,
      author,
      created_at,
      votes,
      article_id,
      // comment_count,
    } = this.state.article;
    return (
      <>
        {this.state.homepage ? <h2>Please enjoy this random article</h2> : null}
        <main className="single-article-container">
          <h2>{title}</h2>
          <h4>
            written by{author} on {created_at}
          </h4>
          <h5>
            <Voter votes={votes} type={'articles'} article_id={article_id} />
          </h5>
          <p>{body}</p>
        </main>
      </>
    );
  }
}

export default SingleArticle;
