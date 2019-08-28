import { connect } from 'react-redux';
import { getBoltCartToken, getPrefill, getIsCartBusy } from '../../selectors';
import { fetchBoltCartToken, processOrder, initiatedCheckout } from '../../actions';

// eslint-disable-next-line require-jsdoc
const mapStateToProps = state => ({
  orderToken: getBoltCartToken(state),
  prefill: getPrefill(state),
  isCartBusy: getIsCartBusy(state),
});

/**
 * Maps action dispatchers to the component props.
 * @param {Function} dispatch The store dispatcher.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  fetchBoltCartToken,
  processOrder: transaction => dispatch(processOrder(transaction)),
  initiatedCheckout: () => dispatch(initiatedCheckout()),
});

export default connect(mapStateToProps, mapDispatchToProps);
