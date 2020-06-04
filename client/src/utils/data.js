import axios from 'axios';

export const getQuestionData = async (id) => {
    return await axios
        .post('http://localhost:5000/api/questions/get-question', { id: id })
        .then((res) => {
            return res.data[0];
        });
};
