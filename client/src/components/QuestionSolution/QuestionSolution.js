import React from 'react';
import styled from 'styled-components';

const QuestionSolution = ({ question }) => {
  return (
    <Container>
      <Header>{question.name}</Header>
      <SolutionContainer>
        <SolutionBody>Solution placeholder</SolutionBody>
      </SolutionContainer>
    </Container>
  );
};

const Container = styled.div`
  background: #141414;
  overflow: hidden;
`;

const Header = styled.h1`
  margin: 2% 0 0 0;
  text-align: center;
  color: white;
`;

const SolutionContainer = styled.div``;

const SolutionBody = styled.p`
  width: 95%;
  color: #dcdcdc;
  font-size: 1.5em;
`;

export default QuestionSolution;
