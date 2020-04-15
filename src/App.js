import React from 'react';
import './App.css';
import { Header } from './components/Header';
import NavBar from './components/NavBar';
import { Router } from '@reach/router';
import ArticleList from './components/ArticleList.jsx';
import { HomeButton } from './components/HomeButton';
import SingleArticle from './components/SingleArticle';

function App() {
  return (
    <div className="App">
      <Header />
      <HomeButton />
      <NavBar />
      <Router>
        <ArticleList path="/topics/:topic_slug" />
        <ArticleList path="/articles" />
        <SingleArticle path="/articles/:article_id" />
      </Router>
    </div>
  );
}

export default App;
