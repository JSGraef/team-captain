import React from 'react';
import { shallow } from 'enzyme';
import Swim from '../Swim';

const workout = require('../sample-workout');
const set = workout.sets['set-mainset'];

describe('<Swim />', () => {
  it('renders without crashing', () => {
    shallow(<Swim swim={set.swims['swim-0']} />);
  });

  it('renders swim distance', () => {
    const wrapper = shallow(<Swim swim={set.swims['swim-0']} />);
    expect(wrapper.contains(<p className="numbertext">{set.swims['swim-0'].distance}</p>)).toEqual(true);
  });

  it('renders swim title', () => {
    const wrapper = shallow(<Swim swim={set.swims['swim-0']} />);
    expect(wrapper.contains(<p className="settitle">{set.swims['swim-0'].title}</p>)).toEqual(true);
  });

  it('renders swim description', () => {
    const wrapper = shallow(<Swim swim={set.swims['swim-0']} />);
    expect(wrapper.contains(<p className="setdesc">{set.swims['swim-0'].desc}</p>)).toEqual(true);
  });

  it('renders swim interval', () => {
    const wrapper = shallow(<Swim swim={set.swims['swim-0']} />);
    expect(wrapper.contains(<div className="mdl-cell mdl-cell--2-col mdl-cell--order-2-phone rest">{set.swims['swim-0'].interval}</div>)).toEqual(true);
  });

});
