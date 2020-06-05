import React, { useState } from 'react';
import { Card } from 'antd';
import { FaCode } from 'react-icons/fa';

const InfoCardOne = () => {
  const [hover, setHover] = useState(false);
  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hoverable={true}
      title={
        hover ? (
          <FaCode size="3em" color="#067BC2" />
        ) : (
          <FaCode size="3em" color="#406E8E" />
        )
      }
      style={{ width: 300 }}
      headStyle={{ textAlign: 'center' }}
      className="launch-card"
    >
      <h1 style={{ textAlign: 'center' }}>Code Editor</h1>
      <p style={{ fontSize: '1em', textAlign: 'center' }}>
        Write out your solutions in a live, interactive, personalized code
        editor.
      </p>
    </Card>
  );
};

export default InfoCardOne;
