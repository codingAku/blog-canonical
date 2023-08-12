import './App.css';
import React, { useState, useEffect } from 'react';


function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

function App() {
  const [postData, setPostData] = useState([]);
  const [cardStates, setCardStates] = useState({});
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Fetch data from the API
    fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
    .then(response => response.json())
    .then(data => {
   
      const initialCardStates = {};
      data.forEach(post => {
        initialCardStates[post.id] = false; 
      });
      setCardStates(initialCardStates);


      setPostData(data);

      const categoryData = {};
      data.forEach(post => {
        const categoryNames = post._embedded['wp:term'][1].map(category => category.name);
        categoryData[post.id] = categoryNames.join(', ');
      });
      setCategories(categoryData);
      
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);

  const toggleCardState = (cardId) => {
    setCardStates(prevStates => ({
      ...prevStates,
      [cardId]: !prevStates[cardId]
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          {postData.map(post => (
            <div className="col-4" key={post.id}>
               <div className={`p-card ${cardStates[post.id] ? 'expanded' : ''}`}>
                <h5>{categories[post.id].toString().toUpperCase().replace(/,([^,]*)$/, ' AND $1')}</h5>
                <hr className="u"></hr>
                <img className="p-card__image" style={{ borderRadius: "3px", marginTop:"10px" }} src={post.featured_media} alt={post.title.rendered} />
                <div className="p-card__inner u-no-padding">
                  <h3><a href={post.link}>{post.title.rendered}</a></h3>
                  <h5><i>
                    By <a href={post._embedded.author[0].link}>{post._embedded.author[0].name}</a> on {formatDate(post.date)}
                  </i>
                  </h5>
                  <hr className="u"></hr>
                  <div dangerouslySetInnerHTML={{ __html: `<small> ${post.content.rendered} </small>` }}></div>
                </div>
                  <span onClick={() =>toggleCardState(post.id)}><small><i>{cardStates[post.id] ? "See less" : "See more"}</i></small></span>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
