import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import IProjectMember from 'src/common/interfaces/IProjectMember';
import { render, screen, act, fireEvent } from '@testing-library/react';
import NotificationPopUp from '../components/NotificationPopUp';

describe('should display notification popup', () => {
  const togglePopUp = jest.fn();
  const setFinalSelectedList = jest.fn();
  const setSelectedList = jest.fn();

  const selectableMemberList = [{
    id: '2',
    name: 'user2',
    email: 'user2@gmail.com',
    title: null,
  },
  {
    id: '3',
    name: 'user3',
    email: 'user3@gmail.com',
    title: null,
  },
  {
    id: '4',
    name: 'user4',
    email: 'user4@gmail.com',
    title: 'dev',
  }] as IProjectMember[];

  const selectedList = [{
    id: '2',
    name: 'user2',
    email: 'user2@gmail.com',
    title: null,
  }] as IProjectMember[];

  it('should render notification popup member list', async () => {
    const popUpState = true;
    render(
      <MemoryRouter initialEntries={['/project/1/new-message']}>
        <NotificationPopUp
          togglePopUp=""
          selectableMemberList={selectableMemberList}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          popUpState={popUpState}
          setFinalSelectedList={setFinalSelectedList}
          finalSelectedList=""
        />
      </MemoryRouter>,
    );

    expect(await screen.findByText('user2')).toBeInTheDocument();
    expect(await screen.findByText('Save changes')).toBeInTheDocument();
    expect(await screen.findByText('Never mind')).toBeInTheDocument();
  });

  it('should render notification popup save button', async () => {
    const popUpState = true;
    render(
      <MemoryRouter initialEntries={['/project/1/new-message']}>
        <NotificationPopUp
          togglePopUp={togglePopUp}
          selectableMemberList={selectableMemberList}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          popUpState={popUpState}
          setFinalSelectedList={setFinalSelectedList}
          finalSelectedList=""
        />
      </MemoryRouter>,
    );
    const saveButton = screen.getByTestId('saveButton');
    act(() => {
      fireEvent.click(saveButton);
    });
    expect(setFinalSelectedList).toHaveBeenCalled();
    expect(togglePopUp).toHaveBeenCalled();
  });

  it('should render notification popup never mind button', async () => {
    const popUpState = true;
    render(
      <MemoryRouter initialEntries={['/project/1/new-message']}>
        <NotificationPopUp
          togglePopUp={togglePopUp}
          selectableMemberList={selectableMemberList}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          popUpState={popUpState}
          setFinalSelectedList={setFinalSelectedList}
          finalSelectedList=""
        />
      </MemoryRouter>,
    );
    const closeButton = screen.getByTestId('closeButton');
    act(() => {
      fireEvent.click(closeButton);
    });

    expect(setSelectedList).toHaveBeenCalled();
    expect(togglePopUp).toHaveBeenCalled();
  });

  it('should render notification popup select all button', async () => {
    const popUpState = true;
    render(
      <MemoryRouter initialEntries={['/project/1/new-message']}>
        <NotificationPopUp
          togglePopUp={togglePopUp}
          selectableMemberList={selectableMemberList}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          popUpState={popUpState}
          setFinalSelectedList={setFinalSelectedList}
          finalSelectedList=""
        />
      </MemoryRouter>,
    );
    const selectAllButton = screen.getByTestId('selectAllButton');
    act(() => {
      fireEvent.click(selectAllButton);
    });

    expect(setSelectedList).toHaveBeenCalled();
  });

  it('should render notification popup select none button', async () => {
    const popUpState = true;
    render(
      <MemoryRouter initialEntries={['/project/1/new-message']}>
        <NotificationPopUp
          togglePopUp={togglePopUp}
          selectableMemberList={selectableMemberList}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          popUpState={popUpState}
          setFinalSelectedList={setFinalSelectedList}
          finalSelectedList=""
        />
      </MemoryRouter>,
    );
    const selectNoneButton = screen.getByTestId('selectNoneButton');
    act(() => {
      fireEvent.click(selectNoneButton);
    });
    expect(setSelectedList).toHaveBeenCalled();
  });
});
