import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from '@reach/router';
import Voter from './Voter';
import FilterArticleListForm from './FilterArticleListForm';
import { ErrorDisplay } from './ErrorDisplay';
import { Loader } from './Loader';
import { formatDate } from '../utils/formatDate';
import { Pages } from './Pages';

export class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null,
    pages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
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
          <h2 className="topic-title">
            {topic_slug[0].toUpperCase() + topic_slug.slice(1) ||
              'All Articles'}
          </h2>
          <FilterArticleListForm fetchArticles={this.fetchArticles} />
          <ul className="articles-list">
            {articles.map((article) => {
              return (
                <section
                  className="articles-list-item"
                  key={article.article_id}
                >
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
        <Pages pages={this.state.pages} fetchArticles={this.fetchArticles} />
      </>
    );
  }

  fetchArticles = (query) => {
    console.log(query);
    const { topic_slug } = this.props;
    api
      .getArticles({ topic: topic_slug, ...query })
      .then((articles) => {
        if (articles.length > 1) {
          articles.forEach((article) => {
            if (article.created_at) {
              article.created_at = formatDate(article.created_at);
            }
          });
        }
        let pageCount = Math.ceil(articles[0].total_count / 10);
        let pageArr = [];
        for (let i = 1; i <= pageCount; i++) {
          pageArr.push(i);
        }
        console.log(pageArr);

        this.setState({ articles, isLoading: false, pages: pageArr });
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
