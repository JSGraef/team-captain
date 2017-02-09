import React from 'react';
import { shallow } from 'enzyme';

import Splits from '../MeetReader/Splits';

const teams = require('../sample-teams');
const swimmer = teams[0].swimmers["121699JOSMDA"];
const swim = swimmer.swims[0];

describe('<Splits />', () => {
  it('renders without crashing', () => {
    shallow(<Splits />);
  });

  it('renders emtpy split', () => {
    const wrapper = shallow(<Splits />);
    expect(wrapper.contains("Couldn't find splits")).toEqual(true);
  });

  it('renders up to 10 splits', () => {
    const wrapper = shallow(<Splits splits={swim.splits[0]} />);
    expect(wrapper.find('span').length).toBe(10);
  });

  it('renders proper split times', () => {
    const wrapper = shallow(<Splits splits={swim.splits[0]} />);
    expect(wrapper.contains('28.02')).toEqual(true);
    expect(wrapper.contains("59.96")).toEqual(true);
    expect(wrapper.contains("1:31.92")).toEqual(true);
    expect(wrapper.contains("2:02.34")).toEqual(true);
  });

});