import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Result, Spin } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const CheckoutForm = ({ success }) => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const onFinish = async (values) => {
    setLoading(true);
    // console.log(values);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    // const billingDetails = {
    //   name: values,
    //   email: values,
    //   address: {
    //     city: values,
    //     line1: values,
    //     state: values,
    //     postal_code: values,
    //   },
    // };

    axios
      .post('/api/checkout/charge', {
        id: paymentMethod.id,
        amount: 100,
      })
      .then((data) => {
        console.log(data);
        success();
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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

          <Form.Item style={{ margin: '5% 0 5% 15%' }}>
            <CardElement options={CARD_OPTIONS} />
          </Form.Item>

          {loading && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
              style={{ textAlign: 'center', margin: '5% 0 5% 46%' }}
            />
          )}

          <Button type="primary" htmlType="submit">
            Purchase
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
    return (
      <Result
        status="success"
        title={<h1>Checkout Successful!</h1>}
        subTitle={<h3>I have severe autism</h3>}
      />
    );
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

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: 'black',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: 'black',
    },
  },
};

export default CheckoutFormContainer;
