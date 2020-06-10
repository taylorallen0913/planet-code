import React from 'react';
import styled from 'styled-components';

const QuestionSolution = ({ question }) => {
  return (
    <Container>
      <Header>{question.name}</Header>
      <SolutionContainer>
        <SolutionBody readOnly value={'Solution placeholders'} />
      </SolutionContainer>
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

const SolutionContainer = styled.div``;

const SolutionBody = styled.textarea`
  resize: none;
  border: none;
  background: inherit;
  width: 95%;
  height: 570px;
  box-sizing: border-box;
  margin: 2% 0 0 2.5%;
  color: #dcdcdc;
  font-size: 1.2em;
`;

export default QuestionSolution;
