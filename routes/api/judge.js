require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Send submission to api and send token back to user
router.post('/', async (req, res) => {
    const { language_id, source_code } = req.body;
    await axios
        .post(
            'https://judge0.p.rapidapi.com/submissions',
            {
                language_id,
                source_code,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-host': 'judge0.p.rapidapi.com',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    useQueryString: true,
                },
            }
        )
        .then((data) => {
            res.send(data.data.token);
        })
        .catch((err) => console.log(err));
});

// Return results of submission
router.get('/', async (req, res) => {
    const token = req.body.token;
    await axios
        .get(`https://judge0.p.rapidapi.com/submissions/${token}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': 'judge0.p.rapidapi.com',
                'x-rapidapi-key': RAPIDAPI_KEY,
                useQueryString: true,
            },
        })
        .then((data) => {
            res.send(data.data);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
