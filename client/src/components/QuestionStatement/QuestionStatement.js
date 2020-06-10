import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { parseText } from '../../utils/question';

const QuestionStatement = () => {
  const questionData = useSelector((state) => state.editor.questionData);
  return (
    <Container>
      <Header>{questionData.name}</Header>
      <StatementContainer>
        <StatementBody readOnly value={parseText(questionData.question)} />
      </StatementContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 670px;
  background: #141414;
  overflow: hidden;
`;

const Header = styled.h1`
  margin: 2% 0 0 0;
  text-align: center;
  color: white;
`;

const StatementContainer = styled.div``;

const StatementBody = styled.textarea`
  resize: none;
  border: none;
  background: inherit;
  width: 95%;
  height: 650px;
  box-sizing: border-box;
  margin: 2% 0 0 2.5%;
  color: #dcdcdc;
  font-size: 1.2em;
`;

export default QuestionStatement;
