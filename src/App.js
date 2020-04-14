import React from 'react';
import './App.css';
import { Header } from './components/Header';
import NavBar from './components/NavBar';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router></Router>
    </div>
  );
}

export default App;
