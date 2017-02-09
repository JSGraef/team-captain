import React from 'react';
import { shallow } from 'enzyme';

import TeamList from '../MeetReader/TeamList';
const teams = require('../sample-teams');

describe('<TeamList />', () => {
  it('renders without crashing', () => {
    shallow(<TeamList />);
  });

  it('renders without teams passed in', () => {
    const wrapper = shallow(<TeamList />);
    expect(wrapper.contains("Couldn't find team")).toEqual(true);
  });

  it('renders with teams passed in', () => {
    shallow(<TeamList teams={teams} />);
  });

  it('renders all events in list', () => {
    const wrapper = shallow(<TeamList teams={teams} />);
    expect(wrapper.find('li').length).toBe(teams.length);
  });

  it('renders all team codes', () => {
    const dash = shallow(<TeamList teams={teams} />);
    expect(dash.contains("MRVAC")).toEqual(true);
    expect(dash.contains("MRWSSC")).toEqual(true);
  });
});