import React from 'react';
import { Route } from '@shopgate/pwa-common/components';
import DummyPage from '../../pages/Dummy';
import { DUMMY_PATH } from '../../constants';

/**
 * @returns {JSX}
 */
export default () => (<Route pattern={DUMMY_PATH} component={DummyPage} />);
