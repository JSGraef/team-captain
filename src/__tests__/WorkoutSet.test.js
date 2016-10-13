import React from 'react';
import { shallow } from 'enzyme';
import WorkoutSet from '../WorkoutSet';
import Swim from '../Swim';

const workout = require('../sample-workout');
const set = workout.sets['set-mainset'];
const set2 = workout.sets['set-warmup'];

describe('<WorkoutSet />', () => {
  it('renders without crashing', () => {
    shallow(<WorkoutSet set={set} />);
  });

  it('renders all contained swims', () => {
    const wrapper = shallow(<WorkoutSet set={set} />);
    const length = Object.keys(set.swims).length;
    expect(wrapper.find(Swim).length).toBe(length);
  });

  it('renders only one set', () => {
    const wrapper = shallow(<WorkoutSet set={set} />);
    expect(wrapper.find('.set').length).toBe(1);
  });

  it('renders reps bar', () => {
    const wrapper = shallow(<WorkoutSet set={set} />);
    expect(wrapper.find('.leftnumberborder').length).toBe(1);
  });

  it('does not render reps bar', () => {
    const wrapper = shallow(<WorkoutSet set={set2} />);
    expect(wrapper.find('.leftnumberborder').length).toBe(0);
  });

});