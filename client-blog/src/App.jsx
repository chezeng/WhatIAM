import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import CommentsPage from './components/CommentsPage';
import MusicPlayer from './components/MusicPlayer';
import ArticlePage from './components/ArticlePage';  
import Footer from './components/Footer';

const allGradients = [
  {
    from: '#ee9ca7', 
    to: '#ffdde1',  // 1
    card: { bg: 'bg-pink-50', ring: 'ring-pink-200', text: 'text-pink-800' }
  },
  {
    from: '#ff5f6d', 
    to: '#ffc371',  // 2
    card: { bg: 'bg-rose-50', ring: 'ring-rose-200', text: 'text-rose-800' }
  },
  {
    from: '#c6ea8d', 
    to: '#fe90af',  // 3
    card: { bg: 'bg-green-50', ring: 'ring-green-200', text: 'text-green-800' }
  },
  {
    from: '#a9f1df', 
    to: '#ffbbbb',  // 4
    card: { bg: 'bg-teal-50', ring: 'ring-teal-200', text: 'text-teal-800' }
  },
  {
    from: '#93a5cf', 
    to: '#e4efe9',  // 5
    card: { bg: 'bg-blue-50', ring: 'ring-blue-200', text: 'text-blue-800' }
  },
  {
    from: '#ffecd2', 
    to: '#fcb69f',  // 6
    card: { bg: 'bg-orange-50', ring: 'ring-orange-200', text: 'text-orange-800' }
  },
  {
    from: '#a1c4fd', 
    to: '#c2e9fb',  // 7
    card: { bg: 'bg-sky-50', ring: 'ring-sky-200', text: 'text-sky-800' }
  },
  {
    from: '#fdfcfb', 
    to: '#e2d1c3',  // 8
    card: { bg: 'bg-gray-50', ring: 'ring-gray-200', text: 'text-gray-800' }
  },
  {
    from: '#6b7cff', 
    to: '#1bffff',  // 9
    card: { bg: 'bg-indigo-50', ring: 'ring-indigo-200', text: 'text-indigo-800' }
  },
  {
    from: '#ff6e83', 
    to: '#fbb03b',  // 10
    card: { bg: 'bg-red-50', ring: 'ring-red-200', text: 'text-red-800' }
  },
  {
    from: '#66d19e', 
    to: '#fcee21',  // 11
    card: { bg: 'bg-lime-50', ring: 'ring-lime-200', text: 'text-lime-800' }
  },
  {
    from: '#b794d4', 
    to: '#ed1e79',  // 12
    card: { bg: 'bg-purple-50', ring: 'ring-purple-200', text: 'text-purple-800' }
  },
  {
    from: '#a189c7', 
    to: '#516395',  // 13
    card: { bg: 'bg-violet-50', ring: 'ring-violet-200', text: 'text-violet-800' }
  },
  {
    from: '#7fe4d5', 
    to: '#00cdac',  // 14
    card: { bg: 'bg-emerald-50', ring: 'ring-emerald-200', text: 'text-emerald-800' }
  },
  {
    from: '#ff9473', 
    to: '#dd2476',  // 15
    card: { bg: 'bg-pink-50', ring: 'ring-pink-200', text: 'text-pink-800' }
  },
  {
    from: '#69d4a6', 
    to: '#38ef7d',  // 16
    card: { bg: 'bg-green-50', ring: 'ring-green-200', text: 'text-green-800' }
  },
  {
    from: '#92a9ff', 
    to: '#92effd',  // 17
    card: { bg: 'bg-blue-50', ring: 'ring-blue-200', text: 'text-blue-800' }
  },
  {
    from: '#f28ebb', 
    to: '#1d2671',  // 18
    card: { bg: 'bg-rose-50', ring: 'ring-rose-200', text: 'text-rose-800' }
  },
  {
    from: '#a07fcf', 
    to: '#667eea',  // 19
    card: { bg: 'bg-indigo-50', ring: 'ring-indigo-200', text: 'text-indigo-800' }
  },
  {
    from: '#7a96bf', 
    to: '#537895',  // 20
    card: { bg: 'bg-slate-50', ring: 'ring-slate-200', text: 'text-slate-800' }
  }
];

function getRandomGradient() {
  const randomIndex = Math.floor(Math.random() * allGradients.length);
  return allGradients[randomIndex];
}


function App() {
  return (
    <Router>
      <NavBar />
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<BlogPage gradients={allGradients} random={getRandomGradient()} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
      <Footer gradients={allGradients} random={getRandomGradient()} />
    </Router>
  );
}

export default App;
