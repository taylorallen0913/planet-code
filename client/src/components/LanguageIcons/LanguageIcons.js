import React from 'react';
import styled from 'styled-components';

import { FaPython, FaJava, FaJs } from 'react-icons/fa';

const LanguageIcons = () => {
  return (
    <LanguageIconContainer>
      <LanguageIcon>
        <PythonIcon />
      </LanguageIcon>
      <LanguageIcon>
        <JavaIcon />
      </LanguageIcon>
      <LanguageIcon>
        <JSIcon />
      </LanguageIcon>
    </LanguageIconContainer>
  );
};

const LanguageIconContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageIcon = styled.div`
  padding: 0 5% 0 5%;
`;

const PythonIcon = styled(FaPython)`
  width: 10em;
  height: 10em;
  color: #000080;

  @media screen and (max-width: 500px) {
    width: 5em;
    height: 5em;
  }
`;

const JavaIcon = styled(FaJava)`
  width: 10em;
  height: 10em;
  color: #000080;

  @media screen and (max-width: 500px) {
    width: 5em;
    height: 5em;
  }
`;

const JSIcon = styled(FaJs)`
  width: 10em;
  height: 10em;
  color: #000080;

  @media screen and (max-width: 500px) {
    width: 5em;
    height: 5em;
  }
`;

export default LanguageIcons;
