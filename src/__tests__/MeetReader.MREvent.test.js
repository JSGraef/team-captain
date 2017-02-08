import React from 'react';
import { shallow } from 'enzyme';

import MREvent from '../MeetReader/MREvent';
import Event from '../MeetReader/Event';

const events = require('../sample-events');

describe('<MREvent />', () => {
  it('renders without crashing', () => {
    shallow(<MREvent />);
  });

  it('renders no event', () => {
    const wrapper = shallow(<MREvent />);
    const text = "Couldn't find event";
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders invalid event gracefully', () => {
    const wrapper = shallow(<MREvent events={events} />);
    expect(wrapper.contains("Couldn't find that event")).toEqual(true);
  });

  it('renders swim event', () => {
    const wrapper = shallow(<MREvent events={events} routeParams={{eventid: 1}} />);
    expect(wrapper.find(Event).length).toBe(1);
  });
});