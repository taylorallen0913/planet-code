import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Row, Col, Select, Button } from 'antd';
import QuestionPanel from '../../components/QuestionPanel';
import EditorPanel from '../../components/EditorPanel';

import './styles.css';

const Editor = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <Left>
            <QuestionPanel />
          </Left>
        </Col>
        <Col flex={6}>
          <Right>
            <div>
              <Solution>
                <EditorPanel id={props} />
              </Solution>
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

export default Editor;
