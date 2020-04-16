import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from '@reach/router';
import Voter from './Voter';
import FilterArticleListForm from './FilterArticleListForm';
import { ErrorDisplay } from './ErrorDisplay';

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
    if (this.state.error) {
      return (
        <ErrorDisplay
          status={this.state.error.status}
          msg={this.state.error.message}
        />
      );
    }
    const { articles } = this.state;
    return (
      <main>
        <h2 className="topic-title">
          {this.props.topic_slug || 'All Articles'}
        </h2>
        <FilterArticleListForm
          handleFilteredArticles={this.handleFilteredArticles}
        />
        <ul className="articles-list">
          {articles.map((article) => {
            return (
              <section className="articles-list-item" key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <li>
                    <h3>{article.title}</h3>
                    <h4>Written By {article.author}</h4>
                    <h5>Published on {article.created_at}</h5>
                    <h5>Comment count: {article.comment_count}</h5>
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
    );
  }

  fetchArticles = () => {
    const { topic_slug } = this.props;
    api
      .getArticles({ topic: topic_slug } || this.state.queryObj)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
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
  handleFilteredArticles = (query) => {
    if (this.props.topic_slug) {
      query.topic = this.props.topic_slug;
      console.log(query);
      api
        .getArticles(query)
        .then((articles) => {
          this.setState({ articles });
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
    } else {
      api
        .getArticles(query)
        .then((articles) => {
          this.setState({ articles });
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

  componentDidMount() {
    this.fetchArticles();
  }
}

export default ArticleList;
