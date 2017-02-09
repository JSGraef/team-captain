import React from 'react';
import { shallow } from 'enzyme';

import EventSwimRelay from '../MeetReader/EventSwimRelay';

const teams = require('../sample-teams');
const relays = teams[0].relays;

describe('<EventSwimRelay />', () => {
  it('renders without crashing', () => {
    shallow(<EventSwimRelay />);
  });

  it('renders no event', () => {
    const wrapper = shallow(<EventSwimRelay />);
    const text = "Couldn't find relay";
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders relay info', () => {
    const wrapper = shallow(<EventSwimRelay relay={relays[0]} />);
    expect(wrapper.contains("MRVAC")).toEqual(true);
    expect(wrapper.contains("2:14.37")).toEqual(true);
    expect(wrapper.contains("2:12.14")).toEqual(true);
    expect(wrapper.contains("6.")).toEqual(true);
  });
});



