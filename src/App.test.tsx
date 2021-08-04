import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe("App", () => {
  it("renders learn react link", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  })
});
