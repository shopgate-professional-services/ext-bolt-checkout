/* globals BoltCheckout */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import event from '@shopgate/pwa-core/classes/Event';
import injectBoltConnect from '../../helpers/injectBoltConnect';
import CheckoutButton from '../../components/CheckoutButton';
/**
 * @returns {JSX}
 */
const CartCheckoutButton = ({
  orderToken, prefill, fetchBoltCartToken, flushCart: clearCart,
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
        const hints = {
          prefill,
        };
        const callbacks = {
          success: (transaction, callback) => {
            console.warn('success!');

            clearCart();
            // TODO: track real order
            // check https://wiki.shopgate.guru/display/DEV/Web+Checkout+and+Web+Register for spec
            const order = {};
            // checkoutSuccess triggers resetHistory, fetchCart and tracking
            event.trigger('checkoutSuccess', order);

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
  flushCart: PropTypes.func.isRequired,
  orderToken: PropTypes.string,
  prefill: PropTypes.shape(),
};

CartCheckoutButton.defaultProps = {
  orderToken: null,
  prefill: {},
};

export default CartCheckoutButton;
