import React from 'react';
import { shallow } from 'enzyme';

import EventList from '../MeetReader/EventList';

describe('<EventList />', () => {
  it('renders without crashing', () => {
    shallow(<EventList />);
  });
});