import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import Background from './SVGS/Background.svg';
import Developer from './SVGS/Developer.js';
import InfoCardOne from '../../components/InfoCards/InfoCardOne';
import InfoCardTwo from '../../components/InfoCards/InfoCardTwo';
import InfoCardThree from '../../components/InfoCards/InfoCardThree';
import GetStartedButton from '../../components/GetStartedButton';

import './styles.css';

const Landing = () => {
    return (
        <LandingContainer>
            <Row>
                <Col flex={3} style={{ margin: '3% 0 0 5%' }}>
                    <div style={{ padding: '0 0 0 4%' }}>
                        <h1 className="landing-header">
                            Conquer coding questions
                        </h1>
                        <h1 className="landing-subtext">
                            An intuitive learning solution to learning
                            algorithms in an easy and enjoyable manner
                        </h1>
                        <div style={{ padding: '0 0 0 25%' }}>
                            <GetStartedButton />
                        </div>
                    </div>
                </Col>
                <Col
                    flex={5}
                    style={{
                        padding: '5% 10% 0 0',
                    }}
                >
                    <Developer />
                </Col>
            </Row>
            <div
                style={{
                    backgroundImage:
                        'linear-gradient(180deg, #FFFFFF 0%, #f2f3fa 100%)',
                    marginBottom: '20%',
                }}
            >
                <div style={{ marginTop: '20%' }} />
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
                    Planet Code aims to teach the fundamentals of data structure
                    and algorithm to prepare you for programming competitions or
                    interviews
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
        </LandingContainer>
    );
};

const LandingContainer = styled.div`
    width: 100%;
    height: 50%;
    background-image: url(${Background});
    background-size: cover;
`;

const CardContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Landing;
