import React from 'react';
import { shallow } from 'enzyme';

import CreateWorkout from '../CreateWorkout';
import CreateWorkoutSet from '../CreateWorkoutSet';
import CreateWorkoutInfo from '../CreateWorkoutInfo';

const workout = require('../sample-workout');

describe('<CreateWorkout />', () => {

  it('renders without crashing', () => {
    shallow(<CreateWorkout edit={false} workout={workout} />);
  });

  it('renders "Edit" while editing flag is true', () => {
    const wrapper = shallow(<CreateWorkout edit={true} workout={workout} />);
    expect(wrapper.contains('Edit workout')).toEqual(true);
  });

  it('renders "Create" while editing flag is false', () => {
    const wrapper = shallow(<CreateWorkout edit={false} workout={workout} />);
    expect(wrapper.contains('Create a workout')).toEqual(true);
  });  

  it('renders CreateWorkoutInfo', () => {
    const wrapper = shallow(<CreateWorkout edit={false} workout={workout} />);
    expect(wrapper.find(CreateWorkoutInfo).length).toBe(1);
  });

  it('renders CreateWorkoutSet for each set in workout', () => {
    const wrapper = shallow(<CreateWorkout edit={false} workout={workout} />);
    const length = Object.keys(workout.sets).length;
    expect(wrapper.find(CreateWorkoutSet).length).toBe(length);
  });

});

