import React, { useEffect } from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { parseCode } from '../../utils/parsing';
import { getLanguageFromID, getApiLanguageID } from '../../utils/language';
import { getCurrentLanguageSolution } from '../../utils/output';
import { compareStrings } from '../../utils/comparison';
import {
  setQuestionData,
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

  const onCodeChange = (code) => {
    dispatch(updateCurrentCode(currentLanguage, code));
  };

  return (
    <div>
      {questionData && code ? (
        <div>
          <AceEditor
            style={{
              width: '100%',
            }}
            height={600}
            mode={getTheme()}
            theme="twilight"
            name="blah2"
            onChange={onCodeChange}
            fontSize={15}
            showPrintMargin={false}
            showGutter
            highlightActiveLine
            value={getCurrentLanguageSolution(currentLanguage, code)}
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
