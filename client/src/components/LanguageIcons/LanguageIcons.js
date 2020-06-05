import React from 'react';
import styled from 'styled-components';

import { FaPython, FaJava, FaJs } from 'react-icons/fa';

const LanguageIcons = () => {
  return (
    <LanguageIconContainer>
      <LanguageIcon>
        <FaPython size="10em" color="#000080" />
      </LanguageIcon>
      <LanguageIcon>
        <FaJava size="10em" color="#000080" />
      </LanguageIcon>
      <LanguageIcon>
        <FaJs size="10em" color="#000080" />
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

export default LanguageIcons;
