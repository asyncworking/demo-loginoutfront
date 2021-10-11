import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Box,
} from '@material-ui/core';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import './ProjectSectionItem.scss';

interface IProjectSectionProps {
  id: number;
  name: string;
  description: string | null;
  projectUserNames: string[];
}
const ProjectSectionItem = ({ id, name, description, projectUserNames }: IProjectSectionProps) => {
  const path = `/dashboard/projectpanel/${id}`;
  return (
    <Box p={1}>
      <Link id="projectLink" to={path}>
        <div className="sectionItem__info">
          <div className="sectionItem__info__name">
            {name}
          </div>
          <div className="sectionItem__info__description">
            {description}
          </div>
          <div className="sectionItem__info__container">
            {
              projectUserNames.slice(0, 6).map((item: string) => (
                <div key={item} className="sectionItem__info__projectUserName">
                  <UserProfileIcon key={item} name={item} size="30" textSizeRatio={2.5} />
                </div>
              ))
            }
          </div>
        </div>
      </Link>
    </Box>
  );
};

export default ProjectSectionItem;
