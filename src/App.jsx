import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';
import BlogNavBar from './BlogComponents/BlogNavBar';
import BlogPage from './BlogComponents/BlogPage';
import CommentsPage from './BlogComponents/CommentsPage';
import MusicPlayer from './BlogComponents/MusicPlayer';
import ArticlePage from './BlogComponents/ArticlePage';  

const App = () => {
  return (
    <>
      <Router>
      <BlogNavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/blog" element={<BlogPage />}/>
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
        </Routes>
      </Router>
    </>
    
  )
}

export default App;
