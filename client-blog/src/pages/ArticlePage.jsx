import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function ArticlePage( { theme }) {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);  
  const [articleContent, setArticleContent] = useState(''); 

  const labelColors = {
    "Software": "bg-blue-500",
    "Audio-Visual": "bg-red-500",
    "Music Critique": "bg-purple-500",
    "Philosophy": "bg-green-500",
    "Gaming": "bg-yellow-500",
    "Experience": "bg-teal-500",
  };

  useEffect(() => {
    fetch(`https://chezeng.github.io/Media/WhatIAM/articles/articles.json`)
      .then(response => response.json())
      .then(data => {
        const foundArticle = data.find(article => article.id === parseInt(id));
        if (foundArticle) {
          setArticle(foundArticle);  
        }
      })
      .catch(error => console.error('Error fetching article metadata:', error));

    fetch(`https://chezeng.github.io/Media/WhatIAM/articles/${id}.md`)
      .then(response => response.text())
      .then(data => setArticleContent(data)) 
      .catch(error => console.error('Error fetching article content:', error));
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})`}} id='top' className="px-8 md:px-14 xl:px-40 py-20 gradient bg-gradient-to-tl from-pink-100 to-purple-200">
      <div className="space-x-2 mt-2 mb-4">
        {article.labels && article.labels.map((label, index) => (
          <span key={index} 
            className={`text-white text-sm px-2 py-1 rounded-full cursor-pointer ${labelColors[label]}`}>
            {label}
          </span>
        ))}
      </div>
      <hr className='h-[3px] bg-black mb-6'></hr>
      <div className="prose lg:prose-xl">
        <ReactMarkdown>{articleContent}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticlePage;
