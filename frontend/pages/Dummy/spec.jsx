import React from 'react';
import { mount } from 'enzyme';
import DummyPage from './index';

describe('DummyPage', () => {
  it('should render', () => {
    const wrapper = mount(<DummyPage />);

    expect(wrapper).toMatchSnapshot();
  });
});
