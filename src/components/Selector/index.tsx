import React from 'react';
import IMessageCategoryItem from 'src/common/interfaces/IMessageCategoryItem';
import Category from './components/Category/Category';
import useMessageCategories from './hooks/useMessageCategories';
import useSelect from './hooks/useSelect';
import useStyles from './Selector.style';

interface PropsType {
  projectId: string;
  setCategoryId: any;
}

const Selector = (props : PropsType) => {
  const classes = useStyles();
  const { projectId, setCategoryId } = props;
  const messageCategories = useMessageCategories(projectId);
  const { select, isOpened, isSelected, value, handleSelect, handleSelected } = useSelect(setCategoryId);
  const getCategoryId = (id: any) => (event : any) => handleSelected(event, id);

  const messageCategoryOptions = messageCategories.map((e: IMessageCategoryItem) => (
    <Category
      key={e.messageCategoryId}
      messageCategory={e}
      select={select}
      getCategoryId={getCategoryId}
    />
  ));

  return (
    <div className={classes.category__select}>
      <button
        type="button"
        className={`${isOpened ? `${classes.options__expansion}` : `${classes.btn__select}`}`}
        onClick={handleSelect}
      >
        {isSelected ? value : 'Pick a category (optional)'}
      </button>
      <>
        {isOpened
          && (
            <div className={classes.options__content}>
              <button
                type="button"
                id={`${(select === 'Pick a category (optional)') ? 'options__selected' : null}`}
                className={classes.options__action}
                onClick={getCategoryId(null)}
              >
                None
              </button>
              {messageCategoryOptions}
              <button
                type="button"
                className={classes.options__action}
              >
                Edit categories...
              </button>
            </div>
          )}
      </>
    </div>
  );
};

export default Selector;
