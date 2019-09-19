/* globals BoltCheckout */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { logger } from '@shopgate/pwa-core';
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
  initiatedCheckout,
}) => {
  if (!orderToken) {
    fetchBoltCartToken();
  }

  useEffect(() => {
    // If script is already there and ready, it will simply resolve.
    injectBoltConnect()
      .then(() => {
        const cart = {
          orderToken,
        };
        const hints = {};
        if (prefill) {
          hints.prefill = prefill;
        }

        const callbacks = {
          onCheckoutStart: initiatedCheckout,
          success: (transaction, callback) => {
            processOrder(transaction);
            callback();
          },
        };

        // Call configure to make the button appear. Takes carts, hints, and callbacks
        BoltCheckout.configure(cart, hints, callbacks);
      })
      .catch((error) => {
        logger.error(error);
      });
  }, [orderToken, prefill]);

  return <CheckoutButton busy={isCartBusy} />;
};

CartCheckoutButton.propTypes = {
  fetchBoltCartToken: PropTypes.func.isRequired,
  initiatedCheckout: PropTypes.func.isRequired,
  isCartBusy: PropTypes.bool.isRequired,
  processOrder: PropTypes.func.isRequired,
  orderToken: PropTypes.string,
  prefill: PropTypes.shape(),
};

CartCheckoutButton.defaultProps = {
  orderToken: null,
  prefill: {},
};

export default CartCheckoutButton;
