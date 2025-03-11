import { useSearchParams } from 'react-router-dom';

// Function to get and set query params
export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key) => searchParams.get(key) || '';

  const setParam = (key, value) => {
    const params = new URLSearchParams(searchParams); // create a object of
    params.set(key, value);
    setSearchParams(params);
  };

  return { getParam, setParam };
};
