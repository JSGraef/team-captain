import React from 'react';
import { shallow } from 'enzyme';

import ListWorkoutsFilter from '../ListWorkoutsFilter';

const workouts = require('../sample-workouts');

var wo = Object.keys(workouts);
var tags = wo.map((key) => {return workouts[key].info.type});
// Get unique set of workout types (no duplicates)
var taglist = Array.from(new Set(tags));
taglist.unshift('All');

describe('<ListWorkoutsFilter />', () => {
  it('renders without crashing', () => {
    shallow(<ListWorkoutsFilter tags={taglist} selected={taglist[0]} />);
  });

  it('renders title of all tags', () => {
    const wrapper = shallow(<ListWorkoutsFilter tags={taglist} selected={taglist[0]} />);
    expect(wrapper.contains('All')).toEqual(true);
    expect(wrapper.contains('Speed')).toEqual(true);
    expect(wrapper.contains('Abs')).toEqual(true);
    expect(wrapper.contains('Endurance')).toEqual(true);
  });

  it('renders all links', () => {
    const wrapper = shallow(<ListWorkoutsFilter tags={taglist} selected={taglist[0]} />);
    const length = taglist.length;
    expect(wrapper.find('.mdl-button').length).toBe(length);
  });

  it('renders highlighted button', () => {
    const wrapper = shallow(<ListWorkoutsFilter tags={taglist} selected={taglist[0]} />);
    const length = taglist.length;
    expect(wrapper.find('.mdl-button--accent').length).toBe(1);
  });


});