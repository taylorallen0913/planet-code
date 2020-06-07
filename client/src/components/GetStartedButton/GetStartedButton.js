import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GetStartedButton = () => {
  return (
    <ButtonWrapper>
      <Link to="/practice">
        <Button>Get Started</Button>
      </Link>
    </ButtonWrapper>
  );
};

const Button = styled.a`
  display: inline-block;
  padding: 0.6em 2em;
  border: 0.1em solid #094d92;
  margin: 0 0.6em 0.6em 0;
  border-radius: 0.24em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1.3em;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;

  @media screen and (max-width: 500px) {
    font-size: 1em;
  }
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  &:hover ${Button} {
    color: #ffffff;
    background-color: #094d92;
  }
`;

export default GetStartedButton;
