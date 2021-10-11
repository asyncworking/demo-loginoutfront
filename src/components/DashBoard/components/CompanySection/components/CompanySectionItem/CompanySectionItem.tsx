import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import {
  Link,
} from 'react-router-dom';
import logoWithoutTexts from 'src/assets/svgs/logoWithoutTexts.svg';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import './CompanySectionItem.scss';

interface ICompanySectionProps {
  companyName: string;
  description: string;
  colleague: string[];
  companyId: string;
}

const CompanySectionItem = ({ companyName, description, colleague, companyId }: ICompanySectionProps) => {
  localStorage.setItem('companyId', companyId);
  return (
    <Grid>
      <div className="sectionItem">
        <div className="sectionItem__logo">
          <img src={logoWithoutTexts} className="img" alt="logo" />
        </div>
        <Link className="sectionLink" to={`/dashboard/companypanel/${companyId}`}>
          <div className="sectionItem__info">
            <div className="sectionItem__info__name">
              {companyName}
              &nbsp;HQ
            </div>
            <div className="sectionItem__info__description">
              {description}
            </div>
            <div className="sectionItem__info__container">
              {
                colleague.slice(0, 6).map((item: string) => (
                  <div key={item} className="sectionItem__info__colleague">
                    <UserProfileIcon key={item} name={item} size="30" textSizeRatio={2.5} />
                  </div>
                ))
              }
            </div>
          </div>
        </Link>
      </div>
    </Grid>
  );
};
export default CompanySectionItem;
