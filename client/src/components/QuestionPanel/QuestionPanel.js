import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import QuestionStatement from '../QuestionStatement';
import QuestionSolution from '../QuestionSolution';

const QuestionPanel = () => {
  const questionData = useSelector((state) => state.editor.questionData);
  const [selected, setSelected] = useState(1);

  const DisplaySection = () => {
    if (selected === 1) return <QuestionStatement question={questionData} />;
    if (selected === 2) return <QuestionSolution question={questionData} />;
  };

  return (
    <>
      {questionData ? (
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
      ) : null}
    </>
  );
};

const Container = styled.div`
  width: 700px;
  background: #444444;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  background: #444444;
`;

const Tab = styled.div`
  width: 85px;
  height: 100%;
  padding-top: 1em;
`;

const TabTitle = styled.div`
  font-size: 1em;
  text-align: center;
  color: #dcdcdc;
  cursor: default;
`;

export default QuestionPanel;
