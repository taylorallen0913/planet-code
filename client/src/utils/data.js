import axios from 'axios';

export const getQuestionData = (id) => {
  return axios
    .post('http://localhost:5000/api/questions/get-question', { id })
    .then((res) => {
      return res.data[0];
    });
};
