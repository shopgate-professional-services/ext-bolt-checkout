import { connect } from 'react-redux';
import { getBoltCartToken } from '../../selectors';
import { fetchBoltCartToken, processOrder } from '../../actions';

// eslint-disable-next-line require-jsdoc
const mapStateToProps = state => ({
  orderToken: getBoltCartToken(state),
});

const mapDispatchToProps = {
  fetchBoltCartToken,
  processOrder,
};

export default connect(mapStateToProps, mapDispatchToProps);
