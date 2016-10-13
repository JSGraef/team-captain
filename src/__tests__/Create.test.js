import React from 'react';
import { shallow } from 'enzyme';
import Create from '../Create';
import CreateWorkout from '../CreateWorkout';

describe('<Create />', () => {
  it('renders without crashing', () => {
    shallow(<Create />);
  });

  it('renders the CreateWorkout component', () => {
    const wrapper = shallow(<Create />);
    expect(wrapper.find(CreateWorkout).length).toBe(1);
  });

});