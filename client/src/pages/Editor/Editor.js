import React, { useEffect } from 'react';

import styled from 'styled-components';

import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import QuestionPanel from '../../components/QuestionPanel';
import EditorPanel from '../../components/EditorPanel';
import { setQuestionData } from '../../redux/actions/editorActions';
import {
  clearOutput,
  clearOutputErrors,
} from '../../redux/actions/outputActions';

import './styles.css';

const Editor = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setQuestionData(props.match.params.id));
    return () => {
      dispatch(clearOutput());
      dispatch(clearOutputErrors());
    };
  }, []);

  return (
    <Row>
      <Col>
        <Left>
          <QuestionPanel />
        </Left>
      </Col>
      <Col flex={10}>
        <Right>
          <div>
            <Solution>
              <EditorPanel id={props} />
            </Solution>
          </div>
        </Right>
      </Col>
    </Row>
  );
};

const Left = styled.div`
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
`;

const Right = styled.div`
  margin-right: 1%;
`;

const Solution = styled.div`
  padding-top: 1em;
`;

export default Editor;
