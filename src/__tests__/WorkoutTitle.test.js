import React from 'react';
import { shallow } from 'enzyme';
import WorkoutTitle from '../WorkoutTitle';

const workout = require('../sample-workout');

describe('<WorkoutTitle />', () => {
  it('renders without crashing', () => {
    shallow(<WorkoutTitle info={workout.info} />);
  });

  it('renders proper title', () => {
    const workoutTitle = shallow(<WorkoutTitle info={workout.info} />);
    const title = 'L2 - Effort Training';
    expect(workoutTitle.contains(title)).toEqual(true);
  });

  it('renders proper coach', () => {
    const workoutTitle = shallow(<WorkoutTitle info={workout.info} />);
    const coach = 'Josh Graef';
    expect(workoutTitle.contains(coach)).toEqual(true);
  });

  it('renders proper type', () => {
    const workoutTitle = shallow(<WorkoutTitle info={workout.info} />);
    const type = 'Speed';
    expect(workoutTitle.contains(type)).toEqual(true);
  });

  it('renders proper distance', () => {
    const workoutTitle = shallow(<WorkoutTitle info={workout.info} />);
    const distance = 4050;
    expect(workoutTitle.contains(distance)).toEqual(true);
  });

});