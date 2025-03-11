import { useEffect } from 'react';
import { useFeedback } from 'context/feedbackContext';

export default function UseAPI() {
  const { setError, setSuccess, setLoader } = useFeedback();

  const fetchData = async (array = []) => {
    try {
      setLoader(true);
      await Promise.all(
        array.map(async (object) => {
          const res = await object.function(); // Call API function
          if (object.setFunction) {
            object.setFunction(res.data.data); // Update state
          }
          setSuccess(res.data.message); // Show success message
        }),
      );
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'An error occurred connecting to the server');
      console.error('Error fetching API data: ', error);
    } finally {
      setLoader(false);
    }
  };

  const deleteData = async (deleteFunc) => {
    try {
      setLoader(true);
      const res = await deleteFunc();
      if (res.status === 204) setSuccess('Item deleted successfully!');
      console.log('Item deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoader(false);
    }
  };

  const createData = async (createFunc) => {
    try {
      setLoader(true);
      const res = await createFunc();
      if (res.status === 201 || res.data.status === 'success') {
        setSuccess(res.data.message);
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'An error occured');
    } finally {
      setLoader(false);
    }
  };

  const updateData = async (updateFunc) => {
    try {
      setLoader(true);
      const res = await updateFunc();
      if (res.status === 200 || res.data.status === 'success') {
        setSuccess(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'An error occured');
    } finally {
      setLoader(false);
    }
  };

  return { fetchData, deleteData, createData, updateData };
}
