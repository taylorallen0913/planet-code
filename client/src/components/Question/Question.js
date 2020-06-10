import React, { useState } from 'react';
import styled from 'styled-components';
import QuestionStatement from '../QuestionStatement';
import QuestionSolution from '../QuestionSolution';

const Question = ({ questionData }) => {
  const [selected, setSelected] = useState(1);

  const DisplaySection = () => {
    if (selected === 1) return <QuestionStatement question={questionData} />;
    if (selected === 2) return <QuestionSolution question={questionData} />;
  };

  return (
    <Container>
      <TabContainer>
        <Tab
          style={selected === 1 ? { background: '#7D7C7A' } : null}
          onClick={() => setSelected(1)}
        >
          <TabTitle style={selected === 1 ? { color: 'white' } : null}>
            Question
          </TabTitle>
        </Tab>
        <Tab
          style={selected === 2 ? { background: '#7D7C7A' } : null}
          onClick={() => setSelected(2)}
        >
          <TabTitle style={selected === 2 ? { color: 'white' } : null}>
            Solution
          </TabTitle>
        </Tab>
      </TabContainer>
      <DisplaySection />
    </Container>
  );
};

const Container = styled.div`
  width: 700px;
  background: #444444;
`;

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
  margin-top: 4.5%;
  font-size: 1.2em;
  text-align: center;
  color: #dcdcdc;
  cursor: default;
`;

export default Question;
