import React from 'react';
import { shallow } from 'enzyme';

import Swim from '../MeetReader/Swim';
import Splits from '../MeetReader/Splits';

const teams = require('../sample-teams');
const swimmer = teams[0].swimmers["121699JOSMDA"];
const swim = swimmer.swims[0];

describe('<Swim />', () => {
  it('renders without crashing', () => {
    shallow(<Swim />);
  });

  it('renders no swim', () => {
    const wrapper = shallow(<Swim />);
    const text = "Couldn't find swim";
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders splits', () => {
    const wrapper = shallow(<Swim swim={swim} />);
    expect(wrapper.find(Splits).length).toBe(1);
  });

  it('renders proper info', () => {
    const wrapper = shallow(<Swim swim={swim} />);
    expect(wrapper.contains("2:03.45")).toEqual(true);
    expect(wrapper.contains("2:02.34")).toEqual(true);
    expect(wrapper.contains("3.")).toEqual(true);
  });
});
