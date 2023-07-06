import './Question.css'; // 导入CSS文件
import { useState } from 'react';
import axios from 'axios';
import { submitAnswer } from './apiService';

const Question=(props)=>{

  const extractedOptions = props.options.split(/\s*\*\*\*\s*/);

  const [selectedChoice, setSelectedChoice] = useState(''); 
  // 用于存储用户选择的答案
  const [isSubmitted, setIsSubmitted] = useState(false); 
  // to make sure the submit buttom will disappear 
  // key={question.question_id}
  // question_id={question.question_id}
  // question={question.question}
  // options = {question.options}
  // answer = {question.answer}
  // conversation_id = {question.conversation}

  const submitHandler = (event) =>{
    event.preventDefault();
    if(selectedChoice !== ''){
      const answerData = {
        userid: props.uniqueId,
        questionId: props.question_id,
        answer: selectedChoice,
        real_answer: props.answer,
        conversation_id: props.conversation_id
      };
      console.log(answerData);// 示例：在控制台输出答案数据
      setIsSubmitted(true);
      props.onChangeAnswerSumbitCount();
          // Here you would call your API to submit the feedback
      // axios.post('http://server.eu-west-2.elasticbeanstalk.com/api/user_answer_for_question/',answerData)
      // .then(response => {
      //   console.log(response);
      // })
      submitAnswer(answerData)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There has been a problem with your axios operation:', error);
      });

    }else{
        alert('please choose an option first ');
      };
  };

  const choiceChangeHandler = (event) => {
    if (!isSubmitted) {
      setSelectedChoice(event.target.value);
    }; // 更新用户选择的答案
  };

  return (
    <div className="question-container">
      <p className="question">Question: {props.question}</p>
      <form onSubmit={submitHandler}>
        <ul className="options">
        <li>
            <input type="radio" id="option-a" name="choice" value="A"
            checked={selectedChoice === 'A'}
            onChange={choiceChangeHandler} // 监听选项变化
            disabled={isSubmitted}
            ></input>
            {/* <label for="option-a">A: {props.choiceA}</label> */}
            <label for="option-a">{extractedOptions[0]}</label>
          </li>
          <li>
            <input type="radio" id="option-b" name="choice" value="B"
            checked={selectedChoice === 'B'}
            onChange={choiceChangeHandler} // 监听选项变化
            disabled={isSubmitted}
            ></input>
            {/* <label for="option-b">B: {props.choiceB}</label> */}
            <label for="option-b">{extractedOptions[1]}</label>
          </li>
          <li>
            <input type="radio" id="option-c" name="choice" value="C"
            checked={selectedChoice === 'C'}
            onChange={choiceChangeHandler} // 监听选项变化
            disabled={isSubmitted}
            ></input>
            {/* <label for="option-c">C: {props.choiceC}</label> */}
            <label for="option-c">{extractedOptions[2]}</label>
          </li>
          {extractedOptions[3] && (
          <li>
            <input type="radio" id="option-d" name="choice" value="D"
            checked={selectedChoice === 'D'}
            onChange={choiceChangeHandler} // 监听选项变化
            disabled={isSubmitted}
            ></input>
            <label for="option-d">{extractedOptions[3]}</label>
          </li>)}
        </ul>
        {!isSubmitted && <button type="submit">Submit</button>}
        {isSubmitted && (
          <div className="result">
            <p>already submit</p>
            <p>Your Choice is: {selectedChoice}</p>
          </div>
        )}
        </form>
        {isSubmitted && <p>sumbit button is hidden since the answer is already submitted</p>}
    </div>
  );
}

export default Question;