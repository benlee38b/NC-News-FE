import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';

export class NavBar extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  render() {
    const { topics } = this.state;
    return (
      <nav>
        <ul className="nav-list">
          {topics.map((topic, index) => {
            return (
              <Link
                to={`/topics/${topic.slug}`}
                key={topic.slug + index}
                className="nav-links"
              >
                <li>{topic.slug}</li>
              </Link>
            );
          })}
          <Link to="/articles" className="nav-links">
            <li>All Articles</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
