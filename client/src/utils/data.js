import axios from 'axios';

export const getQuestionData = (id) => {
  return axios.post('/api/questions/get-one', { id }).then((res) => {
    return res.data[0];
  });
};
