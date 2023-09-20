import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [randomImage, setRandomImage] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch a random image
  useEffect(() => {
    fetchComments();
  
    axios
      .get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'HJsRSGQFlXaNlSYI1ScA6dCzDt8ykvuADd26Lmjz-8w',
        },
      })
      .then((response) => {
        setRandomImage(response.data.urls.regular);
      })
      .catch((error) => {
        console.error('Error fetching random image:', error);
      });
  }, []);

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      axios
        .post('http://localhost:3000/api/comments', { comment })
        .then((response) => {
          console.log(response.data);
          // Refresh comments after submission
          fetchComments();
        })
        .catch((error) => {
          console.error('Error submitting comment:', error);
        });
      setComment('');
    }
  };

  const fetchComments = () => {
    axios
      .get('http://localhost:3000/api/comments')
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  return (
    <div>
      <h1>Random Image Viewer</h1>
      {randomImage && <img src={randomImage} alt="Random" />}

      <div>
        <input
          type="text"
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>

      <div>
        <h2>Comments:</h2>
        <ul>
          {comments.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
