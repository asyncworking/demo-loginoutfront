/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import IMessageCategoryItem from 'src/common/interfaces/IMessageCategoryItem';
import * as messageApiUtils from 'src/utils/Message/messageApiUtils';

const useMessageCategories = (projectId : string) => {
  const [messageCategories, setMessageCategories] = useState<IMessageCategoryItem[]>([] as IMessageCategoryItem[]);

  const fetchMessageCategoryList = async () => {
    const resp = await messageApiUtils.fetchMessageCategoryList(projectId);
    if (resp.status === 200) {
      setMessageCategories(resp.data);
    }
  };

  useEffect(() => {
    fetchMessageCategoryList();
  }, [projectId]);

  return messageCategories;
};

export default useMessageCategories;
