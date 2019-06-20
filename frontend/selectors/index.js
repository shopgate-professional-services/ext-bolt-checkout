import { createSelector } from 'reselect';

/**
 * @param {Object} state state
 * @returns {Object}
 */
const getDummyState = state => state.dummy;

/**
 * Returns dummies
 * @return {Array}
 */
export const getDummies = createSelector(
  getDummyState,
  dummy => dummy
);
