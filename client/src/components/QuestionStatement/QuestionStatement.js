import React from 'react';
import styled from 'styled-components';
import { parseText } from '../../utils/question';

const QuestionStatement = ({ question }) => {
  return (
    <Container>
      <Header>{question.name}</Header>
      <StatementContainer>
        <StatementBody readOnly value={parseText(question.question)} />
      </StatementContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 725px;
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
  font-size: 1.5em;
`;

export default QuestionStatement;
