import Introductions from "./components/Introductions";
import './components/App.css';
import './components/Question.css'; // 导入CSS文件
import Question from "./components/Questions";
import FeedBack from "./components/FeedBacks";
import AudioPlayer from "./components/AudioPlayer";
import Cookies from "js-cookie";
import Participant from "./components/Participants";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getConversations,generateUniqueId } from "./components/apiService";


function App() {
  const [conversation, setConversation] = useState([]);
  const [uniqueId, setUniqueId] = useState('');
  const [audioPlayedCount, setAudioPlayedCount] = useState(0); // 添加计数器
  const [answerSubmitCount, setAnswerSubmitCount] = useState(0); // 添加计数器
  const [feedBackSubmitCount, setFeedBackSubmitCount] = useState(0); // 添加计数器
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalConversations, setTotalConversations] = useState(0);
  
  const [isTimerStarted, setIsTimerStarted] = useState(false); // 新增计时器状态
  const [elapsedTime, setElapsedTime] = useState(0); // 新增已经过去的时间状态
  const [startTime, setStartTime] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0); // 新增总的播放时间状态

  
  // const url_for_getting_data = `http://server.eu-west-2.elasticbeanstalk.com/api/conversations/eighitConversations/`;
  // const urlForGettingUniqueId = `http://server.eu-west-2.elasticbeanstalk.com/generate_unique_id/`; // 替换为实际的后端URL
  useEffect(() => {
      // API url

      // Make a GET request 
      // 获取对话数据
      // axios.get(url_for_getting_data)
      // .then(response => {
      //     console.log(response.data);
      //     setConversation(response.data); // Wrap the response data in an array // Set state here
      //     setTotalConversations(response.data.length);// by getting the length of the data 
      //     setTotalQuestions(response.data.reduce((total,dialogue) => total + dialogue.questions.length,0))
      //   })
      // .catch(error => {
      //     console.error('There has been a problem with your axios operation:', error);
      // });
      getConversations()
      .then(data =>{
          console.log(data);
          setConversation(data);
          setTotalConversations(data.length);
          setTotalQuestions(data.reduce((total,dialogue) => total + dialogue.questions.length,0))
      }).catch(error => {
            console.error('There has been a problem with your axios operation:', error);
        });
 

    // 获取唯一ID
    const existingUniqueId = Cookies.get('uniqueId')
    if(existingUniqueId){
      setUniqueId(existingUniqueId);
      console.log('already got'+{existingUniqueId})
    }else{
    // axios.get(urlForGettingUniqueId)
    //   .then(response => {
    //     console.log(response.data);
    //     setUniqueId(response.data.unique_id);
    //     Cookies.set('uniqueId', response.data.unique_id);
    //   })
    //   .catch(error => {
    //     console.error('Error retrieving unique ID:', error);
    //   });
        generateUniqueId()
        .then(data => {
          console.log(data);
          setUniqueId(data.uniqueId);
          Cookies.set('uniqueId', data.unique_id);
        })
        .catch(error => {
          console.error('Error retrieving unique ID:', error);
        });

    }
  }, []); // [] means run once after initial render

  useEffect(() => {
    console.log('totalConversations:', totalConversations);
    console.log('totalQuestions:',      totalQuestions);
    console.log('totalAnswerSubmitted:', answerSubmitCount);
    console.log('totalFeedBackSubmit:', feedBackSubmitCount);
  }, [totalConversations, totalQuestions,answerSubmitCount,feedBackSubmitCount]);

  // use it to show whether it is already fine to sumbit the answer 
  useEffect(() => {
    // console.log("播放时间"+totalPlayTime);
    if (isTimerStarted) {
      const timer = setTimeout(() => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - startTime;
        setElapsedTime(timeDiff/ 1000);
        // const elapsedSeconds = Math.floor(elapsedTime / 1000);
        
        console.log("现在时间 " + new Date(currentTime).toISOString()); // 将当前时间转换为可读的日期字符串
        console.log("开始时间 " + new Date(startTime).toISOString()); // 将开始时间转换为可读的日期字符串
        console.log("elapsedTime " + elapsedTime + " 秒");
        console.log("播放时间 " + totalPlayTime + " 秒");
        if (elapsedTime >= totalPlayTime + 500) {
          // to give user enough time to fufill all the places 
          clearTimeout(timer);
          console.log("已超过所有播放时间");
        }
      }, 1000); // 每秒钟检查一次时间差

      return () => clearTimeout(timer); // 组件卸载时清除计时器
    }
  }, [isTimerStarted, elapsedTime, startTime, totalPlayTime]);


  const countAnswerHandler = () =>{
    setAnswerSubmitCount(prevCount => prevCount + 1); // 更新计数器
    // setAnswerSubmitCount((prevCount)=>{
    //   return prevCount + 1; 
    // });same as pure arrow function 
    // console.log('answer'+answerSubmitCount);
    // will not update immediate
    //调用setAnswerSubmitCount和setFeedBackSubmitCount函数时，状态更新并不是立即生效的。
    //setState函数是异步的，React 会将多个setState调用合并为一个更新操作，以提高性能。因此console.log中打印的值可能是之前的状态值。
    //要在状态更新之后立即获取最新的状态值，
    //用useEffect钩子来监听状态的变化。在useEffect中，添加对应状态的依赖项，一旦状态发生变化，useEffect内的代码将被执行。
  }


  const totalPlayTimeHandler =(newTime)=>{
    setTotalPlayTime(prevTime => prevTime + newTime);//update total play time
    console.log('total play time '+totalPlayTime);
  }

  const timeStartHandler = () =>{
    if (!isTimerStarted) {
      setIsTimerStarted(true);
      setStartTime(new Date().getTime());
    }// if is timer is already started then there is no need to set the start time again 
  }


  const countFeedbackHandler = () =>{
    setFeedBackSubmitCount(prevCount => prevCount + 1); // 更新计数器
    console.log('feedback'+feedBackSubmitCount)
  }

  const countAduioPlayedHandler = () =>{
    setAudioPlayedCount(prevCount => prevCount + 1); // 更新计数器
    console.log('audio'+audioPlayedCount)
  }

  return (
    <div>
      <Introductions></Introductions>
      {conversation.map((dialogue, index) => (
        <div key={index}>
          <h1>These questions are from {dialogue.id}</h1>
          <AudioPlayer
          unique_url = {dialogue.conversation_audio_url[0].url}
          onChangePlayAudioNum = {countAduioPlayedHandler}
          onGetTotalPlayTime = {totalPlayTimeHandler}
          onChangeTimeStartStatus = {timeStartHandler}
          >
          </AudioPlayer>
          
          {dialogue.questions.map((question) => (
            <Question
              key={question.id}
              question_id={question.id}
              question={question.question}
              options = {question.options}
              answer = {question.answer}
              conversation_id = {dialogue.id}
              uniqueId={uniqueId}
              onChangeAnswerSumbitCount = {countAnswerHandler}
            />
          ))}
          <FeedBack 
          conversationId={dialogue.id} 
          uniqueId={Cookies.get('uniqueId')}
          onChangeFeedbackSumbitCount = {countFeedbackHandler}
          />
        </div>
      ))}

      <Participant
        uniqueId={Cookies.get('uniqueId')}
        totalConversations ={totalConversations}
        totalQuestions     ={totalQuestions}
        answerSubmitCount  ={answerSubmitCount}
        feedBackSubmitCount={feedBackSubmitCount}
        totalPlayTime={totalPlayTime}
        elapsedSeconds={elapsedTime}
      ></Participant>
    </div>
  );
}

export default App;
