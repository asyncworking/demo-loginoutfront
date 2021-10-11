import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
} from '@material-ui/core';
import * as apiUtils from 'src/utils/apiUtils';
import CompanySectionItem from './components/CompanySectionItem/CompanySectionItem';
import './CompanySection.scss';

const CompanySection = () => {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    description: '',
    colleague: [],
    companyId: '',
  });

  const getCompanyInfo = async () => {
    const email = localStorage.getItem('email');
    const companyInfoResponse = await apiUtils.getCompanyInfoColleagues(email);
    if (companyInfoResponse.status === 200) {
      localStorage.setItem('companyId', companyInfoResponse.data.companyId);
      setCompanyInfo({
        companyName: companyInfoResponse.data.name,
        description: companyInfoResponse.data.description,
        colleague: companyInfoResponse.data.colleague,
        companyId: companyInfoResponse.data.companyId,
      });
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  return (
    <Container fixed maxWidth="md">
      <div className="companysection">
        <Box className="companysection__title">
          &nbsp;
          {companyInfo.companyName}
          &nbsp;
        </Box>
        <Divider className="companysection__divider" />
      </div>
      <Box>
        <CompanySectionItem
          companyId={companyInfo.companyId}
          companyName={companyInfo.companyName}
          description={companyInfo.description}
          colleague={companyInfo.colleague}
        />
      </Box>
    </Container>
  );
};

export default CompanySection;
