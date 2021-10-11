import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import WarningMessage from '../WarningMessage';

describe('<WarningMessage>', () => {
  let renderResult: RenderResult;

  const content: string = 'correct warning';

  beforeEach(() => {
    renderResult = render(
      <Router>
        <WarningMessage content={content} />
      </Router>,
    );
  });

  it('should render WarningMessage when given warning message', () => {
    const { getByText } = renderResult;
    expect(getByText(content)).toBeInTheDocument();
  });
});
