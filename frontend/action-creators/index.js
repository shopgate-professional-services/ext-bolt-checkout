import {
  RECEIVE_BOLT_CART_TOKEN,
  REQUEST_BOLT_CART_TOKEN,
  ERROR_BOLT_CART_TOKEN,
} from '../constants';

/**
 * Request Bolt Cart Token action.
 * @returns {Object}
 */
export const requestBoltCartToken = () => ({
  type: REQUEST_BOLT_CART_TOKEN,
});

/**
 * Receive Bolt Cart Token action.
 * @param {string} boltCartToken bolt cart token
 * @returns {Object}
 */
export const receiveBoltCartToken = boltCartToken => ({
  type: RECEIVE_BOLT_CART_TOKEN,
  boltCartToken,
});

/**
 * Error Bolt Token action.
 * @returns {Object}
 */
export const errorBoltCartToken = () => ({
  type: ERROR_BOLT_CART_TOKEN,
});
