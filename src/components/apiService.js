// apiService.js
import axios from 'axios';
import config from '../config/config';

const API_BASE_URL = config.apiUrl;

export async function getConversations() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/conversations/eighitConversations/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving conversations:', error);
    throw error;
  }
}

export async function generateUniqueId() {
  try {
    const response = await axios.get(`${API_BASE_URL}/generate_unique_id/`);
    return response.data.unique_id;
  } catch (error) {
    console.error('Error retrieving unique ID:', error);
    throw error;
  }
}

export async function submitAnswer(answerData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user_answer_for_question/`, answerData);
    return response.data;
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
}

export async function submitFeedback(feedbackData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user_feedback/`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}


export async function submitBackground(backgroundData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user_background/`, backgroundData);
    return response.data;
  } catch (error) {
    console.error('Error submitting background:', error);
    throw error;
  }
}