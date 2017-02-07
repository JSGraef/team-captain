import React from 'react';
import { shallow } from 'enzyme';

import EventSwimRelay from '../MeetReader/EventSwimRelay';

describe('<EventSwimRelay />', () => {
  it('renders without crashing', () => {
    shallow(<EventSwimRelay />);
  });
});