import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Selector from 'src/components/Selector';

describe('Should display selector', () => {
  const projectId = '1';

  it('should render selector button', async () => {
    render(
      <Router>
        <Selector
          projectId={projectId}
          setCategoryId=""
        />
      </Router>,
    );
    expect(await screen.findByText('Pick a category (optional)')).toBeInTheDocument();
  });
});
