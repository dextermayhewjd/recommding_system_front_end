
import axios from 'axios';
import { useState } from 'react';
import './FeedBack.css'
const FeedBack =(props)=>{

const questions = [
  { id: 1, text: 'Question 1: How challenging was it to understand the listening material?' },
  { id: 2, text: 'Question 2: How challenging was it to complete all the questions?' },
  // Add more questions as needed
];

const [feedback, setFeedback] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false); 

const handleFeedbackChange = (questionId, value) => {
  setFeedback(prevFeedback => ({
    ...prevFeedback,
    [questionId]: value
  }));
};

const handleSubmit = (event) => {
  // Send feedback data to the backend or perform other actions
  event.preventDefault();
  console.log(feedback);
  if (feedback[1] && feedback[2]) {
    
    // Here you would call your API to submit the feedback
    axios.post('http://server.eu-west-2.elasticbeanstalk.com/api/user_feedback/', {
      user_id: props.uniqueId, // replace with actual user_id
      conversation_id: props.conversationId,
      feedback1: feedback[1],
      feedback2: feedback[2]
    })
    .then(response => {
      console.log(response);
      // setFeedback(""); // clear the feedback field
    })
    .catch(error => {
      console.error('There has been a problem with your axios operation:', error);
    });
    props.onChangeFeedbackSumbitCount();
    console.log(feedback);// 示例：在控制台输出答案数据
    setIsSubmitted(true);
    
    // 将answerData发送给后端，可以使用fetch、axios等方法发送HTTP请求
  }else{
    alert('please enter your feedback first ');
  };
};

        return (
          <div className='feedback-container'>
            <h2>Feedback for this conversation and questions</h2>
            {questions.map(question => (
              <div key={question.id}>
                <p>{question.text}</p>
                <select
                  className="feedback-container select"
                  value={feedback[question.id] || ''}
                  onChange={e => handleFeedbackChange(question.id, e.target.value)}
                  disabled={isSubmitted} // Disable the select element when the form is submitted
                >
                  <option value="">Select an option</option>
                  <option value="1">Very Easy</option>
                  <option value="2">Easy</option>
                  <option value="3">Moderate</option>
                  <option value="4">Difficult</option>
                  <option value="5">Very Difficult</option>
                </select>
              </div>
            ))}
            
            {!isSubmitted && <button className="feedback-container button" onClick={handleSubmit}>Submit Feedback</button>}
            
            {isSubmitted && (
            <div className='feedback-container result'>
              <p>already submit</p>
              <p>Your FeedBack from the questions are: {feedback[1]},{feedback[2]}</p>
            </div>
            )}

          </div>
        );
        };
export default FeedBack;