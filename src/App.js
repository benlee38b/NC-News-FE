import './App.css';
import { Header } from './components/Header';
import NavBar from './components/NavBar';
import { Router } from '@reach/router';
import ArticleList from './components/ArticleList.jsx';

import SingleArticle from './components/SingleArticle';

import React, { Component } from 'react';
import { ErrorDisplay } from './components/ErrorDisplay';

export class App extends Component {
  state = {
    user: 'jessjelly',
  };

  render() {
    return (
      <div className="App">
        <Header />

        <NavBar />
        <Router>
          <ArticleList path="/topics/:topic_slug" />
          <ErrorDisplay default status={404} msg={'page not found'} />
          <ArticleList path="/articles" />
          <SingleArticle path="/articles/:article_id" user={this.state.user} />
          <SingleArticle path="/" user={this.state.user} />
        </Router>
      </div>
    );
  }
}

export default App;
