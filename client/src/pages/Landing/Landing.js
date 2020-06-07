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
            <DeveloperGraphic />
          </DeveloperContainer>
        </RightColumn>
      </Row>
      <LanguageIconsContainer>
        <LanguageIcons />
      </LanguageIconsContainer>
      <GradientContainer>
        <AboutHeader>Progress your skills</AboutHeader>
        <AboutSubtext>
          Planet Code aims to teach the fundamentals of data structures and
          algorithms to prepare you for programming competitions or interviews
        </AboutSubtext>
        <CardContainer>
          <InfoCardOne />
          <CardDivider />
          <InfoCardTwo />
          <CardDivider />
          <InfoCardThree />
        </CardContainer>
      </GradientContainer>
      <Footer />
    </LandingContainer>
  );
};

// Containers

const LandingContainer = styled.div`
  height: 100%;
  background-image: url(${Background});
  overflow: hidden;
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
  margin: 11% 0 7% 0;
`;

const CardContainer = styled.div`
  margin: 5% 0 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    display: block;
    margin: 5% 0 0 10%;
  }
`;

const GradientContainer = styled.div`
  background-image: linear-gradient(180deg, #ffffff 0%, #f2f3fa 100%);
  padding-bottom: 20%;
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

  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 230%;
  }
`;

const LandingSubtext = styled.h1`
  padding: 0 30% 0% 0%;
  font-family: 'Montserrat', sans-serif;
  font-size: 170%;
  color: #dcdcdc;

  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 100%;
    padding: 0;
  }
`;

const AboutHeader = styled.h1`
  font-size: 4em;
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;

  @media screen and (max-width: 500px) {
    margin: 30% 0 5% 0;
    font-size: 2em;
  }
`;

const AboutSubtext = styled.h1`
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
  color: #0b3954;

  @media screen and (max-width: 500px) {
    margin: 5% 0 5% 0;
    font-size: 1em;
  }
`;

// Other

const DeveloperGraphic = styled(Developer)`
  @media screen and (max-width: 500px) {
    padding-top: 100px;
    width: 50%;
    height: 50%;
  }
`;

const CardDivider = styled.div`
  margin: 0 3% 0 3%;
`;

export default Landing;
