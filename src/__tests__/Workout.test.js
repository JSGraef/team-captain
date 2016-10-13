import React from 'react';
import { shallow } from 'enzyme';

import Workout from '../Workout';
import WorkoutSet from '../WorkoutSet';
import WorkoutTitle from '../WorkoutTitle';
import WorkoutNotes from '../WorkoutNotes';

const workout = require('../sample-workout');

describe('<Workout />', () => {
  it('renders without crashing', () => {
    shallow(<Workout workout={workout} />);
  });

  it('renders title info', () => {
    const wrapper = shallow(<Workout workout={workout} />);
    expect(wrapper.find(WorkoutTitle).length).toBe(1);
  });

  it('renders all sets', () => {
    const wrapper = shallow(<Workout workout={workout} />);
    const length = Object.keys(workout.sets).length;
    expect(wrapper.find(WorkoutSet).length).toBe(length);
  });

  it('renders notes', () => {
    const wrapper = shallow(<Workout workout={workout} />);
    expect(wrapper.find(WorkoutNotes).length).toBe(1);
  });

});