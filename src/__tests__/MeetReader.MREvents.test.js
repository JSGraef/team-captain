import React from 'react';
import { shallow } from 'enzyme';

import MREvents from '../MeetReader/MREvents';

describe('<MREvents />', () => {
  it('renders without crashing', () => {
    shallow(<MREvents />);
  });
});