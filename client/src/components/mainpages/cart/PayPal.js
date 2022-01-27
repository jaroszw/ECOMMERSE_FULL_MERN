import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const PaypalButton = (props) => {
  const onSuccess = (payment) => {
    console.log('The payment was succeeded!', payment);
    props.tranSuccess(payment);
  };

  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
  };

  const onError = (err) => {
    console.log('Error!', err);
  };

  let env = 'sandbox';
  let currency = 'USD';
  let total = 1;

  const client = {
    sandbox: `${process.env.REACT_APP_PAYPAL_ID}`,
    production: 'YOUR-PRODUCTION-APP-ID',
  };

  let style = {
    size: 'small',
    color: 'blue',
    shape: 'rect',
    label: 'checkout',
    tegline: false,
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={style}
    />
  );
};

export default PaypalButton;
