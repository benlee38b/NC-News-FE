import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';
import { ErrorDisplay } from './ErrorDisplay';
import { HomeButton } from './HomeButton';

export class NavBar extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then((topics) => {
        this.setState({ topics, isLoading: false });
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

  render() {
    if (this.state.error) {
      return (
        <ErrorDisplay
          status={this.state.error.status}
          msg={this.state.error.message}
        />
      );
    }
    const { topics } = this.state;
    return (
      <nav>
        <ul className="nav-list">
          <HomeButton />
          {topics.map((topic, index) => {
            return (
              <Link
                to={`/topics/${topic.slug}`}
                key={topic.slug + index}
                className="nav-links"
              >
                <li>{topic.slug[0].toUpperCase() + topic.slug.slice(1)}</li>
              </Link>
            );
          })}
          <Link to="/articles" className="nav-links">
            <li>All Articles</li>
          </Link>
          <li id="logged-in-user">
            Logged in as: <strong>{this.props.user}</strong>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
