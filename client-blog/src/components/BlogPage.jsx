import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

function BlogPage() {
  const [quote, setQuote] = useState(null);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const labelColors = {
    "Software": "bg-blue-500",
    "Audio-Visual": "bg-red-500",
    "Music Critique": "bg-purple-500",
    "Philosophy": "bg-green-500",
    "Gaming": "bg-yellow-500",
    "Experience": "bg-teal-500",
  };

  useEffect(() => {
    fetch('https://server.chengzeng.dev/api/quotes')
      .then(response => response.json())
      .then(data => setQuote(data))
      .catch(error => console.error('Error fetching quote:', error));
  }, []);

  useEffect(() => {
    fetch('https://server.chengzeng.dev/api/articles')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setFilteredArticles(data);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

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
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Profile section */}
      <div id='intro' className="container mx-auto p-16 pt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-8 col-span-1">
          <div className="bg-gray-700 p-6 rounded-lg text-center space-y-4 ml-5 md:m-auto">
            <div className="w-24 h-24 mx-auto">
              <img className='rounded-full' src='/src/assets/Profile.jpg' alt="Profile" />
            </div>
            <h2 className="text-xl font-semibold">Cheng Zeng</h2>
            <p>"An Artistic Engineer."</p>
            <hr className="border-t border-gray-500 my-4" />
            <div className="flex justify-center space-x-4">
              <a href="https://www.linkedin.com/in/chezeng" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-white w-7 h-7 hover:text-blue-500 hover:scale-110 transition duration-100 ease-out"/></a>
              <a href="https://github.com/chezeng" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-white w-7 h-7 hover:text-blue-500 hover:scale-110 transition duration-100 ease-out"/></a>
              <a href="https://www.youtube.com/@chezeng" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-white w-7 h-7 hover:text-blue-500 hover:scale-110 transition duration-100 ease-out"/></a>
            </div>
          </div>

          {/* Daily Quote Section */}
          <div className="bg-gray-700 p-6 rounded-lg text-center ml-5 md:ml-0">
            {quote ? (
              <div>
                <p>"{quote.text}"</p>
                <br></br>
                <p className="italic font-bold">- {quote.author}</p>
              </div>
            ) : (
              <p>Loading quote...</p>
            )}
          </div>
          
          {/* Labels Section */}
          <div className="bg-gray-700 p-6 rounded-lg text-center ml-5 md:ml-0">
            <h3 className="text-lg font-semibold mb-2">Labels</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(labelColors).map((label, index) => (
                <span
                  key={index}
                  className={`text-white px-3 py-2 rounded-full cursor-pointer ${labelColors[label]} ${selectedLabels.includes(label) ? 'ring-2 ring-white' : ''}`}
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
          <div className="bg-gray-700 p-4 rounded-lg">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 bg-gray-600 rounded-lg focus:outline-none"
            />
          </div>

          {/* Articles */}
          <div className="space-y-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <article key={article.id} className="bg-gray-700 p-6 rounded-lg">
                  <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <p className="text-gray-400">{article.date}</p>
                  <div className="flex space-x-2 mt-2">
                    {article.labels.map((label, index) => (
                      <span key={index} 
                      className={`text-white text-sm px-2 py-1 rounded-full cursor-pointer ${labelColors[label]} ${selectedLabels.includes(label) ? 'ring-2 ring-white' : ''}`}
                      onClick={() => handleLabelClick(label)}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2">{article.preview}</p>
                  <Link to={`/articles/${article.id}`} className="text-blue-400 hover:underline mt-4 block">Read more</Link>
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
