import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Row, Col, Select, Button } from 'antd';
import Question from '../../components/Question';
import CodeEditor from '../../components/CodeEditor/CodeEditor';

import './styles.css';

const { Option } = Select;

const Editor = (props) => {
  const [selected, setSelected] = useState(1);

  const DisplaySection = () => {
    // if (selected === 1) return <QuestionStatement question={questionData} />;
    // if (selected === 2) return <QuestionSolution question={questionData} />;
  };

  return (
    <div>
      <Row>
        <Col>
          <Left>{/* <Question questionData={questionData} /> */}</Left>
        </Col>
        <Col flex={6}>
          <Right>
            <div>
              <Solution>
                <SolutionHeader>
                  <SolutionLabelContainer>
                    <SolutionLabel>Code</SolutionLabel>
                    <LanguageSelector>
                      {/* <Select
                          bordered={false}
                          value={getLanguage(currentLanguage)}
                          style={{
                            width: 120,
                            color: '#D3D3D3',
                          }}
                          onChange={onLanguageChange}
                        >
                          <Option value={1}>Python</Option>
                          <Option value={2}>Java</Option>
                          <Option value={3}>C++</Option>
                          <Option value={4}>Javascript</Option>
                        </Select> */}
                    </LanguageSelector>
                  </SolutionLabelContainer>
                </SolutionHeader>
                <CodeEditor id={props} />
              </Solution>

              <Output>
                <OutputHeader>
                  <OutputLabel>Output</OutputLabel>
                </OutputHeader>
                <OutputBox readOnly id="output-box" />
              </Output>
              <OutputMenu>
                {/* <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      createSubmission();
                    }}
                  >
                    Run Code
                  </Button> */}
              </OutputMenu>
            </div>
          </Right>
        </Col>
      </Row>
    </div>
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

const SolutionHeader = styled.div`
  background-color: #444444;
  height: 60px;
  position: relative;
`;

const SolutionLabelContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const SolutionLabel = styled.h1`
  padding-top: 0.9%;
  color: white;
  font-size: 1.7em;
  text-align: center;
`;

const LanguageSelector = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 1%;
  padding-left: 2.5%;
  background-color: #444444;
`;

const Output = styled.div`
  margin-top: 1%;
`;

const OutputHeader = styled.div`
  background-color: #444444;
  margin: 0;
  padding: 0;
  height: 60px;
`;

const OutputBox = styled.textarea`
  resize: none;
  height: 200px;
  background-color: #000;
  border: 1px solid #000;
  color: #00ff00;
  width: 100%;
  font-family: courier new;
`;

const OutputLabel = styled.h1`
  font-family: 'Lato', sans-serif;
  padding-top: 0.9%;
  color: white;
  font-size: 1.7em;
  text-align: center;
`;

const OutputMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1%;
`;

export default Editor;
