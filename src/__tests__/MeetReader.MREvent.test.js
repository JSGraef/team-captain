import React from 'react';
import { shallow } from 'enzyme';

import MREvent from '../MeetReader/MREvent';

describe('<MREvent />', () => {
  it('renders without crashing', () => {
    shallow(<MREvent />);
  });
});