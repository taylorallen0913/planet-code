import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Tag } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import './styles.css';

const { Column } = Table;

const Practice = () => {
  const [questions, setQuestions] = useState();
  const [questionsCorrect, setQuestionsCorrect] = useState([]);

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    getAllQuestions();
    getCompleteQuestions();
  }, []);

  const getCompleteQuestions = () => {
    axios
      .post('/api/correct/get', {
        userId: user.id,
      })
      .then((res) => {
        setQuestionsCorrect(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getAllQuestions = () => {
    axios
      .get('/api/questions/get-questions')
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDifficulty = (difficultyNum) => {
    let difficulty;

    switch (difficultyNum) {
      case 1:
        difficulty = 'Easy';
        break;
      case 2:
        difficulty = 'Medium';
        break;
      case 3:
        difficulty = 'Hard';
        break;
      default:
        break;
    }

    return difficulty;
  };

  return (
    <Row>
      <Col flex={2} />
      <Col flex={8} style={{ marginTop: '5%' }}>
        {questions && (
          <TableContainer>
            <Table dataSource={questions}>
              <Column title="ID" dataIndex="id" key="id" />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
                render={(text, record) => (
                  <Link to={`/practice/${record.id}`}>{record.name}</Link>
                )}
              />
              <Column
                title="Tags"
                dataIndex="tags"
                key="tags"
                render={(tags) => {
                  if (tags && tags.length > 0)
                    return (
                      <>
                        {tags.map((tag) => {
                          return <Tag color="red">{tag}</Tag>;
                        })}
                      </>
                    );
                  return <div />;
                }}
              />
              <Column
                title="Difficulty"
                dataIndex="difficulty"
                key="difficulty"
                render={(text, record) => (
                  <div>{getDifficulty(record.difficulty)}</div>
                )}
              />
              <Column
                title="Completion"
                dataIndex="completion"
                key="completion"
                render={(text, record) => (
                  <div style={{ marginLeft: '7%' }}>
                    {questionsCorrect.includes(record.id) ? (
                      <CheckOutlined style={{ color: '#007f00' }} />
                    ) : (
                      <CloseOutlined style={{ color: '#CF142B' }} />
                    )}
                  </div>
                )}
              />
            </Table>
          </TableContainer>
        )}
      </Col>
      <Col flex={2} />
    </Row>
  );
};

const TableContainer = styled.div``;

export default Practice;
