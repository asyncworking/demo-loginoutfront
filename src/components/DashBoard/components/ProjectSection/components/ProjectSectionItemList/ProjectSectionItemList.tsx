/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box,
} from '@material-ui/core';
import IProjectInfo from 'src/common/interfaces/IProjectInfo';
import SectionItem from './ProjectSectionItem/components/ProjectSectionItem';

interface ISectionItemListProps {
  sectionItemList: Array<IProjectInfo>
}
const ProjectSectionItemList = (props: ISectionItemListProps) => {
  const { sectionItemList } = props;
  const limit: number = 90;
  const limitSectionItemList = sectionItemList.slice(0, limit);
  limitSectionItemList.sort((a, b) => a.name.localeCompare(b.name, 'zh'));

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
      p={1}
    >
      {
        limitSectionItemList.map((sectionItem: IProjectInfo, id: number) => (
          <SectionItem key={id} {...sectionItem} />
        ))
      }
    </Box>
  );
};

export default ProjectSectionItemList;
