import React from 'react';
import { shallow } from 'enzyme';

import MRDashboard from '../MeetReader/MRDashboard';
import EventList from '../MeetReader/EventList';
const events = require('../sample-events');

describe('<MRDashboard />', () => {
  it('renders without crashing and nothing passed in', () => {
    shallow(<MRDashboard />);
  });

  it('renders with events passed in', () => {
    shallow(<MRDashboard events={events} />);
  });

  it('renders event list', () => {
    const wrapper = shallow(<MRDashboard events={events} />);
    expect(wrapper.find(EventList).length).toBe(1);
  });

  it('renders event list title', () => {
    const dash = shallow(<MRDashboard events={events} />);
    const title = "Event List";
    expect(dash.contains(title)).toEqual(true);
  });
});
