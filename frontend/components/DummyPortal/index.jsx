import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import styles from './style';
import connect from './connector';

/**
 * The DummyPortal component
 */
class DummyPortal extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  /**
   * The render method
   * @return {JSX}
   */
  render() {
    return (
      <div className={styles.dummy}>
        <I18n.Text string="myExt.dummy" />
      </div>
    );
  }
}

export default connect(DummyPortal);
