import CreateIcon from '@material-ui/icons/Create';
import { SideBarData } from 'src/components/SideBar/SideBar';

const ProjectSideBarData:SideBarData[] = [
  {
    key: 1,
    title: 'Edit name, description, type',
    path: '/company/edit',
    // eslint-disable-next-line react/react-in-jsx-scope
    icon: <CreateIcon className="sideBarIcon" />,
  },
];

export default ProjectSideBarData;
