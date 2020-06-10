import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import CodeEditor from '../CodeEditor';
import EditorOutput from '../EditorOutput';
import LanguageSelector from '../LanguageSelector';
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
import { FaPlay } from 'react-icons/fa';
import { PlayCircleFilled } from '@ant-design/icons';

const EditorPanel = ({ id }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);

  const DisplaySection = () => {
    if (selected === 1) return <CodeEditor id={id} />;
    if (selected === 2) return <EditorOutput />;
  };

  return (
    <>
      <TabContainer>
        <Tab
          style={selected === 1 ? { background: '#7D7C7A' } : null}
          onClick={() => setSelected(1)}
        >
          <TabTitle style={selected === 1 ? { color: 'white' } : null}>
            Editor
          </TabTitle>
        </Tab>
        <Tab
          style={selected === 2 ? { background: '#7D7C7A' } : null}
          onClick={() => setSelected(2)}
        >
          <TabTitle style={selected === 2 ? { color: 'white' } : null}>
            Output
          </TabTitle>
        </Tab>
        <EditorMenu>
          <LanguageSelectorContainer>
            <LanguageSelector />
          </LanguageSelectorContainer>
          <RunButton
            type="primary"
            size="large"
            icon={<PlayCircleFilled />}
            type="link"
            onClick={() => {
              // createSubmission();
            }}
          >
            Run code
          </RunButton>
        </EditorMenu>
      </TabContainer>
      <DisplaySection />
    </>
  );
};

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  background: #444444;
`;

const Tab = styled.div`
  width: 100px;
  height: 100%;
  padding-top: 1.8%;
`;

const TabTitle = styled.div`
  margin-top: -0.4em;
  font-size: 1.2em;
  text-align: center;
  color: #dcdcdc;
  cursor: default;
`;

const EditorMenu = styled.div`
  display: flex;
  margin-left: auto;
  margin-top: 0.75%;
  width: 300px;
`;

const RunButton = styled(Button)``;

const LanguageSelectorContainer = styled.div`
  margin-top: 1.2%;
`;

export default EditorPanel;
