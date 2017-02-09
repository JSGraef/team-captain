import React from 'react';
import { shallow } from 'enzyme';

import Team from '../MeetReader/Team';
import Swimmer from '../MeetReader/Swimmer';

const teams = require('../sample-teams');

describe('<Team />', () => {
  it('renders without crashing', () => {
    shallow(<Team />);
  });

  it('renders no team', () => {
    const wrapper = shallow(<Team />);
    const text = "Couldn't find team";
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders no team', () => {
    const wrapper = shallow(<Team team={teams[0]} />);
    expect(wrapper.contains("Viking Aquatic Club")).toEqual(true);
  });

  it('renders swim event', () => {
    const wrapper = shallow(<Team team={teams[0]}/>);
    expect(wrapper.find(Swimmer).length).toBe(69);
  });
});