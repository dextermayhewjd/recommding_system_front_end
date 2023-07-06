import React, { useEffect, useState } from 'react';
import { submitBackground } from './apiService';

const Participant = (props) => {
  const questions = [
    { id: 1, text: 'Question 1: How many years have you been staying aboard?', options: [
      { text: 'Less than 1 year', value: 1 },
      { text: '1-5 years', value: 2 },
      { text: 'More than 5 years', value: 3 }
    ] },
    { id: 2, text: 'Question 2: How often do you communicate with British people(the way you chat with your friends)?', options: [
      { text: 'Once a week', value: 1 },
      { text: '2-3 times a week', value: 2 },
      { text: 'Almost everday', value: 3 }
    ] },
    { id: 3, text: 'Question 3: What is your overall IELTS score when you go abroad?', options: [
      { text: 'I have not take any IELTS tests before', value: 0 },
      { text: '6', value: 1 },
      { text: '6.5', value: 2 },
      { text: '7', value: 3 },
      { text: '7.5', value: 4 },
      { text: '8', value: 5 },
      { text: '8.5 and above', value: 6 },
    ] },
    { id: 4, text: 'Question 4: What school does your major belong to', options: [
      { text: 'School of Arts', value: 1 },
      { text: 'School of Humanities', value: 2 },
      { text: 'School of Modern Languages', value: 3 },
      { text: 'School of Humanities', value: 4 },
      { text: 'School of Computer Science, Electrical and Electronic Engineering, and Engineering Mathematics', value: 5 },
      { text: 'School of Civil, Aerospace and Mechanical Engineering', value: 6 },
      { text: 'Life Sciences', value: 7 },
      { text: 'School of Economics', value: 8 },
      { text: 'School of Education', value: 9 },
      { text: 'School for Policy Studies', value: 10 },
      { text: 'School of Sociology, Politics and International Studies', value: 11 },
      { text: 'University of Bristol Business School', value: 12 },
      { text: 'University of Bristol Law School', value: 13 },
    ] },
    { id: 5, text: 'Question 5: Does your study require lots of reading English Corpus ', options: [
      { text: 'Yes', value: 1 },
      { text: 'No', value: 0 },
    ] },
  ];

  const [background, setBackground] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('background', background);
  }, [background]);

  const handleBackgroundChange = (questionId, value) => {
    setBackground(prevBackground => ({
      ...prevBackground,
      [questionId]: value
    }));
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('totalConversations:',props.totalConversations);
    console.log('totalQuestions:',props.totalQuestions);
    console.log('totalAnswerSubmitted:',props.answerSubmitCount);
    console.log('totalFeedBackSubmit:',props.feedBackSubmitCount);


    if (background[1] && background[2]&& background[3]&&background[4]&&background[5]&&email) {
      
      if(props.totalConversations===props.feedBackSubmitCount 
        && 
        props.totalQuestions===props.answerSubmitCount){

          const backgroundData = {
        user_id: props.uniqueId, // replace with actual user_id
        background1: background[1],
        background2: background[2],
        background3: background[3],
        background4: background[4],
        background5: background[5],
        email: email,
        elapsedSeconds: props.elapsedSeconds,
        totalPlayTime: props.totalPlayTime,
        isSerious: props.elapsedSeconds >= props.totalPlayTime
        };   
        console.log(backgroundData);
        setIsSubmitted(true);
        
        // axios.post('http://server.eu-west-2.elasticbeanstalk.com/api/user_background/', backgroundData)
        //   .then(response => {
        //     console.log(response);
        //   })
        //   .catch(error => {
        //     console.error('There has been a problem with your axios operation:', error);
        //   });
        submitBackground(backgroundData)
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error submitting background:', error);
        });


        }
      else{
        alert('Please complete all the questions and feedback.');
      }
       
    } 
    else {
      alert('Please complete all the background questions below above.');
    }
  };

  return (
    <div className = 'feedback-container'>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          {questions.map(question => (
            <div key={question.id}>
              <label htmlFor={`question-${question.id}`}>{question.text}</label>
              <select
                value={background[question.id] || ''}
                onChange={event => handleBackgroundChange(question.id, event.target.value)}
              >
                <option value="">Select an option</option>
                {question.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                </option>
                ))}
              </select>
            </div>
          ))}
          <label htmlFor="email">please enter your Email Address for <br></br>receiving your amazon voucher:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Thank you for your background information!</p>
      )}
    </div>
  );
};

export default Participant;
