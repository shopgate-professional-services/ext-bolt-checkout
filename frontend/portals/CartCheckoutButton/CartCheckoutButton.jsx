/* globals BoltCheckout */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import injectBoltConnect from '../../helpers/injectBoltConnect';
import CheckoutButton from '../../components/CheckoutButton';
/**
 * @returns {JSX}
 */
const CartCheckoutButton = ({ orderToken, fetchBoltCartToken, processOrder }) => {
  if (!orderToken) {
    fetchBoltCartToken();
  }

  useEffect(() => {
    // If script is already there and ready, it will simply resolve.
    injectBoltConnect()
      .then(() => {
        console.warn(orderToken);
        const cart = {
          orderToken,
        };
        const hints = {};
        const callbacks = {
          success: (transaction, callback) => {
            console.warn('success!', transaction);

            processOrder();

            callback();
          },
        };

        // Call configure to make the button appear. Takes carts, hints, and callbacks
        BoltCheckout.configure(cart, hints, callbacks);
      })
      .catch((error) => {
        // How to handle error here? Retry?
      });
  }, [orderToken]);

  return <CheckoutButton />;
};

CartCheckoutButton.propTypes = {
  fetchBoltCartToken: PropTypes.func.isRequired,
  processOrder: PropTypes.func.isRequired,
  orderToken: PropTypes.string,
};

CartCheckoutButton.defaultProps = {
  orderToken: null,
};

export default CartCheckoutButton;
