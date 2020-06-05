import React, { useState, useEffect } from 'react';

import AceEditor from 'react-ace';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import produce from 'immer';
import { Row, Col, Select, Button } from 'antd';
import Question from '../../components/Question';
import { getQuestionData } from '../../utils/data';
import { parseCode } from '../../utils/editor';

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
    const [token, setToken] = useState();
    const [currentLanguage, setCurrentLanguage] = useState(0);
    const [solutionByLanguage, setSolutionByLanguage] = useState({});
    const [expectedOutput, setExpectedOutput] = useState(props.expected);
    const [questionDescription, setQuestionDescription] = useState(
        props.questionDescription
    );
    const [questionId, setQuestionId] = useState(props.id);
    const [codeRunning, setCodeRunning] = useState(false);

    useEffect(() => {
        setData();
    }, []);

    useEffect(() => {
        console.log(solutionByLanguage);
    }, [solutionByLanguage]);

    const setData = async () => {
        const questionData = await getQuestionData(props.match.params.id);
        setQuestionData(questionData);
        setQuestionDataLoaded(true);
        // setSolutionByLanguage(questionData.placeholders);
        parsePlaceholderCode(questionData.placeholders);
    };

    const parsePlaceholderCode = (placeholders) => {
        Object.keys(placeholders).forEach((placeholder) => {
            const parsedCode = parseCode(placeholders[placeholder]);
            setSolutionByLanguage(
                produce(solutionByLanguage, (solutionByLanguageCopy) => {
                    solutionByLanguageCopy[placeholder] = parsedCode;
                })
            );
        });
    };

    // const submitCode = async () => {
    //     let token = '';

    //     // Get coding language selected
    //     let e = document.getElementById('language-selector');
    //     var language_num = e.options[e.selectedIndex].value;
    //     var language = 0;
    //     if (language_num == 1) {
    //         // Python
    //         language = 71;
    //     } else if (language_num == 2) {
    //         // Javascript
    //         language = 63;
    //     } else if (language_num == 3) {
    //         // C++
    //         language = 54;
    //     } else if (language_num == 4) {
    //         // C#
    //         language = 51;
    //     } else if (language_num == 5) {
    //         // Java
    //         language = 62;
    //     }

    //     const reqBody = {
    //         source_code: value,
    //         language_id: language,
    //     };

    //     if (expectedOutput != '') {
    //         reqBody.expected_output = expectedOutput;
    //     }

    //     // Request to submit source code and langauge, start compilation
    //     await axios
    //         .post(
    //             'https://cors-anywhere.herokuapp.com/https://api.judge0.com/submissions/?base64_encoded=false&wait=false',
    //             reqBody
    //         )
    //         .then(
    //             (response) => {
    //                 console.log(response);
    //                 setToken(response.data.token);
    //             },
    //             (error) => {
    //                 console.log(error);
    //             }
    //         );

    //     setTimeout(compileCode, 3000);
    // };

    // const compileCode = async () => {
    //     let statusCode = -1;

    //     let COMPILE_URL =
    //         'https://cors-anywhere.herokuapp.com/https://api.judge0.com/submissions/' +
    //         token +
    //         '?base64_encoded=false&fields=stdout,stderr,status_id,language_id';
    //     await axios.get(COMPILE_URL, config).then(
    //         (response) => {
    //             changeOutput(response.data.stdout);
    //             statusCode = response.data.status_id;
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    //     if (statusCode === 1) {
    //         console.log('In Queue');
    //     }
    //     if (statusCode === 2) {
    //         console.log('Processing');
    //     }
    //     if (statusCode === 3) {
    //         if (expectedOutput != '') {
    //             questionCorrect();
    //             changeDebug('Your answer was correct.');
    //         } else {
    //             changeDebug('Your program compiled and ran successfully.');
    //         }
    //     }
    //     if (statusCode === 4) {
    //         console.log('Wrong Answer');
    //         changeDebug('Your answer was incorrect.');
    //     }
    //     if (statusCode === 5) {
    //         console.log('Time Limit Exceeded');
    //         changeOutput('Error.');
    //         changeDebug('The time limit was exceeded.');
    //     }
    //     if (statusCode === 6) {
    //         console.log('Compilation Error');
    //         changeOutput('Error.');
    //         changeDebug('Error during compiling.');
    //     }
    //     if (statusCode >= 7 && statusCode <= 12) {
    //         console.log('Runtime Error');
    //         changeOutput('Error.');
    //         changeDebug('Runtime error occured.');
    //     }
    //     if (statusCode === 13) {
    //         console.log('Internal Error');
    //         changeOutput('Error.');
    //         changeDebug('Internal error occured.');
    //     }
    //     if (statusCode === 14) {
    //         console.log('Exec Format Error');
    //         changeOutput('Error.');
    //         changeDebug('Exec format error occured.');
    //     }
    // };

    // const changeOutput = (o) => {
    //     document.getElementById('output-box').value = o;
    // };

    // const changeDebug = (o) => {
    //     document.getElementById('debug-box').value = o;
    // };

    // const runCode = () => {
    //     changeDebug('Compiling...');
    //     submitCode();
    // };

    // const saveCodeToState = (code) => {
    //     setValue(code);
    // };

    // const questionCorrect = async () => {
    //     axios
    //         .post('/api/correct', {
    //             userId: user.id,
    //             questionId: props.questionId,
    //         })
    //         .then((res) => {})
    //         .catch((err) => console.log(err));
    // };

    const onLoad = () => {};

    const onChange = () => {};

    const handleChange = (val) => {
        setCurrentLanguage(val);
        // Set code value to new language code in state
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
        }
        return language;
    };

    const getCurrentLanguageSolution = () => {
        let code;
        switch (currentLanguage) {
            case 1:
                code = solutionByLanguage.python;
                break;
            default:
                code = 'Please select a language.';
                break;
        }
        return code;
    };

    return (
        <div>
            {questionDataLoaded ? (
                <Row>
                    <Col flex={3}>
                        <Question />
                        {/* <div className="question">
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
                        </div> */}
                    </Col>
                    <Col flex={6}>
                        <Right>
                            <div>
                                <Solution>
                                    <SolutionHeader>
                                        <SolutionLabelContainer>
                                            <SolutionLabel>
                                                Solution
                                            </SolutionLabel>
                                            <LanguageSelector>
                                                <Select
                                                    bordered={false}
                                                    value={displayLanguage()}
                                                    style={{
                                                        width: 120,
                                                        color: '#D3D3D3',
                                                    }}
                                                    onChange={handleChange}
                                                    onClick={() =>
                                                        console.log('clicked')
                                                    }
                                                >
                                                    <Option value={1}>
                                                        Python
                                                    </Option>
                                                    <Option value={2}>
                                                        Java
                                                    </Option>
                                                    <Option value={3}>
                                                        C++
                                                    </Option>
                                                    <Option value={4}>
                                                        Javascript
                                                    </Option>
                                                </Select>
                                            </LanguageSelector>
                                        </SolutionLabelContainer>
                                    </SolutionHeader>
                                    <AceEditor
                                        style={{
                                            width: '100%',
                                        }}
                                        height={450}
                                        mode="python"
                                        theme="twilight"
                                        name="blah2"
                                        onLoad={onLoad}
                                        onChange={onChange}
                                        fontSize={15}
                                        showPrintMargin={false}
                                        showGutter={true}
                                        highlightActiveLine={true}
                                        value={getCurrentLanguageSolution()}
                                        setOptions={{
                                            enableBasicAutocompletion: true,
                                            enableLiveAutocompletion: true,
                                            enableSnippets: false,
                                            showLineNumbers: true,
                                            tabSize: 4,
                                        }}
                                    />
                                </Solution>

                                {codeRunning ? (
                                    <Output>
                                        <OutputHeader>
                                            <OutputLabel>Output</OutputLabel>
                                        </OutputHeader>
                                        <OutputBox readOnly />
                                    </Output>
                                ) : null}
                                <OutputMenu>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => {
                                            setCodeRunning(!codeRunning);
                                            console.log('running code...');
                                        }}
                                    >
                                        Run Code
                                    </Button>
                                </OutputMenu>
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
    margin-right: 1%;
`;

const Solution = styled.div`
    padding-top: 1%;
`;

const SolutionHeader = styled.div`
    background-color: #444444;
    height: 60px;
    position: relative;
`;

const SolutionLabelContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const SolutionLabel = styled.h1`
    font-family: 'Lato', sans-serif;
    padding-top: 0.9%;
    color: white;
    font-size: 1.7em;
    text-align: center;
`;

const LanguageSelector = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 1%;
    padding-left: 2.5%;
    background-color: #444444;
`;

const Output = styled.div`
    margin-top: 1%;
`;

const OutputHeader = styled.div`
    background-color: #444444;
    margin: 0;
    padding: 0;
    height: 60px;
`;

const OutputBox = styled.textarea`
    resize: none;
    height: 200px;
    background-color: #000;
    border: 1px solid #000;
    color: #00ff00;
    width: 100%;
    font-family: courier new;
`;

const OutputLabel = styled.h1`
    font-family: 'Lato', sans-serif;
    padding-top: 0.9%;
    color: white;
    font-size: 1.7em;
    text-align: center;
`;

const OutputMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

export default Editor;
