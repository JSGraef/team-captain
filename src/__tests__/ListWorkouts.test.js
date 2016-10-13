import React from 'react';
import { shallow } from 'enzyme';
import ListWorkouts from '../ListWorkouts';
import ListWorkoutsList from '../ListWorkoutsList';
import ListWorkoutsFilter from '../ListWorkoutsFilter';

const workouts = require('../sample-workouts');

describe('<ListWorkouts />', () => {
  it('renders without crashing', () => {
    shallow(<ListWorkouts workouts={workouts} />);
  });

  it('renders filter component', () => {
    const wrapper = shallow(<ListWorkouts workouts={workouts} />);
    expect(wrapper.find('ListWorkoutsFilter').length).toBe(1);
  });

  it('renders list component', () => {
    const wrapper = shallow(<ListWorkouts workouts={workouts} />);
    expect(wrapper.find('ListWorkoutsList').length).toBe(1);
  });


});