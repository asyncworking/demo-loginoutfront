import { useState } from 'react';

const useSelect = (setCategoryId: Function) => {
  const [isOpened, setIsOpened] = useState(false);
  const [select, setSelect] = useState<string | null>('None');
  const [isSelected, setIsSelected] = useState(false);
  const [value, setValue] = useState<string>('Pick a category (optional)');

  const handleSelect = () => {
    setIsOpened(!isOpened);
    setSelect(value);
  };

  const handleSelected = (event: any, id: string) => {
    if (event.target.innerText === 'None') {
      setValue('Pick a category (optional)');
      setCategoryId(id);
    } else {
      setValue(event.target.innerText);
      setCategoryId(id);
    }
    setIsSelected(true);
    setIsOpened(false);
  };

  return { select, isSelected, isOpened, setIsOpened, value, setValue, handleSelect, handleSelected };
};

export default useSelect;
