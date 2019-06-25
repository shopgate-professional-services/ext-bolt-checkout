import { createSelector } from 'reselect';
import { getUserData } from '@shopgate/pwa-common/selectors/user';
import ConstructPrefill from '../helpers/constructPrefill';
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

export const getPrefill = createSelector(
  getUserData,
  (userData) => {
    const prefill = ConstructPrefill(userData);
    return prefill;
  }
);
