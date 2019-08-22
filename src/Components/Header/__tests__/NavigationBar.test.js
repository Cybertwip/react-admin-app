import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import renderer from 'react-test-renderer';

import NavigationBar from './../NavigationBar';

describe('Main component rendering', () => {
    it('Full-render renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<NavigationBar />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Shallow-render renders without crashing', () => {
      shallow(<NavigationBar />);
    });

    it('Render to match snapshot', () => { // 1
      const tree = renderer.create(<NavigationBar />).toJSON();
      
      expect(tree).toMatchSnapshot();
    });
});
