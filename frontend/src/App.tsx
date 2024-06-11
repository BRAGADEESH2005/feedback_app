import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'; 

interface Feedback {
  id: number;
  name: string;
  feedback: string;
}

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setError('');
      const response = await axios.get<Feedback[]>(`http://localhost:5000/feedbacks`);
      console.log("response",response);
      setFeedbacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedbacks', { name, feedback });
      setName('');
      setFeedback('');
      fetchFeedbacks();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 429) {
        setError("You can send feedback only after 10 seconds");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Feedback System</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback"
            required
            className="textarea"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">Submit</button>
      </form>
      <hr className='line'/>
      <h2 className="subtitle">All Feedbacks</h2>
      <ul className="feedback-list">
        {feedbacks.map((fb) => (
          <li key={fb.id} className="feedback-item">
            <strong>{fb.name}</strong>: {fb.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
