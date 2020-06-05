import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import PersonCoding from './SVGS/PersonCoding';
import ProgrammerThinking from './SVGS/ProgrammerThinking';
import Creative from './SVGS/Creative';
import Office from './SVGS/Office';
import BG from './SVGS/BG.svg';
import Developer from './SVGS/Developer.js';

import './styles.css';

const Landing = () => {
    return (
        <LandingContainer>
            <Row>
                <Col flex={3} style={{ margin: '0 0 0 3%' }}>
                    <div
                        className="col text-center left-side"
                        style={{ marginLeft: '10%' }}
                    >
                        <h1 className="landing-header">
                            Conquer coding questions
                        </h1>
                        <h1 className="landing-subtext">
                            An intuitive learning solution to learning
                            algorithms in an easy and enjoyable manner
                        </h1>
                        <Link to="/practice" style={{ textDecoration: 'none' }}>
                            <Button type="primary" size="large" danger>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </Col>
                <Col
                    flex={5}
                    style={{
                        margin: '5% 5% 0 0',
                    }}
                >
                    <Developer />
                </Col>
            </Row>
            <div style={{ marginTop: '500px' }} />
            <Row>
                <Col flex={5}>
                    <ProgrammerThinking />
                </Col>
                <Col flex={5}>
                    <h1 className="caption">
                        Learn how to think like a programmer
                    </h1>
                    <p className="sub-caption">
                        To master programming, you first need to master how to
                        think like a programmer. Thinking in terms of algorithms
                        teaches us this.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col flex={5}>
                    <h1 className="caption">Land your dream programming job</h1>
                    <p className="sub-caption">
                        An adept understanding of data structures and algorithms
                        is fundamental to crushing the coding interview and
                        getting your dream job.
                    </p>
                </Col>
                <Col flex={5}>
                    <Office />
                </Col>
            </Row>
            <Row>
                <Col flex={5}>
                    <Creative />
                </Col>
                <Col flex={5}>
                    <h1 className="caption">
                        Build your problem solving abilities
                    </h1>
                    <p className="sub-caption">
                        Programming is a puzzle and you need to solve it to
                        reach your solution. Learning algorithms gives you a
                        backbone in how you approach your solution.
                    </p>
                </Col>
            </Row>
        </LandingContainer>
    );
};

const LandingContainer = styled.div`
    width: 100%;
    height: 50%;
    background-image: url(${BG});
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`;

export default Landing;
