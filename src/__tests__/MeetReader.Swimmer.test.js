import React from 'react';
import { shallow } from 'enzyme';

import Swimmer from '../MeetReader/Swimmer';
import Swim from '../MeetReader/Swim';

const teams = require('../sample-teams');
const swimmer = teams[0].swimmers["121699JOSMDA"];

describe('<Swimmer />', () => {
  it('renders without crashing', () => {
    shallow(<Swimmer />);
  });

  it('renders no swimmer', () => {
    const wrapper = shallow(<Swimmer />);
    expect(wrapper.contains("Couldn't find swimmer")).toEqual(true);
  });

  it('renders swimmer information', () => {
    const wrapper = shallow(<Swimmer swimmer={swimmer} />);
    expect(wrapper.contains("Davila, Joshua")).toEqual(true);
    expect(wrapper.contains("Age 16")).toEqual(true);
  });

  it('renders swims of swimmer', () => {
    const wrapper = shallow(<Swimmer swimmer={swimmer} />);
    expect(wrapper.find(Swim).length).toBe(swimmer.swims.length);
  });

});