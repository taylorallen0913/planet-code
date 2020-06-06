import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CardForm from '../CardForm';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
};

const CheckoutForm = ({ success }) => {
  const [receiptUrl, setReceiptUrl] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const onFinish = async (values) => {
    console.log('Success:', values);

    const { token } = await stripe.createToken({
      name: 'customer name',
    });

    const billingDetails = {
      name: values,
      email: values,
      address: {
        city: values,
        line1: values,
        state: values,
        postal_code: values,
      },
    };

    const order = await axios.post('http://localhost:5000/api/stripe/charge', {
      amount: '100'.replace('.', ''),
      source: token.id,
      receipt_email: 'customer@example.com',
    });

    setReceiptUrl(order.data.charge.receipt_url);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <Row>
      <Col flex={3} />
      <Col flex={3}>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ marginTop: '10%', marginLeft: '15%' }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: true, message: 'Please input your address' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: 'Please input your state' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Zip"
            name="zip"
            rules={[{ required: true, message: 'Please input your zip' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ margin: '5% 0 5% 15%' }} label="Card" name="card">
            <CardForm onFinish={(val) => console.log(val)} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Col>
      <Col flex={3} />
    </Row>
  );
};

const stripePromise = loadStripe('pk_test_EthHI1NtfuKAoz5F7En5zyZ500VHFzR0H8');

const CheckoutFormContainer = () => {
  const [status, setStatus] = useState('ready');

  if (status === 'success') {
    return <div>Congrats on your empanadas!</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        success={() => {
          setStatus('success');
        }}
      />
    </Elements>
  );
};

export default CheckoutFormContainer;
