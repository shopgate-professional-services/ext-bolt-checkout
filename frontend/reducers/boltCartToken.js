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
  },
  action
) => {
  switch (action.type) {
    case REQUEST_BOLT_CART_TOKEN:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_BOLT_CART_TOKEN:
      return {
        ...action.boltCartToken,
        isFetching: false,
      };
    case ERROR_BOLT_CART_TOKEN:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default boltTokenReducer;
