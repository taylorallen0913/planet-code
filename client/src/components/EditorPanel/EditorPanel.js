import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import CodeEditor from '../CodeEditor';
import EditorOutput from '../EditorOutput';
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

const { Option } = Select;

const EditorPanel = ({ id }) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.editor.currentLanguage);
  const [selected, setSelected] = useState(1);

  const changeLanguage = (language) => {
    dispatch(setCurrentLanguage(language));
  };

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
        <LanguageSelector>
          <Select
            bordered={false}
            value={getLanguageFromID(currentLanguage)}
            style={{
              width: 120,
              color: '#D3D3D3',
            }}
            onChange={(language) => changeLanguage(language)}
          >
            <Option value={1}>Python</Option>
            <Option value={2}>Java</Option>
            <Option value={3}>C++</Option>
            <Option value={4}>Javascript</Option>
          </Select>
        </LanguageSelector>
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

const LanguageSelector = styled.div`
  margin: 1% 2% 0 auto;
`;

export default EditorPanel;
