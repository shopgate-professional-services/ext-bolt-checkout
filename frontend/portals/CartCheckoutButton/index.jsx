/* globals BoltCheckout */
import React, { useEffect, memo } from 'react';
import CheckoutButton from '../../components/CheckoutButton';
import injectBoltConnect from '../../helpers/injectBoltConnect';

/**
 * @returns {JSX}
 */
const CartCheckoutButton = () => {
  const cart = {
    orderToken: '223be4ffc4c3337733dadcab14f05dddefb06a037a6ed13e3d8d2902e0a7e1bf',
  };
  const hints = {};
  const callbacks = {
    success: (transaction, callback) => {
      callback();
    },
  };
  useEffect(() => {
    // If script is already there and ready, it will simply resolve.
    injectBoltConnect()
      .then(() => {
        // Call configure to make the button appear. Takes carts, hints, and callbacks
        BoltCheckout.configure(cart, hints, callbacks);
      })
      .catch((error) => {
        // How to handle error here? Retry?
      });
  }, []);

  return <CheckoutButton />;
};

// memo is like componentShouldUpdate. Here we make sure it will render only once.
export default memo(CartCheckoutButton, () => true);
