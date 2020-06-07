import React, { useState } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { FaChartLine } from 'react-icons/fa';

const InfoCardThree = () => {
  const [hover, setHover] = useState(false);
  return (
    <CardContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hoverable
      title={
        hover ? (
          <FaChartLine size="3em" color="#067BC2" />
        ) : (
          <FaChartLine size="3em" color="#406E8E" />
        )
      }
      style={{ width: 300 }}
      headStyle={{ textAlign: 'center' }}
      className="launch-card"
    >
      <h1 style={{ textAlign: 'center' }}>User Statistics</h1>
      <p style={{ fontSize: '1em', textAlign: 'center' }}>
        View your user data which details accuracy, efficiency, and much more
        information.
      </p>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  @media screen and (max-width: 500px) {
    margin: 6% 0 6% 0;
  }
`;

export default InfoCardThree;
