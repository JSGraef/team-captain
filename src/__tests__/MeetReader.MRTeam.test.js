import React from 'react';
import { shallow } from 'enzyme';

import MRTeam from '../MeetReader/MRTeam';

describe('<MRTeam />', () => {
  it('renders without crashing', () => {
    shallow(<MRTeam />);
  });
});