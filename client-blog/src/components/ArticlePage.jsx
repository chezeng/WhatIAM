import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function ArticlePage() {
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
    <div className="px-20 md:px-48 xl:px-72 pt-20">
      <div className="flex space-x-2 mt-2 mb-4">
        {article.labels && article.labels.map((label, index) => (
          <span key={index} 
            className={`text-white text-sm px-2 py-1 rounded-full cursor-pointer ${labelColors[label]}`}>
            {label}
          </span>
        ))}
      </div>
      
      <ReactMarkdown className='markdown'>{articleContent}</ReactMarkdown>

    </div>
  );
}

export default ArticlePage;
