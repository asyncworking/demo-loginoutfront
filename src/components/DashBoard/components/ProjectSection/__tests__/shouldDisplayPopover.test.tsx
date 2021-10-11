/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act, render, fireEvent, screen } from '@testing-library/react';
import ProjectSection from '../ProjectSection';

describe('ProjectSection Component', () => {
  it('should display popover', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <ProjectSection />
      </MemoryRouter>,
    );
    const addNewProjectButton = screen.getByTestId('test-newBtn');

    act(() => {
      fireEvent.click(addNewProjectButton);
    });
    expect(await screen.findByTestId('test-save')).toBeInTheDocument();
  });
});
