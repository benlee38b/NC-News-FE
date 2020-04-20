import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from '@reach/router';
import Voter from './Voter';
import FilterArticleListForm from './FilterArticleListForm';
import { ErrorDisplay } from './ErrorDisplay';
import { Loader } from './Loader';
import { formatDate } from '../utils/formatDate';
import { Pages } from './Pages';
import moment from 'moment';

export class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null,
    pages: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic_slug !== this.props.topic_slug) {
      console.log('fetching!!');
      this.fetchArticles();
    }
  }
  render() {
    if (this.state.error) {
      return (
        <ErrorDisplay
          status={this.state.error.status}
          msg={this.state.error.message}
        />
      );
    }
    if (this.state.isLoading) return <Loader />;
    const { articles } = this.state;
    const { topic_slug } = this.props;
    return (
      <>
        <main>
          <h2 className="topic-title">{topic_slug || 'All Articles'}</h2>
          <FilterArticleListForm fetchArticles={this.fetchArticles} />
          <ul className="articles-list">
            {articles.map((article) => {
              return (
                <section
                  className="articles-list-item"
                  key={article.article_id}
                >
                  <Link to={`/articles/${article.article_id}`}>
                    <li className="article-grid">
                      <h3 id="article-card-title">{article.title}</h3>
                      <h4>By {article.author}</h4>
                      <h5>Published {article.created_at}</h5>
                      <h5 id="comment-count">
                        <i className="fas fa-comments"></i>
                        Total Comments {article.comment_count}
                      </h5>
                    </li>
                  </Link>

                  <Voter
                    type={'articles'}
                    votes={article.votes}
                    article_id={article.article_id}
                  />
                </section>
              );
            })}
          </ul>
        </main>
        <Pages
          pages={this.state.pages}
          fetchArticles={this.fetchArticles}
          type={'articles'}
        />
      </>
    );
  }

  fetchArticles = (query) => {
    const { topic_slug } = this.props;
    api
      .getArticles({ topic: topic_slug, ...query })
      .then((articles) => {
        if (articles.length > 1) {
          articles.forEach((article) => {
            if (article.created_at) {
              article.created_at = moment(
                formatDate(article.created_at),
                'YYYY-MM-DD'
              ).fromNow();
            }
          });
        }

        let pageCount = Math.ceil(articles[0].total_count / 10);

        let pageArr = [];
        if (pageCount) {
          for (let i = 1; i <= pageCount; i++) {
            pageArr.push(i);
          }
        }

        this.setState((currentState) => {
          return {
            articles,
            isLoading: false,
            pages: pageArr.length ? pageArr : currentState.pages,
          };
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
  };

  componentDidMount() {
    this.fetchArticles();
  }
}

export default ArticleList;
