import React, { Component } from 'react';
import * as api from '../utils/api';
import { Link } from '@reach/router';
import Voter from './Voter';
import FilterArticleListForm from './FilterArticleListForm';

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
                    <h5>Written By {article.author}</h5>
                    <h6>Published on {article.created_at}</h6>
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
        this.setState({ articles, isLoading: false }, () => {
          console.log(this.state.articles);
        });
      });
  };
  handleFilteredArticles = (query) => {
    api.getArticles(query).then((articles) => {
      this.setState({ articles }, () => {
        console.log(this.state);
      });
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }
}

export default ArticleList;
