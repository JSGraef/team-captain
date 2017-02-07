import React from 'react';
import { shallow } from 'enzyme';

import Team from '../MeetReader/Team';

describe('<Team />', () => {
  it('renders without crashing', () => {
    shallow(<Team />);
  });
});