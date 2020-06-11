import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { parseText } from '../../utils/question';

const QuestionStatement = () => {
  const questionData = useSelector((state) => state.editor.questionData);
  return (
    <Container>
      <Header>{questionData.name}</Header>
      <StatementBody readOnly value={parseText(questionData.question)} />
    </Container>
  );
};

const Container = styled.div`
  height: 600px;
  background: #141414;
  overflow: hidden;
`;

const Header = styled.h1`
  margin: 2% 0 0 0;
  text-align: center;
  color: white;
  font-size: 1.7em;
`;

const StatementBody = styled.textarea`
  resize: none;
  border: none;
  background: inherit;
  width: 95%;
  height: 500px;
  box-sizing: border-box;
  margin: 2% 0 0 2.5%;
  color: #dcdcdc;
  font-size: 1.1em;
`;

export default QuestionStatement;
