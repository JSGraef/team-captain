import React from 'react';
import { shallow } from 'enzyme';

import MREvents from '../MeetReader/MREvents';
import Event from '../MeetReader/Event';

const events = require('../sample-events');

describe('<MREvents />', () => {
  it('renders without crashing', () => {
    shallow(<MREvents />);
  });

  it('renders no event', () => {
    const wrapper = shallow(<MREvents />);
    const text = "Couldn't find event";
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders swim event', () => {
    const wrapper = shallow(<MREvents events={events} />);
    expect(wrapper.find(Event).length).toBe(6);
  });
});