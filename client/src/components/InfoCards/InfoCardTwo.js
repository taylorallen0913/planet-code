import React, { useState } from 'react';
import { Card } from 'antd';
import { FaPlayCircle } from 'react-icons/fa';

const InfoCardTwo = (props) => {
    const [hover, setHover] = useState(false);
    return (
        <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            hoverable={true}
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
                Watch how to derive the proper solution with our integrated
                video solutions.
            </p>
        </Card>
    );
};

export default InfoCardTwo;
