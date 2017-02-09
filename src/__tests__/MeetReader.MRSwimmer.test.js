import React from 'react';
import { shallow } from 'enzyme';

import MRSwimmer from '../MeetReader/MRSwimmer';
import Swimmer from '../MeetReader/Swimmer';
const teams = require('../sample-teams');

describe('<MRSwimmer />', () => {
  it('renders without crashing', () => {
    shallow(<MRSwimmer />);
  });

  it('renders no team', () => {
    const wrapper = shallow(<MRSwimmer />);
    expect(wrapper.contains("Couldn't find that swimmer")).toEqual(true);
  });

  it('renders team', () => {
    const wrapper = shallow(<MRSwimmer teams={teams} routeParams={{swimmerid: "121699JOSMDA"}} />);
    expect(wrapper.find(Swimmer).length).toBe(1);
  });

  it('renders cant find specific team', () => {
    const wrapper = shallow(<MRSwimmer teams={teams} routeParams={{swimmerid: "INVALID"}} />);
    expect(wrapper.contains("Couldn't find that swimmer")).toEqual(true);
  });
});