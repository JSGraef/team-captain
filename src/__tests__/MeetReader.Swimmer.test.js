import React from 'react';
import { shallow } from 'enzyme';

import Swimmer from '../MeetReader/Swimmer';

describe('<Swimmer />', () => {
  it('renders without crashing', () => {
    shallow(<Swimmer />);
  });
});