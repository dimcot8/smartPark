// HelpPage.js
import React, { useState } from 'react';
import '../styles/help.css';
import { useNavigate } from 'react-router-dom';
const HelpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [problem, setProblem] = useState('');
    const [submissionResult, setSubmissionResult] = useState(null);
    
        const navigate = useNavigate();
      
        const navigateToAbout = () => {
          navigate('/Help');
        };
      
        const goBack = () => {
          navigate(-1);
        };
    const handleSubmit = async () => {
      try {
        const response = await fetch("https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/help/submit", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, problem }),
        });
  
        if (response.ok) {
          // Successfully submitted
          setSubmissionResult('Form submitted successfully!');
          setName('');
          setEmail('');
          setProblem('');
        } else {
          // Handle error
          setSubmissionResult('Error submitting form. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error.message);
        setSubmissionResult('Error submitting form. Please try again.');
      }
    };

  return (
    <section>
      <div className="register">
      <div className="navigation-contai">
    <button onClick={goBack} className="go-back-button">
          ← Go Back
        </button>
        <br></br> </div>
      <h1>Contact Support Team</h1>
      
      <div>
      
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="problem">Describe your problem:</label>
            <textarea
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>

          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        {submissionResult && (
        <div>
          <p>{submissionResult}</p>
        </div>
      )}
      </div>

      <div>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul>
          <li>
            <div className='que'>Q: What is SmartPark?</div>
            <p>
              SmartPark is a revolutionary parking management system that aims to transform traditional parking operations
              using advanced technologies.
            </p>
          </li>

          <li>
          <div className='que'>Q: How does SmartPark work?</div>
          
            <p>
              Our cutting-edge solution leverages Internet of Things (IoT) and cloud computing to streamline parking
              processes, enhance customer experiences, optimize resource utilization, and generate new revenue streams.
            </p>
          </li>

          <li>
          <div className='que'>Q: What are the benefits of using SmartPark?</div>
            <p>
              With SmartPark, we strive to revolutionize the way parking is managed in downtown areas, reducing
              congestion, improving convenience, and providing stress-free parking experiences for car owners.
            </p>
          </li>
        </ul>
      </div>
    </div></section>
  );
};

export default HelpPage;
