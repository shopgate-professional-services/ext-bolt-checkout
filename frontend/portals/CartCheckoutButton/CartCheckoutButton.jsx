/* globals BoltCheckout */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { logger } from '@shopgate/pwa-core';
import injectBoltConnect from '../../helpers/injectBoltConnect';
import CheckoutButton from '../../components/CheckoutButton';
import getConfig from '../../helpers/getConfig';

const { maximumBoltInjectionRetries } = getConfig();
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
    /**
     * Retry promise to handle maximum number of retries and provide error log
     * @returns {Function}
     */
    const retry = () => new Promise((resolve, reject) => {
      let retries = 0;
      injectBoltConnect()
        .then(resolve)
        .catch(() => {
          retries += 1;
          if (retries === maximumBoltInjectionRetries) {
            reject(new Error('Maximum retry limit reached'));
            return;
          }
          retry().then(resolve);
        });
    });
    // If script is already there and ready, it will simply resolve.
    retry()
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
  initiatedCheckout: PropTypes.bool.isRequired,
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
