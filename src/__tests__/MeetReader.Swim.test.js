import React from 'react';
import { shallow } from 'enzyme';

import Swim from '../MeetReader/Swim';

describe('<Swim />', () => {
  it('renders without crashing', () => {
    shallow(<Swim />);
  });
});