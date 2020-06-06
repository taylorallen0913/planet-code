import axios from 'axios';

export const getQuestionData = (id) => {
  return axios.post('/api/questions/get-question', { id }).then((res) => {
    return res.data[0];
  });
};
