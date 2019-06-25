import { connect } from 'react-redux';
import { getBoltCartToken, getPrefill } from '../../selectors';
import { fetchBoltCartToken, flushCart } from '../../actions';

// eslint-disable-next-line require-jsdoc
const mapStateToProps = state => ({
  orderToken: getBoltCartToken(state),
  prefill: getPrefill(state),
});

const mapDispatchToProps = {
  fetchBoltCartToken,
  flushCart,
};

export default connect(mapStateToProps, mapDispatchToProps);
