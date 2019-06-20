import {
  ERROR_DUMMIES,
  RECEIVE_DUMMIES,
  REQUEST_DUMMIES,
} from '../constants';

/**
 * Dummy reducer.
 * @param {Object} state State.
 * @param {Object} action Action.
 * @returns {Object}
 */
const dummyReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case REQUEST_DUMMIES:
      return {
        ...state,
        [action.dummyId]: {
          ...state[action.dummyId],
          isFetching: true,
          expires: 0,
        },
      };
    case RECEIVE_DUMMIES:
      return {
        ...state,
        [action.dummyId]: {
          ...state[action.dummyId],
          swatches: action.swatches,
          isFetching: false,
          expires: Date.now() + 3600000,
        },
      };
    case ERROR_DUMMIES:
      return {
        ...state,
        [action.dummyId]: {
          ...state[action.dummyId],
          isFetching: false,
          expires: 0,
        },
      };
    default:
      return state;
  }
};

export default dummyReducer;
