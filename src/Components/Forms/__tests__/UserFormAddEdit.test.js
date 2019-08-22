import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import { IS_PRODUCTION } from "./../../../settings"

import UserFormAddEdit from './../UserFormAddEdit';

describe('Main component rendering', () => {
    it('Full-render renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<UserFormAddEdit />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Shallow-render renders without crashing', () => {
      shallow(<UserFormAddEdit />);
    });

    it('fetches data from server when server returns a successful response', async done => { // 1
      const mockSuccessResponse = {
        data: {
          addUser: {
            "id": 34,
            "first": "Johnny",
            "last": "Cash",
            "email": "JC@JC.com",
            "phone": "888",
            "location": "Folsom",
            "hobby": "Singing"
          }
        }
      };
      const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
      const mockFetchPromise = Promise.resolve({ // 3
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
      
      const wrapper = mount(<UserFormAddEdit />); // 5
      
      const submitForm = wrapper.find('Form.submit');
      await submitForm.simulate('submit');

      await Promise.resolve();

      expect(global.fetch).toHaveBeenCalledTimes(1);

      var query = `mutation {
        addUser(first: "${wrapper.state().first}", 
                last: "${wrapper.state().last}", 
                email: "${wrapper.state().email}", 
                phone: "${wrapper.state().phone}",
                location: "${wrapper.state().location}",
                hobby: "${wrapper.state().hobby}") {
          id,
          first,
          last,
          email,
          phone,
          location,
          hobby,
          added
        }
      }`;

      if(IS_PRODUCTION){

        expect(global.fetch).toHaveBeenCalledWith(
          'https://postgres-api-server.herokuapp.com/graphql',
          expect.objectContaining({ 
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: query}).replace(/\s/g,'')
            })
        );      
      }
      else{
        expect(global.fetch).toHaveBeenCalledWith(
          'http://localhost:5000/graphql',
          expect.objectContaining({ 
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: query}).replace(/\s/g,'')
            })
        );      
      }
  
      process.nextTick(() => { // 6
        expect(wrapper.state()).toEqual({
          id: 0,
          first: '',
          last: '',
          email: '',
          phone: '',
          location: '',
          hobby: ''
        });
  
        global.fetch.mockClear(); // 7
        done(); // 8
      });
    });
});
