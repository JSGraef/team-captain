import React from 'react';
import { shallow } from 'enzyme';
import SetDivider from '../SetDivider';

describe('<SetDivider />', () => {
  
  it('renders without crashing', () => {
    shallow(<SetDivider thick={true} />);
  });

  it('renders thick bar', () => {
    const wrapper = shallow(<SetDivider thick={true} />);
    expect(wrapper.find('.topbar').length).toBe(1);
  });

  it('renders thin bar with props', () => {
    const wrapper = shallow(<SetDivider thick={false} />);
    expect(wrapper.find('.divider').length).toBe(1);
  });

  it('renders thin bar with no props', () => {
    const wrapper = shallow(<SetDivider thick={false} />);
    expect(wrapper.find('.divider').length).toBe(1);
  });

});