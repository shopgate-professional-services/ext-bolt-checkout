import React, { useEffect } from 'react';
import CheckoutButton from '../../components/CheckoutButton';
import injectBoltConnect from '../../helpers/injectBoltConnect';

/**
 * @returns {JSX}
 */
const CartCheckoutButton = () => {
  useEffect(() => {
    if (!window.BoltConnect && !window.BoltCheckout) {
      injectBoltConnect();
    }
  });

  return (
    <CheckoutButton />
  );
};

export default CartCheckoutButton;
