import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../../../Login/Login';
import VerifiedMessageWindow from '../components/VerifiedMessageWindow/VerifiedMessageWindow';

Enzyme.configure({ adapter: new Adapter() });
describe('routes using memory router', () => {
  it('should show Home (Login) component for /login router (using memory router)', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/login']}>
        <VerifiedMessageWindow />
      </MemoryRouter>,
    );
    expect(component.find(Login)).toHaveLength(0);
  });
});