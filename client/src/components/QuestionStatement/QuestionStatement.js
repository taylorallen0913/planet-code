import React from 'react';
import styled from 'styled-components';

const QuestionStatement = ({ question }) => {
  console.log(question);
  return (
    <Container>
      <Header>{question.name}</Header>
      <StatementContainer>
        <StatementBody>{question.question}</StatementBody>
      </StatementContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 750px;
  background: #141414;
  overflow: hidden;
`;

const Header = styled.h1`
  margin: 2% 0 0 0;
  text-align: center;
  color: white;
`;

const StatementContainer = styled.div``;

const StatementBody = styled.p`
  width: 95%;
  color: #dcdcdc;
  font-size: 1.5em;
`;

export default QuestionStatement;
