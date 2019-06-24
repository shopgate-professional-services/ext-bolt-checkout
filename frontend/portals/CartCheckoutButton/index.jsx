import React, { useEffect, memo } from 'react';
import CheckoutButton from '../../components/CheckoutButton';
import injectBoltConnect from '../../helpers/injectBoltConnect';

/**
 * @returns {JSX}
 */
const CartCheckoutButton = () => {
  useEffect(async () => {
    await injectBoltConnect();
    BoltCheckout.configure();
  }, []);

  return (
    <CheckoutButton />
  );
};

export default memo(CartCheckoutButton, () => true);
