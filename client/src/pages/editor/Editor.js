import React, { useState, useEffect } from 'react';

import AceEditor from 'react-ace';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import produce from 'immer';
import { Row, Col, Select, Button } from 'antd';
import Question from '../../components/Question';
import { getQuestionData } from '../../utils/data';
import { parseCode, getLanguage, getApiLanguageID } from '../../utils/editor';
import { compareStrings } from '../../utils/comparison';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';
import './styles.css';

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
    const [codeRunning, setCodeRunning] = useState(false);

    useEffect(() => {
        setData();
    }, []);

    // useEffect(() => {
    //     console.log(solutionByLanguage);
    // }, [solutionByLanguage]);

    const setData = async () => {
        const questionData = await getQuestionData(props.match.params.id);
        setQuestionData(questionData);
        setQuestionDataLoaded(true);
        // setSolutionByLanguage(questionData.placeholders);
        parsePlaceholderCode(questionData.code.placeholders);
    };

    const parsePlaceholderCode = (placeholders) => {
        console.log(Object.keys(placeholders));
        const code = { python: '', java: '' };
        Object.keys(placeholders).forEach((placeholder) => {
            const parsedCode = parseCode(placeholders[placeholder]);
            code[`${placeholder}`] = parsedCode;
        });
        setSolutionByLanguage(code);
    };

    const createSubmission = async () => {
        const language_id = getApiLanguageID(currentLanguage);
        await axios
            .post(
                'http://localhost:5000/api/judge/send-submission',
                {
                    language_id,
                    source_code: formatSolution(),
                    expected_output: questionData.expected,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => {
                setTimeout(() => {
                    console.log(res.data);
                    getSubmission(res.data);
                }, 2000);
            })
            .catch((err) => console.log(err));
    };

    const getSubmission = async (token) => {
        await axios
            .post(
                'http://localhost:5000/api/judge/get-submission',
                {
                    token: token,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => checkOutput(res.data))
            .catch((err) => console.log(err));
    };

    const checkOutput = (output) => {
        const passed = compareStrings(output.stdout, questionData.expected);
        if (passed)
            document.getElementById('output-box').value =
                'Passed all test cases.';
        else
            document.getElementById('output-box').value =
                'Did not pass all test cases.';
    };

    const onChange = (val) => {
        setSolutionByLanguage(
            produce(solutionByLanguage, (solutionByLanguageCopy) => {
                const language = getLanguage(currentLanguage).toLowerCase();
                solutionByLanguageCopy[`${language}`] = val;
            })
        );
    };

    const handleChange = (val) => {
        setCurrentLanguage(val);
    };

    const getCurrentLanguageSolution = () => {
        let code;
        switch (currentLanguage) {
            case 1:
                code = solutionByLanguage.python;
                break;
            case 2:
                code = solutionByLanguage.java;
                break;
            default:
                code = 'Please select a language.';
                break;
        }
        return code;
    };

    const getCurrentLanguageTemplate = () => {
        let code;
        switch (currentLanguage) {
            case 1:
                code = questionData.code.templates.python;
                break;
            case 2:
                code = questionData.code.templates.java;
                break;
            default:
                code = 'Please select a language.';
                break;
        }
        return code;
    };

    const formatSolution = (code) => {
        let template = parseCode(getCurrentLanguageTemplate());
        template = template.replace('{code}', getCurrentLanguageSolution());
        return template;
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
                                                    value={getLanguage(
                                                        currentLanguage
                                                    )}
                                                    style={{
                                                        width: 120,
                                                        color: '#D3D3D3',
                                                    }}
                                                    onChange={handleChange}
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
                                        mode={getLanguage(
                                            currentLanguage
                                        ).toLowerCase()}
                                        theme="twilight"
                                        name="blah2"
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
                                        <OutputBox readOnly id="output-box" />
                                    </Output>
                                ) : null}
                                <OutputMenu>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => {
                                            setCodeRunning(true);
                                            createSubmission();
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
