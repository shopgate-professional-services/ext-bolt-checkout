/* globals BoltCheckout */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import injectBoltConnect from '../../helpers/injectBoltConnect';
import CheckoutButton from '../../components/CheckoutButton';
/**
 * @returns {JSX}
 */
const CartCheckoutButton = ({
  orderToken,
  prefill,
  fetchBoltCartToken,
  processOrder,
  isCartBusy,
}) => {
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
        if (prefill) {
          hints.prefill = prefill;
        }

        const callbacks = {
          success: (transaction, callback) => {
            console.warn('success!', transaction);

            processOrder(transaction);

            callback();
          },
        };

        // Call configure to make the button appear. Takes carts, hints, and callbacks
        BoltCheckout.configure(cart, hints, callbacks);
      })
      .catch((error) => {
        // How to handle error here? Retry?
      });
  }, [orderToken, prefill]);

  return <CheckoutButton busy={isCartBusy} />;
};

CartCheckoutButton.propTypes = {
  fetchBoltCartToken: PropTypes.func.isRequired,
  processOrder: PropTypes.func.isRequired,
  isCartBusy: PropTypes.bool.isRequired,
  orderToken: PropTypes.string,
  prefill: PropTypes.shape(),
};

CartCheckoutButton.defaultProps = {
  orderToken: null,
  prefill: {},
};

export default CartCheckoutButton;
