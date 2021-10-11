/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import * as apiUtils from 'src/utils/apiUtils';
import ITodoContent from 'src/common/interfaces/Dto/Todo/TodoList/ITodoContent';
import MyRichEditor from 'src/components/RichEditor/MyRichEditor';
import useEditBtnStyles from 'src/pages/components/TodosPanelPage/components/TodoItemPage/components/TodoItemSection/useEditBtnStyles';
import styles from './TodoItemForm.module.scss';

interface PropsType {
  cancelForm: any;
  projectId: string;
  todolistId: string;
  update: any;
  setUpdate: any;
}

const TodoItemForm = (props: PropsType) => {
  const btnStyles = useEditBtnStyles('128px', '89px');
  const { cancelForm, projectId, todolistId, update, setUpdate } = props;
  const [shake, setShake] = useState(false);
  const [hideRichEditor, setHideRichEditor] = useState(true);
  const createdUserId = localStorage.getItem('userId');
  const [hideDateRatio, setHideDateRatio] = useState(true);
  const [hideDatePicker, setHideDatePicker] = useState(true);
  const [mdBody, setMdBody] = useState<ITodoContent>({
    text: '',
    delta: '',
    html: '',
  });

  interface TodoFormValues {
    description: string;
    date: string;
  }

  const initialValues: TodoFormValues = {
    description: '',
    date: '',
  };
  const displayRE = () => {
    setHideRichEditor(false);
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().trim().max(512, 'Description can not be more than 512 characters'),
    date: Yup.string().matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Please enter a date in format yyyy-mm-dd'),
  });

  const { text, html } = mdBody;

  const addTodoItem = async ({ description, date }: TodoFormValues, { setSubmitting, resetForm }: FormikHelpers<TodoFormValues>) => {
    setSubmitting(true);
    const descriptionValid = description.replace(/^\s*/, '');
    if (descriptionValid.length === 0) {
      setShake(true);
      setTimeout(() => (
        setShake(false)
      ), 500);
    } else {
      const createTodoItemRes = await apiUtils.createTodoItem({ projectId, todolistId, createdUserId, text, desc: description.trim(), html, dueDate: new Date(date) });
      if (createTodoItemRes.status === 200) {
        setUpdate(update + 1);
        setHideRichEditor(true);
        setMdBody({
          text: '',
          delta: '',
          html: '',
        });
        resetForm();
      }
    }
  };

  const handleCancel = (
    cancelForm
  );

  const [dueDate, setDueDate] = useState('No due date');
  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={addTodoItem}
      >
        {({ values, isSubmitting, resetForm }) => (
          <Form>
            <div className={styles.add_todoItem}>
              <span className={styles.form_invalid}>
                <ErrorMessage name="description" />
              </span>
              <div className={styles.add_description}>
                <label htmlFor="checkbox" className={styles.checkbox_label}>
                  <span className={styles.checkbox_button} />
                </label>
                <div className={styles.description}>
                  <Field
                    as={TextareaAutosize}
                    aria-label="empty textarea"
                    type="description"
                    name="description"
                    placeholder="Describe this to-do..."
                    id={styles.description}
                    disabled={isSubmitting}
                    className={`${shake ? styles.shake_open : null}`}
                  />
                </div>
              </div>
              <div className={styles.add_notes}>
                <label htmlFor="date" className={styles.notes_title}>Due on</label>
                {hideDateRatio ? (
                  <input
                    type="text"
                    placeholder="Select a date..."
                    className={styles.add_details}
                    onClick={() => setHideDateRatio(false)}
                  />
                ) : (
                  <>
                    <RadioGroup aria-label="date" name="due date" value={dueDate} onChange={handleDueDateChange}>
                      <FormControlLabel
                        value="No due date"
                        control={<Radio />}
                        label="No due date"
                        onClick={() => {
                          resetForm({ values: { ...values, date: '' } }); setHideDatePicker(true);
                        }}
                      />
                      <FormControlLabel
                        value="A specific Day"
                        control={<Radio />}
                        label={!hideDatePicker ? (
                          <Field
                            as={TextField}
                            id="date"
                            type="date"
                            name="date"
                            disabled={isSubmitting}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            helperText={<ErrorMessage name="date" />}
                          />
                        ) : 'A specific Day'}
                        onClick={() => { setHideDatePicker(false); }}
                      />
                    </RadioGroup>
                  </>
                )}
              </div>
              <div className={styles.add_notes}>
                <label htmlFor="notes" className={styles.notes_title}>Notes</label>
                {hideRichEditor ? (
                  <input
                    type="text"
                    placeholder="Add extra details or attach a file..."
                    className={styles.add_details}
                    onClick={displayRE}
                  />
                ) : (
                  <div className={styles.richEditor}>
                    <MyRichEditor mdBody={mdBody} setMdBody={setMdBody} />
                  </div>
                )}
              </div>
              <div className={styles.add_btnArea}>
                <div className={styles.add_btn}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={btnStyles.add}
                  >
                    {isSubmitting ? 'Saving...' : 'Add this to-do'}
                  </Button>
                </div>
                <div className={styles.cancel_btn}>
                  <Button
                    variant="outlined"
                    className={btnStyles.cancel}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}

      </Formik>
    </>
  );
};

export default TodoItemForm;
