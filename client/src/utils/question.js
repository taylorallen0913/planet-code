import axios from 'axios';

export const parseText = (input) => {
  let parsedInput = input;
  parsedInput = parsedInput.split('\\n').join('\n');
  parsedInput = parsedInput.split('\\t').join('\t');
  return parsedInput;
};

export const getQuestionData = (id) => {
  return axios.post('/api/questions/get-one', { id }).then((res) => {
    return res.data[0];
  });
};
