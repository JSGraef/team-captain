import React from 'react';
import { shallow } from 'enzyme';
import WorkoutNotes from '../WorkoutNotes';

const workout = require('../sample-workout');

describe('<WorkoutNotes />', () => {
  it('renders without crashing', () => {
    shallow(<WorkoutNotes notes={workout.info.notes} />);
  });

  it('renders proper notes', () => {
    const workoutNotes = shallow(<WorkoutNotes notes={workout.info.notes} />);
    const notes = 'Training full-range effort from 50s to 200s at maximum effort.';
    expect(workoutNotes.contains(notes)).toEqual(true);
  });

});