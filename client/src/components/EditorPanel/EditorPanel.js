import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import CodeEditor from '../CodeEditor';
import EditorOutput from '../EditorOutput';
import LanguageSelector from '../LanguageSelector';
import { PlayCircleFilled } from '@ant-design/icons';
import { updateEditorMenuSelection } from '../../redux/actions/editorActions';
import { setOutputLoadingStatus } from '../../redux/actions/outputActions';

const EditorPanel = ({ id }) => {
  const dispatch = useDispatch();

  const editorMenuSelection = useSelector(
    (state) => state.editor.editorMenuSelection,
  );

  const DisplaySection = () => {
    if (editorMenuSelection === 0) return <CodeEditor id={id} />;
    if (editorMenuSelection === 1) return <EditorOutput />;
  };

  return (
    <div>
      <TabContainer>
        <Tab
          style={editorMenuSelection === 0 ? { background: '#7D7C7A' } : null}
          onClick={() => dispatch(updateEditorMenuSelection(0))}
        >
          <TabTitle
            style={editorMenuSelection === 0 ? { color: 'white' } : null}
          >
            Editor
          </TabTitle>
        </Tab>
        <Tab
          style={editorMenuSelection === 1 ? { background: '#7D7C7A' } : null}
          onClick={() => dispatch(updateEditorMenuSelection(1))}
        >
          <TabTitle
            style={editorMenuSelection === 1 ? { color: 'white' } : null}
          >
            Output
          </TabTitle>
        </Tab>
        {editorMenuSelection === 0 && (
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
                dispatch(updateEditorMenuSelection(1));
                dispatch(setOutputLoadingStatus(true));
                // createSubmission();
              }}
            >
              Run code
            </RunButton>
          </EditorMenu>
        )}
        {editorMenuSelection === 1 && (
          <EditorMenu>
            <RunButton
              type="primary"
              size="large"
              icon={<PlayCircleFilled />}
              type="link"
              onClick={() => {
                dispatch(updateEditorMenuSelection(1));
                dispatch(setOutputLoadingStatus(true));
                // createSubmission();
              }}
            >
              Run code
            </RunButton>
          </EditorMenu>
        )}
      </TabContainer>
      <DisplaySection />
    </div>
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
