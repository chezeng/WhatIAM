import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import CommentsPage from './components/CommentsPage';
import MusicPlayer from './components/MusicPlayer';
import ArticlePage from './components/ArticlePage';  
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavBar />
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
