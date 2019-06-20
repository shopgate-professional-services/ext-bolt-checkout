import {
  RECEIVE_DUMMIES,
  REQUEST_DUMMIES,
  ERROR_DUMMIES,
} from '../constants';

/**
 * RequestDummies action.
 * @param {string} dummyId dummyId.
 * @returns {Object}
 */
export const requestDummies = dummyId => ({
  type: REQUEST_DUMMIES,
  dummyId,
});

/**
 * ReceiveDummies action.
 * @param {string} dummyId dummyId.
 * @param {Array} dummies dummies.
 * @returns {Object}
 */
export const receiveDummies = (dummyId, dummies) => ({
  type: RECEIVE_DUMMIES,
  dummyId,
  dummies,
});

/**
 * ErrorDummies action.
 * @param {string} dummyId dummyId.
 * @returns {Object}
 */
export const errorDummies = dummyId => ({
  type: ERROR_DUMMIES,
  dummyId,
});
