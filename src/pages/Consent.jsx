import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Route.module.css';

const ConsentPage = () => {
  return (
    <div className={styles['route-container']}>
      <h1 className={styles['route-heading']}>This is the Consent Page</h1>
      <p className={styles['route-paragraph']}>
        A growing number of funding agencies and journals require that the research data is Open Access, i.e. is uploaded into a publicly available online database.
        In such cases, research participants need to be aware that their (anonymised) data will become publicly available at the end of the study.
      </p>
      <h2 className={styles['route-heading']}>Participant Information Sheet:</h2>

      <h3 className={styles['route-heading']}>What will happen to my data?</h3>
      <p className={styles['route-paragraph']}>
        Your involvement in the study will remain confidential. This information will only be available to research staff and national bodies which monitor whether research studies are conducted properly.
        Your study data will be anonymised. This means that it will be given an identification number and any identifying information about you will be removed.
        Therefore, it will not be possible to identify you by name from any aspect of documentation or reporting for this research study.
        At the end of the study, your data will be made "Open Data". This means that it will be stored in an online database so that it is publicly available.
      </p>

      <h3 className={styles['route-heading']}>What is open data?</h3>
      <p className={styles['route-paragraph']}>
        Open data means that data is made available, free of charge, to anyone interested in the research or who wishes to conduct their analysis of the data.
        We will, therefore, have no control over how these data are used.
        However, all data will be anonymised before it is made available, and therefore there will be no way to identify you from the research data.
      </p>

      <h3 className={styles['route-heading']}>Why open data?</h3>
      <p className={styles['route-paragraph']}>
        Open access to research findings and access to data is considered best research practice and is a requirement of many funding bodies and journals.
        As a large proportion of research is publicly funded, the outcomes of the research should be made publicly available.
        Sharing data helps to maximize the impact of investment through wider use and encourages new avenues of research.
      </p>

      <h3 className={styles['route-heading']}>Consent Form:</h3>
      <p className={styles['route-paragraph']}>
        I understand that after the study, the data will be made "open data".
      </p>
      <p className={styles['route-paragraph']}>
        I understand that this means the anonymised data will be publicly available and may be used for purposes not related to this study,
        and it will not be possible to identify me from these data.
      </p>

      <Link to="/instruction" className={styles['route-next-button']}>Agree with the Consent Form</Link>
    </div>
  );
};

export default ConsentPage;
