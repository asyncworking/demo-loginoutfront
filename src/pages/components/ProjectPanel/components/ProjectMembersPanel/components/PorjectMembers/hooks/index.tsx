import { useState } from 'react';

const useShowAndClose = () => {
  const [active, setActive] = useState(false);

  const onShow = () => {
    setActive(true);
  };

  const onClose = () => {
    setActive(false);
  };

  return { active, onShow, onClose };
};

export default useShowAndClose;
