import { connect } from 'react-redux';
import { getBoltCartToken, getPrefill, getIsCartBusy } from '../../selectors';
import { fetchBoltCartToken, processOrder } from '../../actions';

// eslint-disable-next-line require-jsdoc
const mapStateToProps = state => ({
  orderToken: getBoltCartToken(state),
  prefill: getPrefill(state),
  isCartBusy: getIsCartBusy(state),
});

const mapDispatchToProps = {
  fetchBoltCartToken,
  processOrder,
};

export default connect(mapStateToProps, mapDispatchToProps);
