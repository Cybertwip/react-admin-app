import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import renderer from 'react-test-renderer';

import FooterBar from './../FooterBar';

describe('Main component rendering', () => {
    it('Full-render renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<FooterBar />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Shallow-render renders without crashing', () => {
      shallow(<FooterBar />);
    });

    it('Render to match snapshot', () => { // 1
      const tree = renderer.create(<FooterBar />).toJSON();
      
      expect(tree).toMatchSnapshot();
    });
});
