import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';

describe('<Breadcrumb>', () => {
  let renderResult: RenderResult;

  const directories = [{
    url: '/dashboard/projectpanel/1',
    name: 'Project ABC',
  }];

  beforeEach(() => {
    renderResult = render(
      <Router>
        <Breadcrumb directories={directories} />
      </Router>,
    );
  });

  it('should render breadcrumb when default project url and name are given', () => {
    const { getByText } = renderResult;
    expect(getByText(directories[0].name)).toBeInTheDocument();
    expect(getByText(directories[0].name)).toHaveAttribute('href', directories[0].url);
  });
});
