import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// MUI components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

//mui Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Form } from 'react-router-dom';

//import Form necessary functions
import { detectChanges, validate } from './CustomFormFunctions';
import { customAlert } from './CustomAlert';
import { useFeedback } from 'context/feedbackContext';
import UseAPI from 'hooks/useAPI';

function RenderElement(element, value, handleInputChange, setErrors, errors) {
  const { inputAdornment, type, id, label, options, optionLabel, required, props, inputProps } = element;

  //dedicated for password and confirmPassword fields..
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    handleConfirmPasswordValidate();
  }, [password, confirmPassword]); //whenever password or confirmPassword changes, validate the password
  const handleConfirmPasswordValidate = () => {
    if (confirmPassword !== password) {
      //check wether the password and confirmPassword are same
      console.log('Password does not match');
      setErrors({ ...errors, confirmPassword: 'Password does not match' });
    } else {
      setErrors({ ...errors, confirmPassword: '' });
    }
  };
  //=========================================================

  const handleFileChange = (event) => {
    const files = event.target.files;
    options.onChange({ target: { value: options.multiple ? Array.from(files) : files[0] } });
  };

  switch (type) {
    case 'text':
      return (
        <TextField
          {...props}
          id={id}
          type={type}
          label={label}
          size="small"
          name={id}
          fullWidth
          slotProps={{
            input: {
              ...inputProps,
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    //width: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                  {inputAdornment}
                </InputAdornment>
              ),
            },
          }}
          required={required}
          defaultValue={value || ''}
          onBlur={(e) => handleInputChange(e, id)}
          //onFocus={setErrors({ ...errors, [id]: '' })}
          error={Boolean(errors[id]) || false}
          helperText={errors[id] || ''}
        />
      );
    case 'password':
      return (
        <Grid>
          <TextField
            sx={{ mb: 2 }}
            id={id}
            type={showPassword ? 'text' : 'password'}
            label={label}
            size="small"
            name={id}
            fullWidth
            slotProps={{
              input: {
                ...inputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()} // avoid default behavours which cause issues ,submission of form,focus on input field,unwanted side effects
                      onMouseUp={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            required={required}
            defaultValue={value || ''}
            onBlur={(e) => {
              handleInputChange(e, id);
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            //onFocus={setErrors({ ...errors, [id]: '' })}
            error={Boolean(errors[id]) || false}
            helperText={errors[id] || ''}
          />
          {props.confirmPassword && (
            <TextField
              //id={id}
              type={showConfirmPassword ? 'text' : 'password'}
              label={`Confirm ${label}`}
              size="small"
              name={id}
              fullWidth
              slotProps={{
                input: {
                  ...inputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showConfirmPassword ? 'hide the password' : 'display the password'}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        onMouseDown={(e) => e.preventDefault()} // avoid default behavours which cause issues ,submission of form,focus on input field,unwanted side effects
                        onMouseUp={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              required={required}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              error={Boolean(errors.confirmPassword) || false}
              helperText={errors.confirmPassword || ''}
            />
          )}
        </Grid>
      );

    case 'number':
      return (
        <TextField
          {...props}
          id={id}
          type="number"
          label={label}
          size="small"
          name={id}
          fullWidth
          required={required}
          defaultValue={value || ''}
          //onFocus={setErrors({ ...errors, [id]: '' })}
          onBlur={(e) => handleInputChange(e, id)}
          slotProps={{
            input: {
              ...inputProps,

              endAdornment: <InputAdornment position="end">{inputAdornment}</InputAdornment>,
            },
          }}
          error={Boolean(errors[id]) || false}
          helperText={errors[id] || ''}
        />
      );

    //TODO: Complete the date component min and max values Or add mui date picker lib
    case 'date':
      return (
        <TextField
          {...props}
          id={id}
          type="date"
          label={label}
          size="small"
          name={id}
          fullWidth
          required={required}
          defaultValue={value || ''}
          slotProps={{ inputLabel: { shrink: true }, inputProps: { min: '2003-12-31', max: '2025-10-1' } }}
          onBlur={(e) => handleInputChange(e, id)}
          error={Boolean(errors[id]) || false}
          helperText={errors[id] || ''}
        />
      );
    case 'radio':
      return (
        <Box display="flex" alignItems="center" maxHeight="auto">
          <FormControl error={Boolean(errors[id]) || false}>
            <FormLabel id={`${id}-group-label`} style={{ marginRight: '16px', marginLeft: '2px' }}>
              {label}
              {required == true ? '*' : null}
            </FormLabel>

            <RadioGroup
              row
              aria-labelledby={`${id}-group-label`}
              name={id}
              value={value || ''} // Controlled value
              onChange={(e) => handleInputChange(e, id)} // Update the value on change
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.name}
                  value={option.value}
                  control={<Radio />}
                  label={option.name}
                />
              ))}
            </RadioGroup>
            {errors[id] && <FormHelperText>{errors[id]}</FormHelperText>}
          </FormControl>
        </Box>
      );

    case 'checkbox':
      return (
        <Box display="flex" alignItems="start">
          <FormControl component="fieldset" error={Boolean(errors[id]) || false}>
            <FormLabel component="legend">
              {label}
              {required == true ? '*' : null}
            </FormLabel>
            <FormGroup row>
              {options.map((option) => (
                <FormControlLabel
                  key={option[optionLabel]}
                  control={
                    <Checkbox
                      checked={value?.includes(option[optionLabel])}
                      value={option[optionLabel]}
                      onChange={(e) => handleInputChange(e, id, true)}
                    />
                  }
                  label={option[optionLabel].split(' ').map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1) + ' ';
                  })}
                />
              ))}
            </FormGroup>

            {errors[id] && <FormHelperText>{errors[id]}</FormHelperText>}
          </FormControl>
        </Box>
      );

    case 'objectSelect':
      return (
        <Autocomplete
          id={id}
          {...props}
          size="small"
          required={required}
          options={options}
          value={value || (props?.multiple ? [] : null)} //if value is null set it to an empty array if and only if multiple is true
          onChange={(e, value) => handleInputChange({ target: { value } }, id)}
          getOptionLabel={(option) => option[optionLabel]}
          // getOptionLabel={(option) => (props?.multiple ? option[optionLabel] : option[0][optionLabel] || '')}
          filterOptions={(options) => {
            if (props?.multiple) {
              // Only filter when multiple is true
              return options.filter(
                (option) =>
                  !(Array.isArray(value) ? value.some((selected) => selected.name === option.name) : false), //filter out selected options to set them
              );
            }
            return options; // No filtering needed for single selection
          }}
          //filterSelectedOptions={props?.multiple}
          renderInput={(params) => (
            <TextField {...params} label={label} error={Boolean(errors[id])} helperText={errors[id] || ''} />
          )}
        />
      );
    case 'select':
      return (
        <Autocomplete
          id={id}
          {...props}
          size="small"
          required={required}
          onChange={(e, selectedValue) => {
            handleInputChange({ target: { value: selectedValue } }, id);
          }}
          getOptionLabel={(option) => option}
          options={options}
          value={value || (props?.multiple ? [] : '')}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label={label} error={Boolean(errors[id])} helperText={errors[id] || ''} />
          )}
        />
      );
    //TODO: complete the file upload component
    case 'file':
      return (
        <Box>
          <TextField
            id={id}
            label={label}
            value={
              value ? (Array.isArray(value) ? value.map((file) => file.name).join(', ') : value.name) : ''
            }
            fullWidth
            size="small"
            slotProps={{
              input: {
                readOnly: true, // Make it read-only since it's not a regular text input
                endAdornment: (
                  <Button variant="contained" component="label" size="small">
                    Browse
                    <input
                      type="file"
                      hidden
                      multiple={options.multiple}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                ),
              },
            }}
          />
          {value && (
            <Box mt={1}>
              {Array.isArray(value)
                ? value.map((file, index) => (
                    <Typography key={index} variant="body2">
                      {file.name}
                    </Typography>
                  ))
                : value.name && <Typography variant="body2">{value.name}</Typography>}
            </Box>
          )}
        </Box>
      );
    default:
      return null;
  }
}

