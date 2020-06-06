import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <AppFooter>
      <FooterText>© 2020 Planet Code</FooterText>
    </AppFooter>
  );
};

const AppFooter = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  margin-top: 1.5%;
  margin-bottom: 1.5%;
  color: black;
  text-align: center;
`;

const FooterText = styled.h1`
  font-size: 1.2em;
`;

export default Footer;
