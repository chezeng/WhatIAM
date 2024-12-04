import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import CommentsPage from './pages/CommentsPage';
import ArticlePage from './pages/ArticlePage';  

import { useState } from 'react';

const allGradients = [
  {
    from: '#FFDEE9',
    to: '#B5FFFC', 
    card: { bg: 'bg-pink-50', ring: 'ring-pink-300', text: 'text-pink-800', footer: 'bg-[#B5FFFC]', stroke: 'stroke-pink-500' }
  },
  {
    from: '#A9C9FF',
    to: '#FFBBEC',
    card: { bg: 'bg-blue-50', ring: 'ring-blue-300', text: 'text-blue-800', footer: 'bg-[#FFBBEC]', stroke : 'stroke-blue-500' }
  },
  {
    from: '#FAACA8',
    to: '#DDD6F3', 
    card: { bg: 'bg-rose-50', ring: 'ring-rose-300', text: 'text-rose-800', footer: 'bg-[#DDD6F3]', stroke : 'stroke-rose-500' }
  },
  {
    from: '#8EC5FC',
    to: '#E0C3FC', 
    card: { bg: 'bg-indigo-50', ring: 'ring-indigo-300', text: 'text-indigo-800', footer: 'bg-[#E0C3FC]', stroke : 'stroke-indigo-500' }
  },
  {
    from: '#EE9CA7',
    to: '#FFDDE1', 
    card: { bg: 'bg-pink-50', ring: 'ring-pink-300', text: 'text-pink-800', footer: 'bg-[#FFDDE1]', stroke : 'stroke-pink-500' }
  },
  {
    from: '#FFECD2',
    to: '#FCB69F',
    card: { bg: 'bg-orange-50', ring: 'ring-orange-300', text: 'text-orange-800', footer: 'bg-[#FCB69F]', stroke : 'stroke-orange-500' }
  },
  {
    from: '#A1C4FD',
    to: '#C2E9FB', 
    card: { bg: 'bg-sky-50', ring: 'ring-sky-300', text: 'text-sky-800', footer: 'bg-[#C2E9FB]', stroke : 'stroke-sky-500' }
  }
];



function getRandomGradient() {
  const randomIndex = Math.floor(Math.random() * allGradients.length);
  return allGradients[randomIndex];
}

function App() {
  const [theme] = useState(getRandomGradient());
  
  return (
    <div className='bg-white'>
    <Router >
      <NavBar theme={theme}/>
      <MusicPlayer theme={theme} />
      <Routes>
        <Route path="/" element={<BlogPage theme={theme} />} />
        <Route path="/about" element={<AboutPage theme={theme} />} />
        <Route path="/comments" element={<CommentsPage theme={theme}/>} />
        <Route path="/:id" element={<ArticlePage theme={theme}/>} />
      </Routes>
      <Footer theme={theme}/>
    </Router>
    </div>
  );
}

export default App;
