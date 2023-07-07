import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Route.module.css';

const InstructionPage = () => {
  return (
    <div className={styles['route-container']}>
      <h1 className={styles['route-heading']}>Here are some Instructions</h1>
      <h2 className={styles['route-heading']}>Please read the instructions before heading towards the testing</h2>
      <p className={styles['route-paragraph']}>There are 10 conversations, everyone one of them has 1-4 questions</p>
      <p className={styles['route-paragraph']}>After you hit the play button, the audio will play only once</p>
      <p className={styles['route-paragraph']}>There is a feedback section after you complete all the questions with that conversation</p>
      <p className={styles['route-paragraph']}>You will quantify the hardness of the listening material and the questions</p>
      <p className={styles['route-paragraph']}>
        Very Easy means you understand all the conversations and almost 100% sure that the answers you submit are correct
      </p>
      <p className={styles['route-paragraph']}>
        Very Difficult means you barely understand the conversations and are not sure whether any of the answers you submit are correct or not
      </p>
      <Link to="/mainpage" className={styles['route-next-button']}>Head for the Testing</Link>
    </div>
  );
};

export default InstructionPage;
