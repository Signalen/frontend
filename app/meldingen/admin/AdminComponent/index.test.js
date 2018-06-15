import React from 'react';
import { shallow } from 'enzyme';

import AdminComponent from './';

describe.only('<AdminComponent />', () => {
  it('Expect to have unit tests specified', () => {
    const renderedComponent = shallow(<AdminComponent />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
