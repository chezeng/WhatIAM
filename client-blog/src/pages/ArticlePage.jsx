import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom'; 
import { IoMdRocket } from "react-icons/io";

function ArticlePage( { theme }) {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);  
  const [articleContent, setArticleContent] = useState(''); 
  const [articles, setArticles] = useState([]); 
  const [modalImage, setModalImage] = useState(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  let lastScrollTop = 0;

  const labelColors = {
    "Life 人生观": "bg-gradient-to-r from-green-400 to-blue-500",
    "Values 价值观": "bg-gradient-to-r from-yellow-400 to-orange-500",
    "World 世界观": "bg-gradient-to-r from-indigo-500 to-purple-600",
    "Art 诗物语": "bg-gradient-to-r from-pink-400 to-red-500",
    "Tools 知识库": "bg-gradient-to-r from-gray-400 to-gray-700",
  };

  const openModal = (src) => {
    setModalImage(src);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'auto'; 
  };

  // Rocket scroll-to-top button with progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const progress = Math.min(Math.max(scrollPercent, 0), 1);
  
      if (scrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollTop = scrollTop;

      setScrollProgress(progress);
      setIsVisible(scrollPercent > 0.1);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollProgress(0);
  };

  // Fetch article metadata and content from JSON and Markdown files
  useEffect(() => {
    fetch(`https://chezeng.github.io/Media/WhatIAM/articles/articles.json`)
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        const foundArticle = data.find(article => article.id === id);
        if (foundArticle) {
          setArticle(foundArticle);
        }
      })
      .catch(error => console.error('Error fetching article metadata:', error));

    fetch(`https://chezeng.github.io/Media/WhatIAM/articles/${id}.md`)
      .then(response => response.text())
      .then(data => {
        setArticleContent(data);
      })
      .catch(error => console.error('Error fetching article content:', error));
  }, [id]);
  
  // Define custom renderers for ReactMarkdown
  const renderers = {
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="rounded-2xl cursor-pointer transition duration-300 ease-in-out ring-0 hover:ring-2 ring-black"
        onClick={() => openModal(src)}
      />
    ),
  };

  // Render loading message if article is not loaded
  if (!article) return <div>Loading...</div>;

  const currentIndex = articles.findIndex(a => a.id === id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div key={id} style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})`}} id='top' className="px-8 md:px-14 xl:px-40 py-20 gradient bg-gradient-to-tl from-pink-100 to-purple-200">
      {isVisible && (
        <div onClick={scrollToTop} className={`fixed bottom-10 right-10 cursor-pointer z-50 group transition-all duration-500 ease-out 
          ${scrollDirection === 'down' 
            ? 'animate-fade-in-up' 
            : 'animate-fade-in-down'}`}>
          <div className="relative w-16 h-16">
            <svg className="absolute top-0 left-0 w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className={`stroke-white`} strokeWidth="3" />
              <circle cx="18" cy="18" r="16" fill="none" className={`${theme.card.stroke}`} strokeWidth="3"strokeDasharray="101"strokeDashoffset={`${100 - scrollProgress * 100}`}/>
            </svg>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
              <IoMdRocket className={`w-6 h-6 ${theme.card.text} group-hover:scale-110 transition-transform`}/>
            </div>
          </div>
        </div>
      )}

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={modalImage}
            alt="Expanded"
            className="max-w-1/2 max-h-1/2 rounded-2xl transition duration-300 ease-in-out transform scale-100"
          />
        </div>
      )}

      <div className="space-x-2 mt-2 mb-4">
        {article.labels && article.labels.map((label, index) => (
          <span key={index} 
            className={`text-white font-bold text-lg px-3 py-2 rounded-full cursor-pointer ${labelColors[label]}`}>
            {label}
          </span>
        ))}
      </div>
      <hr className='h-[3px] bg-black mb-20'></hr>
      <div className={`max-w-full prose lg:prose-xl bg-white p-10 rounded-2xl bg-opacity-30 transition ease-in-out duration-300 ${theme.card.ring} hover:ring-white ring-4 backdrop-blur-lg shadow-lg`}>
        <ReactMarkdown components={renderers}>{articleContent}</ReactMarkdown>
      </div>

      <div className="flex-col md:flex space-y-10 text-center justify-between mt-20 text-xl">
        {prevArticle && (
          <Link to={`/${prevArticle.id}`}>
            <button className={`bg-white ${theme.card.text} font-bold px-6 py-3 rounded-xl bg-opacity-30 hover:scale-101 transition ease-in-out duration-300 ${theme.card.ring} hover:ring-white ring-4 backdrop-blur-lg shadow-lg`}>
              ← Previous Article
            </button>
          </Link>
        )}
        <p className={`${theme.card.text} font-bold italic text-xl`}>
          Current Article: <span className="underline bg-yellow-300">"{article.title}"</span>
        </p>
        {nextArticle && (
          <Link to={`/${nextArticle.id}`}>
            <button className={`mt-10 md:mt-0 bg-white ${theme.card.text} font-bold px-6 py-3 rounded-xl bg-opacity-30 hover:scale-101 transition ease-in-out duration-300 ${theme.card.ring} hover:ring-white ring-4 backdrop-blur-lg shadow-lg`}>
              → Next Article
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ArticlePage;
