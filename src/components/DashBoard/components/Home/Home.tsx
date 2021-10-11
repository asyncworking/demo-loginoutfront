import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import CompanySection from '../CompanySection/CompanySection';
import './Home.scss';
import ProjectSection from '../ProjectSection/ProjectSection';

const Home: React.FC = () => (
  <Grid>
    <div className="dashboard__home">
      <CompanySection />
    </div>
    <div>
      <ProjectSection />
    </div>
  </Grid>
);

export default Home;
