import React, { useState, useEffect } from 'react';

import AceEditor from 'react-ace';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col, Select } from 'antd';
import { getQuestionData } from '../../utils/data';
import styled from 'styled-components';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';
import './styles.css';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

const { Option } = Select;

const Editor = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [questionData, setQuestionData] = useState();
    const [questionDataLoaded, setQuestionDataLoaded] = useState(false);
    const [value, setValue] = useState();
    const [token, setToken] = useState();
    const [currentLanguage, setCurrentLanguage] = useState(0);
    const [expectedOutput, setExpectedOutput] = useState(props.expected);
    const [questionDescription, setQuestionDescription] = useState(
        props.questionDescription
    );
    const [questionId, setQuestionId] = useState(props.id);

    const setData = async () => {
        setQuestionData(await getQuestionData(props.match.params.id));
        setQuestionDataLoaded(true);
        getPlaceholder();
    };

    useEffect(() => {
        setData();
    }, []);

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

    const questionCorrect = async () => {
        axios
            .post('/api/correct', {
                userId: user.id,
                questionId: props.questionId,
            })
            .then((res) => {})
            .catch((err) => console.log(err));
    };

    const onLoad = () => {};

    const onChange = () => {};

    const handleChange = (val) => {
        setCurrentLanguage(val);
    };

    const displayLanguage = () => {
        let language = '';
        switch (currentLanguage) {
            case 0:
                language = 'Language';
                break;
            case 1:
                language = 'Python';
                break;
            case 2:
                language = 'Java';
                break;
            case 3:
                language = 'C++';
                break;
            case 4:
                language = 'Javascript';
                break;
            default:
                language = 'Language';
                break;
        }
        return language;
    };

    const getPlaceholder = () => {
        switch (currentLanguage) {
            case 1:
                setValue(questionData.python);
                break;
            default:
                setValue('Please select a language');
                break;
        }
    };

    return (
        <div>
            {questionDataLoaded ? (
                <Row>
                    <Col flex={3}>
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
                        <Right>
                            <div>
                                <Solution>
                                    <SolutionHeader>
                                        <LanguageSelector>
                                            <Select
                                                bordered={false}
                                                value={displayLanguage()}
                                                style={{
                                                    width: 120,
                                                    color: '#D3D3D3',
                                                }}
                                                onChange={handleChange}
                                            >
                                                <Option value={1}>
                                                    Python
                                                </Option>
                                                <Option value={2}>Java</Option>
                                                <Option value={3}>C++</Option>
                                                <Option value={4}>
                                                    Javascript
                                                </Option>
                                            </Select>
                                        </LanguageSelector>
                                        <SolutionLabel>Solution</SolutionLabel>
                                    </SolutionHeader>
                                    <AceEditor
                                        style={{ width: '100%' }}
                                        mode="python"
                                        theme="twilight"
                                        name="blah2"
                                        onLoad={onLoad}
                                        onChange={onChange}
                                        fontSize={15}
                                        showPrintMargin={false}
                                        showGutter={true}
                                        highlightActiveLine={true}
                                        value={value}
                                        setOptions={{
                                            enableBasicAutocompletion: true,
                                            enableLiveAutocompletion: true,
                                            enableSnippets: false,
                                            showLineNumbers: true,
                                            tabSize: 2,
                                        }}
                                    />
                                </Solution>

                                <Output>
                                    <OutputHeader>
                                        <OutputLabel>Output</OutputLabel>
                                    </OutputHeader>
                                    <OutputBox readOnly />
                                </Output>
                            </div>
                        </Right>
                    </Col>
                </Row>
            ) : null}
        </div>
    );
};

const Left = styled.div``;

const Right = styled.div`
    margin-right: 3%;
`;

const Solution = styled.div`
    padding-top: 1%;
`;

const SolutionHeader = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #444444;
`;

const SolutionLabel = styled.h1`
    font-family: 'Lato', sans-serif;
    color: white;
    font-size: 1.7em;
    margin: 1% 0 0 35%;
`;

const LanguageSelector = styled.div`
    padding: 1em 0 1em 2.3em;
    background-color: #444444;
`;

const Output = styled.div`
    margin-top: 2%;
`;

const OutputHeader = styled.div`
    background-color: #444444;
    margin: 0;
    padding: 0;
`;

const OutputBox = styled.textarea`
    resize: none;
    height: 200px;
    background-color: #000;
    border: 1px solid #000;
    color: #00ff00;
    width: 100%;
    margin-top: -1.3%;
    font-family: courier new;
`;

const OutputLabel = styled.h1`
    font-family: 'Lato', sans-serif;
    padding: 1% 0 1% 0;
    color: white;
    font-size: 1.8em;
    text-align: center;
`;

export default Editor;
