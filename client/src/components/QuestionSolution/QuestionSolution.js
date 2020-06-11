import React from 'react';
import styled from 'styled-components';

const QuestionSolution = ({ question }) => {
  return (
    <Container>
      <Header>{question.name}</Header>
      <SolutionBody readOnly value={'Solution placeholders'} />
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

const SolutionBody = styled.textarea`
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

export default QuestionSolution;
