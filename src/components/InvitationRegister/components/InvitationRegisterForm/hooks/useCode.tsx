import { useLocation } from 'react-router-dom';

const useCode = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const code = query.get('code');

  return { code };
};

export default useCode;
