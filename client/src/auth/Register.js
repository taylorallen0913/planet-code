import React, { useEffect } from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { registerUser } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errors = useSelector((state) => state.errors);

  useEffect(() => {
    if (isAuthenticated) history.push('/dashboard');

    return () => {
      dispatch(clearErrors());
    };
  }, []);

  const onSubmit = (values) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      password2: values.password2,
    };

    dispatch(registerUser(userData, history));
  };

  return (
    <Container>
      <FormContainer>
        <Form onFinish={onSubmit}>
          <InputContainer>
            <RegisterHeader>Create an Account</RegisterHeader>
            <Form.Item name="name" style={{ margin: 0 }}>
              <Input autoComplete="off" placeholder="username" size="large" />
            </Form.Item>
            {errors.name ? (
              <ErrorText>{errors.name}</ErrorText>
            ) : (
              <div style={{ margin: '3%' }} />
            )}
            <Form.Item name="email" style={{ margin: 0 }}>
              <Input autoComplete="off" placeholder="email" size="large" />
            </Form.Item>
            {errors.email ? (
              <ErrorText>{errors.email}</ErrorText>
            ) : (
              <div style={{ margin: '3%' }} />
            )}
            <Form.Item name="password" style={{ margin: 0 }}>
              <Input.Password
                autoComplete="off"
                placeholder="password"
                size="large"
              />
            </Form.Item>
            {errors.password2 ? (
              <ErrorText>{errors.password2}</ErrorText>
            ) : (
              <div style={{ margin: '3%' }} />
            )}
            <Form.Item name="password2" style={{ margin: 0 }}>
              <Input.Password
                autoComplete="off"
                placeholder="confirm password"
                size="large"
              />
            </Form.Item>
            {errors.password2 ? (
              <ErrorText>{errors.password2}</ErrorText>
            ) : null}
            <div style={{ marginTop: '10%' }} />
            <Button type="primary" size="large" htmlType="submit" block>
              Register
            </Button>
            <LoginContainer to="/login">
              Already have an account? Log in
            </LoginContainer>
          </InputContainer>
        </Form>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 5%;
`;
const FormContainer = styled(Card)`
  margin: auto;
  width: 600px;

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const InputContainer = styled.div`
  width: 80%;
  margin-left: 10%;
`;

const RegisterHeader = styled.h1`
  text-align: center;
  font-size: 2.5em;
  margin: 10% 0 13% 0;
`;

const LoginContainer = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 5% 0 10% 0;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1em;
  padding: 1%;
`;

export default Register;
