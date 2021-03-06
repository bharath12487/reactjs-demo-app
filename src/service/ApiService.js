import axios from 'axios';

const USER_API_BASE_URL = 'https://rails-demoapp.herokuapp.com/questions';
const API_BASE_URL = 'https://rails-demoapp.herokuapp.com';

class ApiService {

    fetchRoles() {
        return axios.get(API_BASE_URL + '/' + 'roles');
    }

    fetchMappings() {
        return axios.get(API_BASE_URL + '/' + 'mappings');
    }

    fetchQuestions(paramsdata) {
        return axios.get(USER_API_BASE_URL,{params: paramsdata});
    }

    fetchQuestionById(questionId) {
        return axios.get(USER_API_BASE_URL + '/' + questionId);
    }

    deleteQuestion(questionId) {
        return axios.delete(USER_API_BASE_URL + '/' + questionId);
    }

    addQuestion(question) {
        return axios.post(USER_API_BASE_URL, question);
    }

    editQuestion(question) {
        return axios.put(USER_API_BASE_URL + '/' + question.id, question);
    }

}

export default new ApiService();