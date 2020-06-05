import React from 'react';
import styled from 'styled-components';
import Background from './assets/Background.svg';
import Developer from './assets/Developer';
import {
  InfoCardOne,
  InfoCardTwo,
  InfoCardThree,
} from '../../components/InfoCards';
import GetStartedButton from '../../components/GetStartedButton';
import LanguageIcons from '../../components/LanguageIcons';
import Footer from '../../components/Footer';

import './styles.css';

const Landing = () => {
  return (
    <LandingContainer>
      <Row>
        <LeftColumn>
          <LandingTextContainer>
            <LandingHeader>Conquer coding questions</LandingHeader>
            <LandingSubtext>
              An intuitive learning solution to learning algorithms in an easy
              and enjoyable manner
            </LandingSubtext>
            <ButtonContainer>
              <GetStartedButton />
            </ButtonContainer>
          </LandingTextContainer>
        </LeftColumn>
        <RightColumn>
          <DeveloperContainer>
            <Developer />
          </DeveloperContainer>
        </RightColumn>
      </Row>
      <LanguageIconsContainer>
        <LanguageIcons />
      </LanguageIconsContainer>
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #f2f3fa 100%)',
          marginBottom: '20%',
        }}
      >
        <div style={{ backgroundColor: 'transparent' }} />

        <h1
          style={{
            fontSize: '4em',
            textAlign: 'center',
            marginLeft: '20%',
            marginRight: '20%',
          }}
        >
          Progress your skills
        </h1>
        <h1
          style={{
            textAlign: 'center',
            marginLeft: '20%',
            marginRight: '20%',
            color: '#0B3954',
          }}
        >
          Planet Code aims to teach the fundamentals of data structure and
          algorithm to prepare you for programming competitions or interviews
        </h1>
        <div style={{ marginTop: '5%' }} />
        <CardContainer>
          <InfoCardOne />
          <div style={{ marginLeft: '3%', marginRight: '3%' }} />
          <InfoCardTwo />
          <div style={{ marginLeft: '3%', marginRight: '3%' }} />
          <InfoCardThree />
        </CardContainer>
      </div>
      <Footer />
    </LandingContainer>
  );
};

// Containers

const LandingContainer = styled.div`
  height: 100%;
  background-image: url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const LandingTextContainer = styled.div`
  padding: 5% 0 0 20%;
  text-align: left;

  @media screen and (max-width: 1500px) {
    padding: 5% 20% 0 25%;
  }
`;

const DeveloperContainer = styled.div`
  padding: 12% 0 0 0;
  text-align: left;

  @media screen and (max-width: 1500px) {
    padding: 5% 0 0 0;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  padding: 6% 0 0 25%;

  @media screen and (max-width: 1500px) {
    text-align: center;
    padding: 10% 0 0 0;
  }
`;

const LanguageIconsContainer = styled.div`
  margin: 13% 0 7% 0;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Rows

const Row = styled.div`
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

// Columns

const LeftColumn = styled.div`
  float: left;
  width: 55%;

  @media screen and (max-width: 1500px) {
    width: 100%;
  }
`;

const RightColumn = styled.div`
  float: left;
  width: 45%;

  @media screen and (max-width: 1500px) {
    width: 100%;
  }
`;

// Text

const LandingHeader = styled.h1`
  padding: 6% 0 0 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 400%;
  color: white;

  @media screen and (max-width: 1500px) {
    text-align: center;
    padding: 0;
  }
`;

const LandingSubtext = styled.h1`
  padding: 0 30% 0% 0%;
  font-family: 'Montserrat', sans-serif;
  font-size: 170%;
  color: #dcdcdc;

  @media screen and (max-width: 1500px) {
    text-align: center;
    padding: 0;
  }
`;

export default Landing;
