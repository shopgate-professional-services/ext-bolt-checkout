import { PREFILL_MAP } from '../constants';
/**
 * Constructs Prefill Object for Bolt Checkout
 * @param {Object} data User Data
 * @returns {Array}
 */
const constructPrefill = (data) => {
  if (!data) {
    return {};
  }

  const prefill = PREFILL_MAP.reduce((currentResult, el) => {
    const { bolt, shopgate } = el;

    if (data.hasOwnProperty(shopgate)) {
      currentResult.push({ [bolt]: data[shopgate] });
    }

    return currentResult;
  }, []).reduce((currentResult, el) => {
    const key = Object.keys(el)[0];
    // eslint-disable-next-line no-param-reassign
    currentResult[key] = el[key];
    return currentResult;
  }, {});
  return prefill;
};

export default constructPrefill;
