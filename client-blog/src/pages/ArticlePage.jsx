import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom'; 

function ArticlePage( { theme }) {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);  
  const [articleContent, setArticleContent] = useState(''); 
  const [articleNum, setArticleNum] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const labelColors = {
    "Soliloquy": "bg-yellow-600",
    "Dialogue": "bg-green-500",
    "Software": "bg-blue-500",
    "Resonance": "bg-purple-500",
  };

  const openModal = (src) => {
    setModalImage(src);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'auto'; 
  };

  useEffect(() => {
    fetch(`https://chezeng.github.io/Media/WhatIAM/articles/articles.json`)
      .then(response => response.json())
      .then(data => {
        const foundArticle = data.find(article => article.id === parseInt(id));
        if (foundArticle) {
          setArticle(foundArticle);  
          setArticleNum(data.length);
        }
        
      })
      .catch(error => console.error('Error fetching article metadata:', error));

    fetch(`https://chezeng.github.io/Media/WhatIAM/articles/${id}.md`)
      .then((response) => response.text())
      .then((data) => {
        setArticleContent(data);
      })
      .catch((error) => console.error('Error fetching article content:', error));
  }, [id]);

  
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

  if (!article) return <div>Loading...</div>;

  return (
    <div key={id} style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})`}} id='top' className="px-8 md:px-14 xl:px-40 py-20 gradient bg-gradient-to-tl from-pink-100 to-purple-200">
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={modalImage}
            alt="Expanded"
            className="max-w-3xl max-h-[80vh] rounded-2xl transition duration-300 ease-in-out transform scale-100"
          />
        </div>
      )}
      
      <div className="space-x-2 mt-2 mb-4">
        {article.labels && article.labels.map((label, index) => (
          <span key={index} 
            className={`text-white text-lg px-3 py-2 rounded-full cursor-pointer ${labelColors[label]}`}>
            {label}
          </span>
        ))}
      </div>
      <hr className='h-[3px] bg-black mb-20'></hr>
      <div className={`prose lg:prose-xl bg-white p-10 rounded-2xl bg-opacity-30 hover:scale-101 transition ease-in-out duration-300 ${theme.card.ring} hover:ring-white ring-4 backdrop-blur-lg shadow-lg`}>
        <ReactMarkdown components={renderers}>{articleContent}</ReactMarkdown>
      </div>

      <div className='flex-col md:flex space-y-10 text-center justify-between mt-20 text-xl'>
      <Link to={`/${article.id > 1 ? article.id - 1 : ""}`}><button className={`bg-white text-black font-bold px-6 py-3 rounded-xl bg-opacity-30 hover:scale-101 transition 
          ease-in-out duration-300 ${theme.card.ring} hover:ring-white ring-4 backdrop-blur-lg shadow-lg`}>
          ← Previous Article</button></Link>
        <p className='text-black font-bold italic'>Current Article: <span className='underline'>"{article.title}"</span> </p>
        <Link to={`/${article.id < articleNum ? article.id + 1 : ""}`}><button className={`mt-10 md:mt-0 bg-white text-black font-bold px-6 py-3 rounded-xl bg-opacity-30 hover:scale-101 transition 
          ease-in-out duration-300 ${theme.card.ring} hover:ring-white ring-4 backdrop-blur-lg shadow-lg`}>
            → Next Article</button></Link>
      </div>
    </div>
  );
}

export default ArticlePage;
