import React, { useState, useEffect } from 'react';
import './styles.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col } from 'antd';
import { getQuestionData } from '../../utils/data';
import styled from 'styled-components';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/python/python.js');

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

const options = {
    lineNumbers: true,
    scrollbarStyle: null,
};

const Editor = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [questionData, setQuestionData] = useState();
    const [questionDataLoaded, setQuestionDataLoaded] = useState(false);
    const [value, setValue] = useState();
    const [token, setToken] = useState();
    const [currentLanguage, setCurrentLanguage] = useState(0);
    const [selectionValue, setCollectionValue] = useState();
    const [expectedOutput, setExpectedOutput] = useState(props.expected);
    const [questionDescription, setQuestionDescription] = useState(
        props.questionDescription
    );
    const [questionId, setQuestionId] = useState(props.id);

    const setData = async () => {
        setQuestionData(await getQuestionData(props.match.params.id));
        setQuestionDataLoaded(true);
    };

    useEffect(() => {
        setData();
    }, []);

    useEffect(() => {
        console.log(questionData);
    }, [questionData]);

    const submitCode = async () => {
        let token = '';

        // Get coding language selected
        let e = document.getElementById('language-selector');
        var language_num = e.options[e.selectedIndex].value;
        var language = 0;
        if (language_num == 1) {
            // Python
            language = 71;
        } else if (language_num == 2) {
            // Javascript
            language = 63;
        } else if (language_num == 3) {
            // C++
            language = 54;
        } else if (language_num == 4) {
            // C#
            language = 51;
        } else if (language_num == 5) {
            // Java
            language = 62;
        }

        const reqBody = {
            source_code: value,
            language_id: language,
        };

        if (expectedOutput != '') {
            reqBody.expected_output = expectedOutput;
        }

        // Request to submit source code and langauge, start compilation
        await axios
            .post(
                'https://cors-anywhere.herokuapp.com/https://api.judge0.com/submissions/?base64_encoded=false&wait=false',
                reqBody
            )
            .then(
                (response) => {
                    console.log(response);
                    setToken(response.data.token);
                },
                (error) => {
                    console.log(error);
                }
            );

        setTimeout(compileCode, 3000);
    };

    const compileCode = async () => {
        let statusCode = -1;

        let COMPILE_URL =
            'https://cors-anywhere.herokuapp.com/https://api.judge0.com/submissions/' +
            token +
            '?base64_encoded=false&fields=stdout,stderr,status_id,language_id';
        await axios.get(COMPILE_URL, config).then(
            (response) => {
                changeOutput(response.data.stdout);
                statusCode = response.data.status_id;
            },
            (error) => {
                console.log(error);
            }
        );
        if (statusCode === 1) {
            console.log('In Queue');
        }
        if (statusCode === 2) {
            console.log('Processing');
        }
        if (statusCode === 3) {
            if (expectedOutput != '') {
                questionCorrect();
                changeDebug('Your answer was correct.');
            } else {
                changeDebug('Your program compiled and ran successfully.');
            }
        }
        if (statusCode === 4) {
            console.log('Wrong Answer');
            changeDebug('Your answer was incorrect.');
        }
        if (statusCode === 5) {
            console.log('Time Limit Exceeded');
            changeOutput('Error.');
            changeDebug('The time limit was exceeded.');
        }
        if (statusCode === 6) {
            console.log('Compilation Error');
            changeOutput('Error.');
            changeDebug('Error during compiling.');
        }
        if (statusCode >= 7 && statusCode <= 12) {
            console.log('Runtime Error');
            changeOutput('Error.');
            changeDebug('Runtime error occured.');
        }
        if (statusCode === 13) {
            console.log('Internal Error');
            changeOutput('Error.');
            changeDebug('Internal error occured.');
        }
        if (statusCode === 14) {
            console.log('Exec Format Error');
            changeOutput('Error.');
            changeDebug('Exec format error occured.');
        }
    };

    const changeOutput = (o) => {
        document.getElementById('output-box').value = o;
    };

    const changeDebug = (o) => {
        document.getElementById('debug-box').value = o;
    };

    const runCode = () => {
        changeDebug('Compiling...');
        submitCode();
    };

    const saveCodeToState = (code) => {
        setValue(code);
    };

    const onSelectionChange = async () => {
        // Store language selected into a variable
        const oldLang = currentLanguage;
        const selection = getLanguage();

        // Update current language in state to selection
        setCurrentLanguage(selection);
        console.log(currentLanguage);

        // Load new code after switch
    };

    const getLanguage = () => {
        let e = document.getElementById('language-selector');
        let language_num = e.options[e.selectedIndex].value;
        return language_num;
    };

    const questionCorrect = async () => {
        axios
            .post('/api/correct', {
                userId: user.id,
                questionId: props.questionId,
            })
            .then((res) => {})
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {questionDataLoaded ? (
                <Row>
                    <Col flex={5}>
                        <div className="question">
                            <h1 className="question-name">
                                {questionData.name}
                            </h1>
                            <p className="question-description">
                                {questionDescription}
                            </p>
                            <br />
                            <br />
                            <br />
                            <br />
                            <p className="question-description">{props.hint}</p>
                        </div>
                    </Col>
                    <Col flex={6}>
                        <div>
                            <Solution>
                                <SolutionLabel>Solution</SolutionLabel>
                                <SolutionWrapper>
                                    <CodeMirror
                                        editorDidMount={(editor) => {
                                            //this.instance = editor;
                                        }}
                                        value={value}
                                        options={options}
                                        styles={{ marginTop: '10%' }}
                                        onBeforeChange={(
                                            editor,
                                            data,
                                            value
                                        ) => {
                                            setValue(value);
                                        }}
                                        onChange={(editor, data, value) => {
                                            saveCodeToState(value);
                                        }}
                                    />
                                </SolutionWrapper>
                            </Solution>

                            <OutputContainer>
                                <OutputLabel>Output</OutputLabel>
                                <OutputBox readOnly />
                            </OutputContainer>
                            {/* <div>
                            <DebugLabel>Debug</DebugLabel>
                            <DebugBox readOnly />
                        </div> */}
                            <div className="bottomPart">
                                <div className="box-one">
                                    <select
                                        onChange={onSelectionChange}
                                        id="language-selector"
                                        className="custom-select select-menu"
                                        data-live-search="true"
                                    >
                                        <option selected>Language</option>
                                        <option value="1">Python</option>
                                        <option value="2">Javascript</option>
                                        <option value="5">Java</option>
                                    </select>
                                </div>
                                <div className="box-two">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={runCode}
                                    >
                                        Run Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            ) : null}
        </div>
    );
};

const Solution = styled.div`
    padding-top: 2%;
`;

const SolutionLabel = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
`;

const SolutionWrapper = styled.div`
    border-style: solid;
    border-color: #0c1618 !important;
`;

const OutputContainer = styled.div`
    margin-top: 2%;
`;

const OutputBox = styled.textarea`
    padding-right: 2em;
    resize: none;
    height: 200px;
    background-color: #000;
    border: 1px solid #000;
    color: #00ff00;
    width: 100%;
    margin-top: -1%;
    font-family: courier new;
`;

const DebugBox = styled.textarea`
    padding-right: 2em;
    resize: none;
    height: 200px;
    background-color: #000;
    border: 1px solid #000;
    color: #00ff00;
    width: 100%;
    font-family: courier new;
`;

const OutputLabel = styled.h1`
    text-align: center;
`;

const DebugLabel = styled.h1`
    text-align: center;
`;

export default Editor;
