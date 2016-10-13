import React from 'react';
import { shallow } from 'enzyme';
import ListWorkoutsList from '../ListWorkoutsList';

const workouts = require('../sample-workouts');

describe('<ListWorkoutsList />', () => {
  it('renders without crashing', () => {
    shallow(<ListWorkoutsList workouts={workouts} />);
  });

  it('renders all workouts', () => {
    const wrapper = shallow(<ListWorkoutsList workouts={workouts} />);
    const length = Object.keys(workouts).length;
    expect(wrapper.find('.mdl-list__item').length).toBe(length);
  });

  it('renders title of all workouts', () => {
    const wrapper = shallow(<ListWorkoutsList workouts={workouts} />);
    expect(wrapper.contains('L2 - Effort Training')).toEqual(true);
    expect(wrapper.contains('Wednesday workout')).toEqual(true);
    expect(wrapper.contains('IM Workout')).toEqual(true);
  });

  it('renders links to workouts (View)', () => {
    const wrapper = shallow(<ListWorkoutsList workouts={workouts} />);
    const length = Object.keys(workouts).length;
    expect(wrapper.find('Link').length).toBe(length);
  });

  it('renders notes about workout', () => {
    const wrapper = shallow(<ListWorkoutsList workouts={workouts} />);
    const length = Object.keys(workouts).length;
    expect(wrapper.find('.mdl-list__item-text-body').length).toBe(length);
  });


});