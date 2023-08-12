import './App.css';
import React, { useState, useEffect } from 'react';

/**
 * Accepts a date string with date and time information
 * and returns a new date string that is in a format to display.
 * @param {string} dateString Date string with date and time information.
 * @returns Date string in DD Month YYYY format.
 */
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

function App() {
  //holds the post data fetched from the given URL.
  const [postData, setPostData] = useState([]);

  //holds the card states for 'See More'/'See less' span functionality.
  const [cardStates, setCardStates] = useState({});

  //holds the group names of each post to display.
  const [groups, setGroups] = useState({});

  useEffect(() => {
    // Fetches data from the API.
    fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
    .then(response => response.json())
    .then(data => {
   
      //Sets initial card states to false.
      const initialCardStates = {};
      data.forEach(post => {
        initialCardStates[post.id] = false; 
      });
      setCardStates(initialCardStates);

      /*Sets group names for each post.

      (This part could be changed into setting topic, tag or category data.
         It was unclear for the developer so she decided to display group names.)
      */
      const groupData = {};
      data.forEach(post => {
        const groupNames = post._embedded['wp:term'][1].map(group => group.name);
        groupData[post.id] = groupNames.join(', ').toUpperCase().replace(/,([^,]*)$/, ' AND $1');
      });
      setGroups(groupData);
      
      setPostData(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);

  /**
   * toggle the card state of post when 'See More'/'See less' is clicked.
   * @param {number} postId Id of the post.
   */
  const toggleCardState = (postId) => {
    setCardStates(prevStates => ({
      ...prevStates,
      [postId]: !prevStates[postId]
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          {postData.map(post => (
            <div className="col-4" key={post.id}>
               <div className={`p-card ${cardStates[post.id] ? 'expanded' : ''}`}>
                <h5>{groups[post.id]}</h5>
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
