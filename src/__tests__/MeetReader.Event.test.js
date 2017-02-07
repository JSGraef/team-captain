import React from 'react';
import { shallow } from 'enzyme';

import Event from '../MeetReader/Event';

describe('<Event />', () => {
  it('renders without crashing', () => {
    shallow(<Event />);
  });
});