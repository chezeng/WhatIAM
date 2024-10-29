/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
function BlogPage({ theme }) {
  const [quote, setQuote] = useState(null); 
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const labelColors = {
    "Soliloquy": "bg-yellow-600",
    "Dialogue": "bg-green-500",
    "Software": "bg-blue-500",
    "Resonance": "bg-purple-500",
  };

  // Get the number of articles for each label
  const labelCounts = articles.reduce((acc, article) => {
    article.labels.forEach(label => {
      acc[label] = (acc[label] || 0) + 1;
    });
    return acc;
  }, {});

  // Filter articles by selected labels
  const handleLabelClick = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter(l => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  // Fetch and set a random quote
  useEffect(() => {
    fetch(`https://server.chengzeng.dev/api/quotes`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const randomQuote = data[Math.floor(Math.random() * data.length)];
          setQuote(randomQuote);
        } else {
          throw new Error('Received data is not an array or is empty');
        }
      })
      .catch(error => console.error('Error fetching quote:', error));
  }, []);

  useEffect(() => {
    fetch(`https://server.chengzeng.dev/api/articles`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
          setFilteredArticles(data);
        } else {
          throw new Error('Received data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  useEffect(() => {
    const filterByLabels = (articles) => {
      if (selectedLabels.length === 0) return articles;
      return articles.filter(article =>
        article.labels.some(label => selectedLabels.includes(label))
      );
    };

    const filterBySearch = (articles) => {
      if (searchQuery === '') return articles;
      return articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    const filtered = filterByLabels(filterBySearch(articles));
    setFilteredArticles(filtered);
  }, [selectedLabels, searchQuery, articles]);

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})`, color: '#1a1a1a', }}>
      <div id='top' className="container mx-auto p-16 pt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-8 col-span-1">
          <div className={`${theme.card.bg} ${theme.card.ring} hover:ring-4 text-center p-6 bg-opacity-60 backdrop-blur-lg shadow-lg rounded-xl hover:scale-102 duration-300 transition ease-in-out`}>
            <div className="w-24 h-24 mx-auto">
              <img className='rounded-full' src={`https://chezeng.github.io/Media/WhatIAM/Profile.jpg`} alt="Profile" />
            </div>
            <h2 className={`${theme.card.text} mt-4 mb-2 text-2xl font-extrabold`}>Cheng Zeng</h2>
            <p className='italic font-bold text-lg'>"An Artistic Engineer."</p>
            <hr className="border-t border-black my-4" />
            <div className="flex justify-center space-x-4">
              <a href="https://www.linkedin.com/in/chezeng" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className={` hover:text-black text-gray-600 w-7 h-7 hover:scale-110 transition duration-100 ease-out`}/></a>
              <a href="https://github.com/chezeng" target="_blank" rel="noopener noreferrer">
                <FaGithub className={`text-gray-600 w-7 h-7 hover:text-black hover:scale-110 transition duration-100 ease-out`}/></a>
              <a href="https://www.youtube.com/@chezeng" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-gray-600 w-7 h-7 hover:text-black hover:scale-110 transition duration-100 ease-out"/></a>
            </div>
          </div>

          {/* Daily Quote Section */}
          <div className={`${theme.card.bg} ${theme.card.ring} hover:ring-4 text-center space-y-4 p-6 bg-opacity-60 backdrop-blur-lg shadow-lg rounded-xl hover:scale-102 duration-300 transition ease-in-out`}>
            {quote ? (
              <div>
                <p className='italic'>"{quote.text}"</p>
                <br></br>
                <p className="italic font-bold">- {quote.author}</p>
              </div>
            ) : (
              <p>Loading quote...</p>
            )}
          </div>
          
          {/* Labels Section */}
          <div className={`${theme.card.bg} ${theme.card.ring} hover:ring-4 text-center space-y-4 p-6 bg-opacity-60 backdrop-blur-lg shadow-lg rounded-xl hover:scale-102 duration-300 transition ease-in-out`}>
            <h3 className="text-lg font-semibold mb-2">Labels</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(labelColors).map((label, index) => (
                <span
                  key={index}
                  className={`text-white px-3 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out ${labelColors[label]} ${selectedLabels.includes(label) ? 'ring-2 ring-black scale-105 transition duration-300 ease-in-out' : ''}`}
                  onClick={() => handleLabelClick(label)}
                >
                  {label} ({labelCounts[label] || 0})
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Articles */}
        <main className="col-span-2 space-y-8">
          {/* Search Bar */}
          <div className={`${theme.card.bg} ${theme.card.ring} hover:ring-4 p-6 bg-opacity-60 backdrop-blur-lg shadow-lg rounded-xl hover:scale-102 duration-300 transition ease-in-out`}>
            <input type="text" 
                   placeholder="Search..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full p-2 px-3 shadow-lg rounded-lg focus:outline-none" />
          </div>

          {/* Articles List */}
          <div className="space-y-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <article key={article.id} 
                         className={`${theme.card.bg} ${theme.card.ring} hover:ring-4 p-6 bg-opacity-60 backdrop-blur-lg shadow-lg rounded-xl hover:scale-102 duration-300 transition ease-in-out`}>
                  <Link to={`/${article.id}`}>
                    <img src={article.image} 
                         alt={article.title} 
                         className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"/>
                  </Link>
                  <h2 className="mt-3 text-2xl font-semibold">{article.title}</h2>
                  <p className="text-gray-400">{article.date}</p>
                  <div className="flex space-x-2 mt-2">
                    {article.labels.map((label, index) => (
                      <span key={index} 
                        className={`text-white text-sm px-2 py-1 rounded-full cursor-pointer  transition duration-300 ease-in-out ${labelColors[label]} ${selectedLabels.includes(label) ? 'ring-2 ring-black  transition duration-300 ease-in-out' : ''}`}
                        onClick={() => handleLabelClick(label)}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2">{article.preview}</p>
                  <Link to={`/${article.id}`} className="text-blue-400 hover:underline mt-4 block">Read more</Link>
                </article>
              ))
            ) : (
              <p>No articles found...</p>
            )}
          </div>
          
        </main>
      </div>
    </div>
  );
}

export default BlogPage;
