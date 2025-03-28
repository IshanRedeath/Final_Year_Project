import Alert from '@mui/material/Alert';
import Loading from 'components/Loading';
import AlertBar from 'components/third-party/AlertBar';
import react, { useEffect, useState, useContext, createContext } from 'react';

const ApiFeedbackContext = createContext();
const initialState = {
  error: '',
  success: '',
  warning: '',
  loading: false,
};
export const ApiFeedbackProvider = ({ children }) => {
  const [alert, setAlert] = useState(initialState);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  //  set Error and success so that less rerenders plus keep previosstate when update errors
  const setError = (errorMsg) => {
    setAlert((prevState) => ({
      ...prevState,
      error: errorMsg,
      success: '',
    }));
    setNotifications((prevState) => [
      ...prevState,
      {
        message: errorMsg,
        severity: 'error',
        read: false,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // Change to false for 24-hour format
        }),
      },
    ]);
    setOpen(true);
  };
  const setSuccess = (successMessage) => {
    setAlert((prevState) => ({
      ...prevState,
      success: successMessage,
      error: '',
    }));
    setNotifications((prevState) => [
      ...prevState,
      {
        message: successMessage,
        severity: 'success',
        read: false,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // Change to false for 24-hour format
        }),
      },
    ]);
    setOpen(true);
  };

  const setLoader = (isLoading) => {
    setAlert((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <ApiFeedbackContext.Provider
        value={{ setError, setSuccess, setLoader, alert, notifications, setNotifications }}
      >
        {children} <Loading loadingState={alert.loading} />{' '}
        {alert.error && (
          <div>
            <AlertBar open={open} onClose={handleClose} message={alert.error} severity="error" />
          </div>
        )}
        {alert.success && (
          <div>
            <AlertBar open={open} onClose={handleClose} message={alert.success} severity="success" />
          </div>
        )}
      </ApiFeedbackContext.Provider>
    </>
  );
};

export const useFeedback = () => {
  const context = useContext(ApiFeedbackContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
