import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'react-router-dom';

const steps = [
  { label: 'Form 1', component: <Form1 /> },
  { label: 'Form 2', component: <Form2 /> },
  { label: 'Form 3', component: <Form3 /> },
];

export default function AppointmentStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
          </Box>
          {steps[activeStep].component}
        </React.Fragment>
      )}
    </Box>
  );
}

// Function to get and set query params
const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key) => searchParams.get(key) || '';

  const setParam = (key, value) => {
    const params = new URLSearchParams(searchParams); // create a object of
    params.set(key, value);
    setSearchParams(params);
  };

  return { getParam, setParam };
};

// Form Components Using Query Params
function Form1() {
  const { getParam, setParam } = useQueryParams();

  return (
    <form>
      <label>
        Enter your name:
        <input
          type="text"
          name="username"
          value={getParam('username')}
          onChange={(e) => setParam('username', e.target.value)}
        />
      </label>
      <label>
        Enter your age:
        <input
          type="number"
          name="age"
          value={getParam('age')}
          onChange={(e) => setParam('age', e.target.value)}
        />
      </label>
    </form>
  );
}

function Form2() {
  const { getParam, setParam } = useQueryParams();

  return (
    <form>
      <label>
        Enter your email:
        <input
          type="text"
          name="email"
          value={getParam('email')}
          onChange={(e) => setParam('email', e.target.value)}
        />
      </label>
      <label>
        Enter your password:
        <input
          type="password"
          name="password"
          value={getParam('password')}
          onChange={(e) => setParam('password', e.target.value)}
        />
      </label>
    </form>
  );
}

function Form3() {
  const { getParam, setParam } = useQueryParams();

  return (
    <form>
      <label>
        Enter your size:
        <input
          type="text"
          name="size"
          value={getParam('size')}
          onChange={(e) => setParam('size', e.target.value)}
        />
      </label>
      <label>
        Enter your color:
        <input
          type="text"
          name="color"
          value={getParam('color')}
          onChange={(e) => setParam('color', e.target.value)}
        />
      </label>
    </form>
  );
}
