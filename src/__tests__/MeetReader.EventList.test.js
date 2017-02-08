import React from 'react';
import { shallow } from 'enzyme';

import {Link} from 'react-router'
import EventList from '../MeetReader/EventList';
const events = require('../sample-events');

describe('<EventList />', () => {
  it('renders without crashing', () => {
    shallow(<EventList />);
  });

  it('renders with events passed in', () => {
    shallow(<EventList events={events} />);
  });

  it('renders all events in list', () => {
    const wrapper = shallow(<EventList events={events} />);
    expect(wrapper.find('li').length).toBe(events.length-1);
  });

  it('renders properly translated event titles', () => {
    const dash = shallow(<EventList events={events} />);
    expect(dash.contains("#1 MIXED UNDER 12 200 Medley Relay")).toEqual(true);
    expect(dash.contains("#2 MIXED 13+ 200 Medley Relay")).toEqual(true);
    expect(dash.contains("#3 GIRLS UNDER 10 100 IM")).toEqual(true);
    expect(dash.contains("#4 BOYS UNDER 10 100 IM")).toEqual(true);
    expect(dash.contains("#5 GIRLS UNDER 12 100 IM")).toEqual(true);
    expect(dash.contains("#6 BOYS UNDER 12 100 IM")).toEqual(true);
  });

});