import React, { useEffect, memo } from 'react';
import CheckoutButton from '../../components/CheckoutButton';
import injectBoltConnect from '../../helpers/injectBoltConnect';

/**
 * @returns {JSX}
 */
const CartCheckoutButton = () => {
  const cart = {
    orderToken: '<token>',
  };
  const hints = {};
  const callbacks = {
    succes: (transaction, callback) => {
      callback();
    },
  };
  useEffect(() => {
    /**
     * async function to inject Bolt script
     */
    const injectScript = async () => {
      await injectBoltConnect;
    };
    // If script is already there and ready, it will simply resolve.
    injectScript();
    // Call configure to make the button appear. Takes carts, hints, and callbacks
    BoltCheckout.configure(cart, hints, callbacks);
  }, []);

  return (
    <CheckoutButton />
  );
};

// memo is like componentShouldUpdate. Here we make sure it will render only once.
export default memo(CartCheckoutButton, () => true);
