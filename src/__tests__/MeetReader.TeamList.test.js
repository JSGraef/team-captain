import React from 'react';
import { shallow } from 'enzyme';

import TeamList from '../MeetReader/TeamList';

describe('<TeamList />', () => {
  it('renders without crashing', () => {
    shallow(<TeamList />);
  });
});