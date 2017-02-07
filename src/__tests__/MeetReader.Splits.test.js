import React from 'react';
import { shallow } from 'enzyme';

import Splits from '../MeetReader/Splits';

describe('<Splits />', () => {
  it('renders without crashing', () => {
    shallow(<Splits />);
  });
});