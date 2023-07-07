import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Route.module.css';


const HomePage = () => {
  return (
    <div className={styles['route-container']}>
      <h1 className={styles['route-heading']}>Thank you for participating in this survey</h1>
      <p className={styles['route-paragraph']}>This survey is used to collect the necessary data for building a hybrid recommending system</p>
      <p className={styles['route-paragraph']}>There are consent forms and instructions on the following pages</p>
      <p className={styles['route-paragraph']}>Your feedback and answers would be collected and shared</p>
      <p className={styles['route-paragraph']}>Your email address will only be used to send out Amazon vouchers and will be deleted afterward</p>
      <Link to="/consent" className={styles['route-next-button']}>Next Page for Consent Form</Link>
    </div>
  );
  
  
};

export default HomePage;
