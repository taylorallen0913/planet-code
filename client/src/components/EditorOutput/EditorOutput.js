import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const EditorOutput = () => {
  return (
    <Output>
      <OutputBox readOnly />
    </Output>
  );
};

const Output = styled.div``;

const OutputBox = styled.textarea`
  resize: none;
  height: 200px;
  background-color: #000;
  border: 1px solid #000;
  color: #00ff00;
  width: 100%;
  font-family: courier new;
`;
export default EditorOutput;
