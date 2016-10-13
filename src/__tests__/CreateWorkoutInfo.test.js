import React from 'react';
import { shallow } from 'enzyme';
import CreateWorkoutInfo from '../CreateWorkoutInfo';

const workout = require('../sample-workout');

describe('<CreateWorkoutInfo />', () => {
  it('renders without crashing', () => {
    shallow(<CreateWorkoutInfo info={workout.info} />);
  });

  it('renders labels', () => {
    const wrapper = shallow(<CreateWorkoutInfo info={workout.info} />);
    expect(wrapper.contains('Workout Title')).toEqual(true);
    expect(wrapper.contains(`Coach's Name`)).toEqual(true);
    expect(wrapper.contains('Workout Tags')).toEqual(true);
    expect(wrapper.contains('Workout Notes')).toEqual(true);
  });

});