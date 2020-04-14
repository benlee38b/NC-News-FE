import React from 'react';
import './App.css';
import { Header } from './components/Header';
import NavBar from './components/NavBar';
import { Router } from '@reach/router';
import ArticleList from './components/ArticleList';
import ArticleListByTopic from './components/ArticleListByTopic';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router>
        <ArticleListByTopic path="/:topic_slug/articles" />
        <ArticleList path="/articles/*" />
      </Router>
    </div>
  );
}

export default App;
