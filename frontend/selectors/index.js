import { createSelector } from 'reselect';
import { REDUX_NAMESPACE_BOLT_CART_TOKEN } from '../constants';

/**
 * @param {Object} state state
 * @return {Object}
 */
export const getBoltCartTokenState = state => state.extensions[REDUX_NAMESPACE_BOLT_CART_TOKEN];

export const getBoltCartToken = createSelector(
  getBoltCartTokenState,
  ({ cartToken }) => cartToken
);
