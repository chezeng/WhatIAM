import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const labelColors = {
    "Software": "bg-blue-500",
    "Audio-Visual": "bg-red-500",
    "Music Critique": "bg-purple-500",
    "Philosophy": "bg-green-500",
    "Gaming": "bg-yellow-500",
    "Experience": "bg-teal-500",
  };

  useEffect(() => {
    fetch(`http://localhost:5000/articles/${id}`)
      .then(response => response.json())
      .then(data => setArticle(data))
      .catch(error => console.error('Error fetching quote:', error));
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="px-20 md:px-48 xl:px-72 pt-32">
      <div className="flex space-x-2 mt-2 mb-4">
        {article.labels.map((label, index) => (
          <span key={index} 
          className={`text-white text-sm px-2 py-1 rounded-full cursor-pointer ${labelColors[label]}`}>
            {label}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-8">{article.date}</p>
      <img src={article.image} alt={article.title} className="mb-8 w-full h-auto" />
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
}

export default ArticlePage;
