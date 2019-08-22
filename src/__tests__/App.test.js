import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
//import { render } from 'enzyme';
import { mount } from 'enzyme';

import App from './../App';
import NavigationBar from './../Components/Header/NavigationBar'
import RouterSwitch from './../Components/Navigation/RouterSwitch'
import FooterBar from './../Components/Footer/FooterBar'


import Home from './../Modules/Home'
import Crud from './../Modules/Crud'
import Resources from './../Modules/Resources'
import NotFound from './../Modules/NotFound'


describe('Main component rendering', () => {
    it('Full-render renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Shallow-render renders without crashing', () => {
      shallow(<App />);
    });

    it('Full-render contains NavigationBar', () => {
      const wrapper = mount(<App />);
      expect(wrapper.find(NavigationBar).length).toBe(1);
    });

    it('Full-render contains RouterSwitch', () => {
      const wrapper = mount(<App />);
      expect(wrapper.find(RouterSwitch).length).toBe(1);
    });

    it('Full-render contains Footer', () => {
      const wrapper = mount(<App />);
      expect(wrapper.find(FooterBar).length).toBe(1);
    });

  });


  import PropTypes from 'prop-types';

  const reactRouter = require('react-router-dom');
  const { MemoryRouter } = reactRouter;
  const MockBrowserRouterRandom = ({ children }) => (
    <MemoryRouter initialEntries={['/random']}>
      { children }
    </MemoryRouter>
  );

  const MockBrowserRouterHome = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>
      { children }
    </MemoryRouter>
  );


  const MockBrowserRouterCrud = ({ children }) => (
    <MemoryRouter initialEntries={['/crud']}>
      { children }
    </MemoryRouter>
  );

  const MockBrowserRouterResources = ({ children }) => (
    <MemoryRouter initialEntries={['/resources']}>
      { children }
    </MemoryRouter>
  );

  MockBrowserRouterRandom.propTypes = { children: PropTypes.node.isRequired };
  MockBrowserRouterHome.propTypes = { children: PropTypes.node.isRequired };
  MockBrowserRouterCrud.propTypes = { children: PropTypes.node.isRequired };
  MockBrowserRouterResources.propTypes = { children: PropTypes.node.isRequired };
  
  describe('Main component routing', () => {
    
    it('Invalid path should redirect to 404', () => {
      reactRouter.BrowserRouter = MockBrowserRouterRandom;

      const wrapper = mount(<App/>);
      expect(wrapper.find(Home).length).toBe(0);
      expect(wrapper.find(NotFound).length).toBe(1);
    });

    it('/ path should redirect to Home', () => {
      reactRouter.BrowserRouter = MockBrowserRouterHome;

      const wrapper = mount(<App/>);
      expect(wrapper.find(Home).length).toBe(1);
      expect(wrapper.find(NotFound).length).toBe(0);
    });

    it('/crud path should redirect to Crud', () => {
      reactRouter.BrowserRouter = MockBrowserRouterCrud;

      const wrapper = mount(<App/>);
      expect(wrapper.find(Crud).length).toBe(1);
      expect(wrapper.find(NotFound).length).toBe(0);
    });

    it('/resources path should redirect to Resources', () => {
      reactRouter.BrowserRouter = MockBrowserRouterResources;

      const wrapper = mount(<App/>);
      expect(wrapper.find(Resources).length).toBe(1);
      expect(wrapper.find(NotFound).length).toBe(0);
    });

  });
