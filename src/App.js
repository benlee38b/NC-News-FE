import React from 'react';
import './App.css';
import { Header } from './components/Header';
import NavBar from './components/NavBar';
import { Router } from '@reach/router';
import ArticleList from './components/ArticleList.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router>
        <ArticleList path="/topics/:topic_slug" />
        <ArticleList path="/articles/*" />
      </Router>
    </div>
  );
}

export default App;
