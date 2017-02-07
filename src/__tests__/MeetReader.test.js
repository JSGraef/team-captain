import React from 'react';
import { shallow } from 'enzyme';

import MeetReader from '../MeetReader/MeetReader';

describe('<MeetReader />', () => {
  it('renders without crashing', () => {
    shallow(<MeetReader />);
  });
});