import React from 'react';
import { shallow } from 'enzyme';

import MRSwimmer from '../MeetReader/MRSwimmer';

describe('<MRSwimmer />', () => {
  it('renders without crashing', () => {
    shallow(<MRSwimmer />);
  });
});