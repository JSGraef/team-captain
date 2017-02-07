import React from 'react';
import { shallow } from 'enzyme';

import MRDashboard from '../MeetReader/MRDashboard';

describe('<MRDashboard />', () => {
  it('renders without crashing', () => {
    shallow(<MRDashboard />);
  });
});