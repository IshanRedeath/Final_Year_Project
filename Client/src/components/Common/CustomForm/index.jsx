import PropTypes from 'prop-types';
import { useState } from 'react';
// MUI components
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import { Form } from 'react-router-dom';
//import Form necessary functions
import { validate } from './CustomFormFunctions';
import { customAlert } from '../CustomAlert';

import RenderElement from './RenderElement';

CustomForm.propTypes = {
  elements: PropTypes.array.isRequired, //form elements like text, select, radio, checkbox

  name: PropTypes.string.isRequired, // name of form
  defaultValues: PropTypes.object, // default values if any (edit form..)
  onSubmit: PropTypes.func.isRequired,
  submitType: PropTypes.string, //submit type = [save, create, update]
};
export default function CustomForm(props) {
  const { elements, name, defaultValues, onSubmit, submitType = 'save' } = props;
  const formId = name?.split(' ').join('') || Math.random().toString(36).substring(7);
  const initialFormData = elements.reduce(
    //initialize the form data with default values
    (acc, element) => ({
      //map the elements array to an object with the element id as key and the defaultValue as value and accumilate them to retun at once
      ...acc, //function's accumilated results
      [element.id]: defaultValues?.[element.id] ?? '', //check whether the default value exists respective to elemnt id and if not set it to an empty string
    }),
    {},
  );
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event, fieldId, isCheckbox = false) => {
    const { value, checked } = event.target;
    setErrors((prev) => ({ ...prev, [fieldId]: '' })); //remove errors onFocus out
    setFormData((prev) => {
      if (isCheckbox) {
        return {
          ...prev,
          [fieldId]: checked
            ? [...(prev[fieldId] || []), value]
            : prev[fieldId].filter((item) => item !== value),
        };
      }

      return {
        ...prev,
        [fieldId]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById(formId);

    const errors = validate(formData, elements);

    if (Object.values(errors).some((error) => error != '')) {
      return setErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    }
    // const formDataObject = new FormData(form);
    // Object.entries(formData).forEach(([key, value]) => {
    //   formDataObject.append(key, value);
    // });

    new Promise((resolve, reject) => {
      customAlert(resolve, reject, {
        title: 'Are you sure?',
        message: 'Do you want to save the changes?',
        objects: formData,
      });
    })
      .then(() => {
        onSubmit ? onSubmit(formData) : form.requestSubmit();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box component={Form} method="post" sx={{ mx: 'auto', mb: 10 }} id={formId}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {name}
      </Typography>
      <Grid container spacing={2}>
        {elements.map((element) => (
          <Grid
            item
            size={{ xs: 12, md: element.type === 'radio' || element.type === 'checkbox' ? 12 : 6 }}
            key={element.id}
          >
            {RenderElement(element, formData[element.id], handleInputChange, setErrors, errors)}
          </Grid>
        ))}
        <Grid item container size={{ xs: 12 }}>
          <Grid item>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              {submitType}
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="reset"
              variant="outlined"
              onClick={() => {
                setFormData(initialFormData);
                setErrors('');
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
