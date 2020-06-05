import React from 'react';
import styled from 'styled-components';

import { FaPython, FaJava, FaJs } from 'react-icons/fa';

const LanguageIcons = () => {
  return (
    <LanguageIconContainer>
      <LanguageIcon>
        <FaPython size="10em" />
      </LanguageIcon>
      <LanguageIcon>
        <FaJava size="10em" />
      </LanguageIcon>
      <LanguageIcon>
        <FaJs size="10em" />
      </LanguageIcon>
    </LanguageIconContainer>
  );
};

export default LanguageIcons;

const LanguageIconContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageIcon = styled.div``;
