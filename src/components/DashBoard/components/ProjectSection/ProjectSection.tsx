import React, { useState, useEffect } from 'react';
import {
  Grid,
  Popover,
  TextField,
  Box,
  Container,
  Divider,
  Button,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IProjectInfo from 'src/common/interfaces/IProjectInfo';
import IProjectName from 'src/common/interfaces/IProjectName';
import * as apiUtils from 'src/utils/apiUtils';
import ProjectSectionItemList from './components/ProjectSectionItemList/ProjectSectionItemList';
import './ProjectSection.scss';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    margin: theme.spacing(0),
    borderRadius: '2em',
  },
}));

const ProjectSection: React.FC = () => {
  const projectSectionStyles = useStyles();
  const [shake, setShake] = useState(false);
  const [projectListData, setProjectListData] = useState<Array<IProjectInfo>>([]);
  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('email');
      const companyInfoResponse = await apiUtils.getCompanyInfoColleagues(email);
      const projectGetResponse = await apiUtils.getProjectList(companyInfoResponse.data.companyId);
      if (projectGetResponse.status === 200) {
        setProjectListData(projectGetResponse.data);
      }
    };
    fetchData();
  }, []);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setShake(false);
  };
  const initialValues: IProjectName = {
    name: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().max(128, 'Name cannot exceed 128 characters'),
  });
  const projectOnSubmit = async ({ name }: IProjectName) => {
    const trimedName = name.trim();
    if (trimedName === '') {
      setShake(true);
      setTimeout(() => { setShake(false); }, 500);
    } else {
      const ownerId = Number(localStorage.getItem('userId') || 'no ownerId here');
      const companyId = Number(localStorage.getItem('companyId') || 'no companyId here');
      const postProjectResponse = await apiUtils.createProject({ name: trimedName, ownerId, companyId });
      if (postProjectResponse.status === 200) {
        const projectUserName = localStorage.getItem('name') || 'no projectUserName here';
        const projectUserNames: string[] = new Array(projectUserName);
        const projectid: number = postProjectResponse.data;
        setProjectListData([...projectListData, { id: projectid, name: trimedName, description: null, projectUserNames }]);
        handleClose();
      }
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Container fixed maxWidth="md">
        <div className="projectsection__addBtn">
          <Button
            aria-describedby={id}
            variant="contained"
            color="secondary"
            className={projectSectionStyles.button}
            onClick={handleClick}
            data-testid="test-newBtn"
          >
            + new
          </Button>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box margin={3}>
            <Formik
              initialValues={initialValues}
              onSubmit={projectOnSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className={`${shake ? 'shake_open' : null}`}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="name"
                      id="project"
                      label="Name the project"
                      variant="outlined"
                      helperText={<ErrorMessage name="name" />}
                    />
                  </div>
                  <Box paddingTop={2}>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={4}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          name="save"
                          data-testid="test-save"
                          className={projectSectionStyles.button}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Saving' : 'Save'}
                        </Button>
                      </Grid>
                      <Grid>
                        <Button
                          className={projectSectionStyles.button}
                          disabled={isSubmitting}
                          name="cancel"
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Popover>
        <div className="projectsection__title">
          <div className="projectsection__title__name">
            &nbsp;Projects&nbsp;
          </div>
          <Divider className="projectsection__divider" />
        </div>
        <ProjectSectionItemList sectionItemList={projectListData} />
      </Container>
    </Grid>
  );
};

export default ProjectSection;