export default function CustomForm(props) {
  const { elements, id, name, defaultValues, onSubmit, submitType = 'save', updateId } = props;
  const { createData, updateData } = UseAPI();
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

    const errors = validate(formData, elements);

    if (Object.values(errors).some((error) => error != '')) {
      return setErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    }

    if (defaultValues || submitType === 'update') {
      const newChanges = detectChanges(formData, defaultValues);
      console.log(newChanges); // Display the changes

      return new Promise((resolve, reject) => {
        customAlert(resolve, reject, {
          title: 'Are you sure?',
          message: 'Do you want to save the changes?',
          objects: newChanges,
        });
      })
        .then(() => {
          updateData(() => onSubmit(updateId, formData));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    new Promise((resolve, reject) => {
      customAlert(resolve, reject, {
        title: 'Are you sure?',
        message: 'Do you want to save the changes?',
        objects: formData,
      });
    })
      .then(() => {
        //   try {
        //     setLoader(true);
        //     onSubmit(formData)
        //       .then((res) => {
        //         setSuccess(res.data.message);
        //         setLoader(false);
        //       })
        //       .catch((err) => {
        //         setError(err.response.data.message);
        //         setLoader(false);
        //       });
        //   } catch (err) {
        //     setError(err.message);
        //     setLoader(false);
        //   }
        createData(() => onSubmit(formData));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box component={Form} method="post" id={id} sx={{ mx: 'auto', mb: 10 }}>
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
