/* globals BoltCheckout */
import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { getBoltCartToken } from '../../selectors';
import {
  fetchBoltCartToken,
  flushCart
} from '../../actions';
import CheckoutButton from '../../components/CheckoutButton';
import injectBoltConnect from '../../helpers/injectBoltConnect';

const mapStateToProps = state => ({
  orderToken: getBoltCartToken(state),
});

const mapDispatchToProps = {
  fetchBoltCartToken,
  flushCart,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * @returns {JSX}
 */
const CartCheckoutButton = ({ orderToken, fetchBoltCartToken, flushCart:clearCart }) => {
  if (!orderToken) {
    fetchBoltCartToken();
  }

  useEffect(() => {
    // If script is already there and ready, it will simply resolve.
    injectBoltConnect()
      .then(() => {
        console.warn(orderToken);
        const cart = {
          orderToken: orderToken,
        };
        const hints = {};
        const callbacks = {
          success: (transaction, callback) => {
            console.warn('success!');
            clearCart();
            callback();
            // TODO: history rest etc
            // TODO: add tracking here
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

export default connector(CartCheckoutButton);
