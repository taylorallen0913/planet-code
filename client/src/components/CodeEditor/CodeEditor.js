import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import produce from 'immer';
import axios from 'axios';
import { parseCode, getLanguage, getApiLanguageID } from '../../utils/editor';
import { getQuestionData } from '../../utils/question';
import { compareStrings } from '../../utils/comparison';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';

const CodeEditor = ({ id }) => {
  const [questionData, setQuestionData] = useState();
  const [questionDataLoaded, setQuestionDataLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [solutionByLanguage, setSolutionByLanguage] = useState({});

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const questionData = await getQuestionData(id.match.params.id);
    setQuestionData(questionData);
    setQuestionDataLoaded(true);
    parsePlaceholderCode(questionData.code.placeholders);
  };

  const parsePlaceholderCode = (placeholders) => {
    const code = { python: '', java: '', 'c++': '', javascript: '' };
    Object.keys(placeholders).forEach((placeholder) => {
      const parsedCode = parseCode(placeholders[placeholder]);
      code[`${placeholder}`] = parsedCode;
    });
    setSolutionByLanguage(code);
  };

  const onCodeChange = (val) => {
    setSolutionByLanguage(
      produce(solutionByLanguage, (solutionByLanguageCopy) => {
        const language = getLanguage(currentLanguage).toLowerCase();
        solutionByLanguageCopy[`${language}`] = val;
      }),
    );
  };

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

  const onLanguageChange = (val) => {
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
      case 3:
        code = solutionByLanguage['c++'];
        break;
      case 4:
        code = solutionByLanguage.javascript;
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
    switch (getLanguage(currentLanguage).toLowerCase()) {
      case 'c++':
        theme = 'c_cpp';
        break;
      default:
        theme = getLanguage(currentLanguage).toLowerCase();
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

  return (
    <div>
      {questionDataLoaded ? (
        <AceEditor
          style={{
            width: '100%',
          }}
          height={450}
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
      ) : null}
    </div>
  );
};

export default CodeEditor;
