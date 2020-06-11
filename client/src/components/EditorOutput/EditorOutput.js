import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setOutput,
  clearOutput,
  setOutputLoadingStatus,
  setOutputErrors,
  clearOutputErrors,
} from '../../redux/actions/outputActions';
import { getApiLanguageID } from '../../utils/language';
import { formatSolution, checkOutput } from '../../utils/output';

const EditorOutput = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.output.loading);
  const currentLanguage = useSelector((state) => state.editor.currentLanguage);
  const code = useSelector((state) => state.editor.code);
  const questionData = useSelector((state) => state.editor.questionData);
  const output = useSelector((state) => state.output.value);

  useEffect(() => {
    if (loading) createSubmission();
  }, []);

  const createSubmission = async () => {
    const languageID = getApiLanguageID(currentLanguage);

    await axios
      .post(
        '/api/judge/send-submission',
        {
          language_id: languageID,
          source_code: formatSolution(currentLanguage, questionData, code),
          expected_output: questionData.expected,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        setTimeout(() => {
          getSubmission(res.data);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const getSubmission = async (token) => {
    await axios
      .post(
        '/api/judge/get-submission',
        {
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        dispatch(setOutputLoadingStatus(false));
        const passing = checkOutput(res.data, questionData);
        if (passing)
          dispatch(setOutput('Your solution passed all test cases!'));
        else setErrors(res.data);
      })
      .catch((err) => console.log(err));
  };

  const setErrors = (output) => {
    console.log(output);
    const message = `${output.status.description}\n\n${output.message}\n\n\n${output.stderr}`;
    dispatch(setOutput(message));
  };

  const formatErrors = (errors) => {
    // const message = `${errors.}`
    // setOutput()
  };

  return (
    <OutputContainer>
      {loading ? (
        <Loading
          indicator={<LoadingOutlined style={{ fontSize: 100 }} />}
          size="large"
        />
      ) : null}
      <OutputBox value={output} readOnly />
    </OutputContainer>
  );
};

const OutputContainer = styled.div`
  position: relative;
`;

const Loading = styled(Spin)`
  position: absolute;
  margin-left: 50%;
  margin-top: 15%;
`;

const OutputBox = styled.textarea`
  resize: none;
  height: 600px;
  background-color: #000;
  border: 1px solid #000;
  color: #00ff00;
  width: 100%;
  padding: 2em;
  font-family: courier new;
`;

export default EditorOutput;
