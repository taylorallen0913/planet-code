import React, { useEffect } from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loginUser } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errors = useSelector((state) => state.errors);

  useEffect(() => {
    if (isAuthenticated) history.push('/dashboard');

    return () => dispatch(clearErrors());
  });

  const onSubmit = (values) => {
    const userData = {
      email: values.email,
      password: values.password,
    };

    dispatch(loginUser(userData));
  };

  return (
    <Container>
      <FormContainer>
        <Form onFinish={onSubmit}>
          <InputContainer>
            <LoginHeader>Log In to Your Account</LoginHeader>

            <Form.Item name="email" style={{ margin: 0 }}>
              <Input placeholder="email" size="large" />
            </Form.Item>
            {errors.email || errors.emailnotfound ? (
              <ErrorText>{errors.email || errors.emailnotfound}</ErrorText>
            ) : (
              <div style={{ margin: '3%' }} />
            )}
            <Form.Item name="password" style={{ margin: 0 }}>
              <Input.Password placeholder="password" size="large" />
            </Form.Item>
            {errors.password || errors.passwordincorrect ? (
              <ErrorText>
                {errors.password || errors.passwordincorrect}
              </ErrorText>
            ) : null}
            <ForgotPassword>Forgot Your Password?</ForgotPassword>
            <Button type="primary" size="large" htmlType="submit" block>
              Log in
            </Button>
            <SignUpContainer to="/register">
              Don't have an account? Sign up
            </SignUpContainer>
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

const LoginHeader = styled.h1`
  text-align: center;
  font-size: 2.5em;
  margin: 10% 0 13% 0;
`;

const ForgotPassword = styled(Link)`
  float: right;
  margin: 4% 0 15% 0;
`;

const SignUpContainer = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 5% 0 10% 0;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1em;
  padding: 1%;
`;

export default Login;
