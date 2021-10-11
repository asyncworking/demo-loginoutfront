import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Login from '../../components/Login/Login';
import SignupContainer from '../../components/Signup/SignupContainer';
import EmailActivationPage from '../../components/Signup/components/EmailActivationPage/EmailActivationPage';
import VerifiedPage from '../../components/Signup/components/VerifiedPage/VerifiedPage';
import NotFoundPage from '../../pages/components/NotFoundPage/NotFoundPage';

Enzyme.configure({ adapter: new Adapter() });
describe('routes using memory router', () => {
  it('should show Home (Login) component for / router (using memory router)', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find(Login)).toHaveLength(1);
  });

  it('should show SignupContainer component for /signup router (using memory router)', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find(SignupContainer)).toHaveLength(0);
  });

  it('should show EmailActivationPage component for /activation router (using memory router)', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/activation']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find(EmailActivationPage)).toHaveLength(0);
  });

  it('should show VerifiedPage component for /verify router (using memory router)', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/verify']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find(VerifiedPage)).toHaveLength(0);
  });

  it('should show NotFoundPage component for route not defined', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find(NotFoundPage)).toHaveLength(0);
  });
});
