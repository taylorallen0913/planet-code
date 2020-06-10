import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import produce from 'immer';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Select, Button } from 'antd';
import {
  parseCode,
  getLanguageFromID,
  getApiLanguageID,
} from '../../utils/editor';
import { getQuestionData } from '../../utils/question';
import { compareStrings } from '../../utils/comparison';
import {
  setQuestionData,
  setCurrentLanguage,
  updateCurrentCode,
} from '../../redux/actions/editorActions';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';

const CodeEditor = ({ id }) => {
  const questionData = useSelector((state) => state.editor.questionData);
  const currentLanguage = useSelector((state) => state.editor.currentLanguage);
  const code = useSelector((state) => state.editor.code);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuestionData(id.match.params.id));
  }, []);

  const createSubmission = async () => {
    const languageID = getApiLanguageID(currentLanguage);
    await axios
      .post(
        '/api/judge/send-submission',
        {
          language_id: languageID,
          source_code: formatSolution(),
          expected_output: questionData.expected,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        setTimeout(() => {
          getSubmission(res.data);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const getSubmission = async (token) => {
    await axios
      .post(
        '/api/judge/get-submission',
        {
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => checkOutput(res.data))
      .catch((err) => console.log(err));
  };

  const checkOutput = (output) => {
    const passed = compareStrings(output.stdout, questionData.expected);
    if (passed)
      document.getElementById('output-box').value = 'Passed all test cases.';
    else
      document.getElementById(
        'output-box',
      ).value = `${output.message}\n\n${output.stderr}`;
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
      case 3:
        code = questionData.code.templates['c++'];
        break;
      case 4:
        code = questionData.code.templates.javascript;
        break;
      default:
        code = 'Please select a language.';
        break;
    }
    return code;
  };

  const getTheme = () => {
    let theme;
    switch (getLanguageFromID(currentLanguage).toLowerCase()) {
      case 'c++':
        theme = 'c_cpp';
        break;
      default:
        theme = getLanguageFromID(currentLanguage).toLowerCase();
        break;
    }
    return theme;
  };

  const formatSolution = () => {
    let template = parseCode(getCurrentLanguageTemplate());
    template = template.replace('{code}', getCurrentLanguageSolution());
    template = template.split('{input}').join('5');
    return template;
  };

  const onCodeChange = (code) => {
    dispatch(updateCurrentCode(currentLanguage, code));
  };

  const getCurrentLanguageSolution = () => {
    let codeValue;
    switch (currentLanguage) {
      case 1:
        codeValue = parseCode(code.python);
        break;
      case 2:
        codeValue = parseCode(code.java);
        break;
      case 3:
        codeValue = parseCode(code['c++']);
        break;
      case 4:
        codeValue = parseCode(code.javascript);
        break;
      default:
        codeValue = 'Please select a language.';
        break;
    }
    return codeValue;
  };

  return (
    <div>
      {questionData && code ? (
        <div>
          <AceEditor
            style={{
              width: '100%',
            }}
            height={670}
            mode={getTheme()}
            theme="twilight"
            name="blah2"
            onChange={onCodeChange}
            fontSize={15}
            showPrintMargin={false}
            showGutter
            highlightActiveLine
            value={getCurrentLanguageSolution()}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CodeEditor;
