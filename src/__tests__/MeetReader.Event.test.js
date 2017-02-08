import React from 'react';
import { shallow } from 'enzyme';

import Event from '../MeetReader/Event';
import EventSwim from '../MeetReader/EventSwim';
import EventSwimRelay from '../MeetReader/EventSwimRelay';

const events = require('../sample-events');

describe('<Event />', () => {
  it('renders without crashing', () => {
    shallow(<Event />);
  });

  it('renders no event', () => {
    const wrapper = shallow(<Event />);
    const text = "Couldn't find event";
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders relay event', () => {
    const wrapper = shallow(<Event event={events[1]}/>);
    expect(wrapper.find(EventSwimRelay).length).toBe(2);
  });

  it('renders swim event', () => {
    const wrapper = shallow(<Event event={events[3]}/>);
    expect(wrapper.find(EventSwim).length).toBe(4);
  });

});