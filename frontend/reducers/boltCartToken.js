import { UPDATE_PRODUCTS_IN_CART } from '@shopgate/engage/cart';
import {
  RECEIVE_BOLT_CART_TOKEN,
  REQUEST_BOLT_CART_TOKEN,
  ERROR_BOLT_CART_TOKEN,
} from '../constants';

/**
 * Bolt Cart Token Reducer
 * @param {Object} state State.
 * @param {Object} action Action.
 * @returns {Object}
 */
const boltTokenReducer = (
  state = {
    cartToken: null,
    isFetching: false,
    willUpdate: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_PRODUCTS_IN_CART: {
      return {
        ...state,
        willUpdate: true,
      };
    }
    case REQUEST_BOLT_CART_TOKEN:
      return {
        ...state,
        isFetching: true,
        willUpdate: false,
      };
    case RECEIVE_BOLT_CART_TOKEN:
      return {
        ...action.boltCartToken,
        isFetching: false,
        willUpdate: false,
      };
    case ERROR_BOLT_CART_TOKEN:
      return {
        ...state,
        isFetching: false,
        willUpdate: false,
      };
    default:
      return state;
  }
};

export default boltTokenReducer;
