import React from 'react';
import { shallow } from 'enzyme';

import EventSwim from '../MeetReader/EventSwim';

describe('<EventSwim />', () => {
  it('renders without crashing', () => {
    shallow(<EventSwim />);
  });
});