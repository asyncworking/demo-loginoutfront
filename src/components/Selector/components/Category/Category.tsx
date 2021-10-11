import React from 'react';
import IMessageCategoryItem from 'src/common/interfaces/IMessageCategoryItem';
import useStyles from './Category.style';

interface PropsType {
  messageCategory: IMessageCategoryItem;
  select: string | null;
  getCategoryId: Function;
}

const Category = (props: PropsType) => {
  const classes = useStyles();
  const { messageCategory, getCategoryId, select } = props;
  const { messageCategoryId, categoryName, emoji } = messageCategory;

  return (
    <>
      <button
        type="button"
        key={messageCategoryId}
        data-testid={messageCategoryId}
        data-value={messageCategoryId}
        id={`${(select === (`${emoji} ${categoryName}`)) ? 'options__selected' : null}`}
        className={classes.options__action}
        onClick={getCategoryId(messageCategoryId)}
      >
        {emoji}
        {' '}
        {categoryName}
      </button>
    </>
  );
};

export default Category;
