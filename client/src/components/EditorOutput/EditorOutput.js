import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const EditorOutput = () => {
  return (
    <div>
      <Output>
        <OutputBox readOnly />
      </Output>
      <OutputMenu>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            // createSubmission();
          }}
        >
          Run Code
        </Button>
      </OutputMenu>
    </div>
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

const OutputMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1%;
`;

export default EditorOutput;
