import React from 'react';
import { mount } from 'enzyme';
import DummyPortal from './index';

describe('DummyPortal', () => {
  it('should render', () => {
    const wrapper = mount(<DummyPortal />);

    expect(wrapper).toMatchSnapshot();
  });
});
