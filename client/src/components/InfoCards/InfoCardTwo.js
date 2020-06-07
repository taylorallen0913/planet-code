import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { FaPlayCircle } from 'react-icons/fa';

const InfoCardTwo = () => {
  const [hover, setHover] = useState(false);
  return (
    <CardContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hoverable
      title={
        hover ? (
          <FaPlayCircle size="3em" color="#067BC2" />
        ) : (
          <FaPlayCircle size="3em" color="#406E8E" />
        )
      }
      style={{ width: 300 }}
      headStyle={{ textAlign: 'center' }}
      className="launch-card"
    >
      <h1 style={{ textAlign: 'center' }}>Explanation Videos</h1>
      <p style={{ fontSize: '1em', textAlign: 'center' }}>
        Watch how to derive the proper solution with our integrated video
        solutions.
      </p>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  @media screen and (max-width: 500px) {
    margin: 6% 0 6% 0;
  }
`;

export default InfoCardTwo;
