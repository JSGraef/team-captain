import React from 'react';
import { shallow } from 'enzyme';

import MRTeam from '../MeetReader/MRTeam';
import Team from '../MeetReader/Team';

const teams = require('../sample-teams');

describe('<MRTeam />', () => {
  it('renders without crashing', () => {
    shallow(<MRTeam />);
  });

  it('renders no team', () => {
    const wrapper = shallow(<MRTeam />);
    expect(wrapper.contains("Couldn't find that team")).toEqual(true);
  });

  it('renders team', () => {
    const wrapper = shallow(<MRTeam teams={teams} routeParams={{teamid: "MRVAC"}} />);
    expect(wrapper.find(Team).length).toBe(1);
  });

  it('renders cant find specific team', () => {
    const wrapper = shallow(<MRTeam teams={teams} routeParams={{teamid: "INVALID"}} />);
    expect(wrapper.contains("Couldn't find that team")).toEqual(true);
  });
});