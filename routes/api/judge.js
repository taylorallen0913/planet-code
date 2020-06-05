require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Send submission to api and send token back to user
router.post('/send-submission', async (req, res) => {
    const { language_id, source_code, expected_output } = req.body;
    await axios
        .post(
            'https://judge0.p.rapidapi.com/submissions',
            {
                language_id,
                source_code,
                expected_output,
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
router.post('/get-submission', async (req, res) => {
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
