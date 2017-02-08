import React from 'react';
import { shallow } from 'enzyme';

import EventSwim from '../MeetReader/EventSwim';
import Splits from '../MeetReader/Splits';

const teams = require('../sample-teams');
const swimmer = teams[0].swimmers['121699JOSMDA'].swims[0];

describe('<EventSwim />', () => {
  it('renders without crashing', () => {
    shallow(<EventSwim />);
  });

  it('renders no event', () => {
    const wrapper = shallow(<EventSwim />);
    const text = "Couldn't find swimmer";
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders splits event', () => {
    const wrapper = shallow(<EventSwim swimmer={swimmer} />);
    expect(wrapper.find(Splits).length).toBe(1);
  });
});



