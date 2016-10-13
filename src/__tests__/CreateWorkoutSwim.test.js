import React from 'react';
import { shallow } from 'enzyme';
import CreateWorkoutSwim from '../CreateWorkoutSwim';

const workout = require('../sample-workout');
const swim = workout.sets['set-mainset'].swims['swim-0'];

describe('<CreateWorkoutSwim />', () => {
  it('renders without crashing', () => {
    shallow(<CreateWorkoutSwim swim={swim} />);
  });

  it('renders labels', () => {
    const wrapper = shallow(<CreateWorkoutSwim swim={swim} />);
    expect(wrapper.contains('Distance')).toEqual(true);
    expect(wrapper.contains('Swim Title / Stroke')).toEqual(true);
    expect(wrapper.contains('Notes for swim')).toEqual(true);
    expect(wrapper.contains('Interval / Rest')).toEqual(true);
  });

});