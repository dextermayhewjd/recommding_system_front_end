// config.js
const apiUrl = process.env.REACT_APP_ENV === 'production'
  ? 'http://server.eu-west-2.elasticbeanstalk.com' // 生产环境地址
  : 'http://localhost:8000'; // 开发环境地址

const config = {
  apiUrl: apiUrl
};

export default config;
