import './App.css';
import React, { useState, useEffect } from 'react';
import Card from '@canonical/react-components/dist/components/Card/Card';
import Strip from '@canonical/react-components/dist/components/Strip/Strip';

function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

function App() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log(postData);

  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          {postData.map(post => (
            <div className="col-4" key={post.id}>
              <Card className="card" highlighted>
                <h3>CLOUD AND SERVER</h3>
                <hr className="u-sv1"></hr>
                <img className="p-card__image" style={{ borderRadius: "5px" }} src={post.featured_media} alt={post.title.rendered} />
                <div className="p-card__inner u-no-padding">
                  <h3><a href={post.link}>{post.title.rendered}</a></h3>
                  <i style={{ fontSize: '0.75em' }}>
                    By <a href={post._embedded.author[0].link}>{post._embedded.author[0].name}</a> on {formatDate(post.date)}
                  </i>
                </div>
                <hr className="u-sv1"></hr>
                <div className="p-card__inner u-no-padding">
                  <p>
                    <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
