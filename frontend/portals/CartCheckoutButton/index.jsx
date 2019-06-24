import React, { useEffect, memo } from 'react';
import CheckoutButton from '../../components/CheckoutButton';
import injectBoltConnect from '../../helpers/injectBoltConnect';

/**
 * @returns {JSX}
 */
const CartCheckoutButton = () => {
  useEffect(async () => {
    // If script is already there and ready, it will simply resolve.
    await injectBoltConnect();
    // Call configure to make the button appear.
    BoltCheckout.configure();
  }, []);

  return (
    <CheckoutButton />
  );
};

// memo is like componentShouldUpdate. Here we make sure it will render only once.
export default memo(CartCheckoutButton, () => true);
