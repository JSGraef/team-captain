import React from 'react';
import { shallow } from 'enzyme';

import Event from '../MeetReader/Swim';

describe('<Swim />', () => {
  it('renders without crashing', () => {
    shallow(<Swim />);
  });
});