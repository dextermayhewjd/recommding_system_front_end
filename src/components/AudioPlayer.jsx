import React, { useEffect, useState } from 'react';
import './AudioPlayer.css'
const AudioPlayer = (props) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    const audioElement = new Audio(props.unique_url);

    audioElement.addEventListener('loadedmetadata', () => {
      const duration = audioElement.duration;
      setAudioDuration(duration);
      props.onGetTotalPlayTime(duration);
    });

    return () => {
      audioElement.removeEventListener('loadedmetadata', () => {});
    };
  }, [props.unique_url]);



  const handlePlay = async () => {
    const audioElement = new Audio(props.unique_url);
    props.onChangeTimeStartStatus(true);
    console.log('Unique URL:', props.unique_url); // 在控制台打印 unique_url 的值

    try {
      audioElement.play(); // 播放音频
      setIsPlayed(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <div className="audio-player-container">
      {!isPlayed && <button onClick={handlePlay}>Click to listen to this conversation</button>}
      {isPlayed && (
        <div>
          <p>Already heard the conversation once</p>
          <p>Please listen carefully as you cannot play it twice</p>
        </div>
      )}
       <p>Audio duration: {audioDuration} seconds</p>
    </div>
  );
}

export default AudioPlayer;