import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

import { Form } from 'react-router-dom';

function renderElement(element, value, handleInputChange) {
  const { field, type, id, label, options, optionLabel, required, props } = element;

  switch (field) {
    case 'textInput':
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
            inputLabel: type === 'date' ? { shrink: 'true' } : {},
          }}
          required={required}
          defaultValue={value || ''}
          onBlur={(e) => handleInputChange(e, id)}
        />
      );

    case 'radio':
      return (
        <Box display="flex" alignItems="center">
          <FormLabel id={`${id}-group-label`} style={{ marginRight: '16px' }}>
            {label}
          </FormLabel>
          <FormControl>
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
          </FormControl>
        </Box>
      );

    case 'checkbox':
      return (
        <Box display="flex" alignItems="start">
          <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup row>
              {options.map((option) => (
                <FormControlLabel
                  key={option.name}
                  control={
                    <Checkbox
                      checked={value?.includes(option.value)}
                      value={option.value}
                      onChange={(e) => handleInputChange(e, id, true)}
                    />
                  }
                  label={option.name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      );

    case 'objectSelect':
      return (
        <Autocomplete
          id={id}
          {...props}
          size="small"
          options={options}
          value={value || (props?.multiple ? [] : null)}
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
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      );
    case 'select':
      return (
        <Autocomplete
          id={id}
          {...props}
          size="small"
          onChange={(e, selectedValue) => {
            handleInputChange({ target: { value: selectedValue } }, id);
          }}
          getOptionLabel={(option) => option}
          options={options}
          value={value || (props?.multiple ? [] : '')}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      );
    default:
      return null;
  }
}

export default function CustomForm(props) {
  const { elements, id, name, defaultValues } = props;
  const initialFormData = elements.reduce(
    (acc, element) => ({
      ...acc,
      [element.id]: defaultValues?.[element.id] ?? '',
    }),
    {},
  );

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event, fieldId, isCheckbox = false) => {
    const { value, checked } = event.target;

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
    console.log(formData);
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
            size={{ xs: 12, md: element.field === 'radio' || element.field === 'checkbox' ? 12 : 6 }}
            key={element.id}
          >
            {renderElement(element, formData[element.id], handleInputChange)}
          </Grid>
        ))}
        <Grid item container size={{ xs: 12 }}>
          <Grid item>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button type="reset" variant="outlined" onClick={() => setFormData(initialFormData)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// // MUI components
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';

// import Autocomplete from '@mui/material/Autocomplete';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid2';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import FormGroup from '@mui/material/FormGroup';

// import { Form } from 'react-router-dom';

// function renderElement(element, value, setFormData) {
//   const handleCheckboxChange = (event, fieldId) => {
//     const { value, checked } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [fieldId]: checked ? [...(prev[fieldId] || []), value] : prev[fieldId].filter((item) => item !== value),
//     }));
//   };

//   const { field, type, id, label, options, required, props } = element;
//   switch (field) {
//     case 'textInput':
//       return (
//         <TextField
//           {...props}
//           id={id}
//           type={type}
//           label={label}
//           size="small"
//           name={id}
//           fullWidth
//           required={required}
//           defaultValue={value}
//           slotProps={{
//             inputLabel: type === 'date' ? { shrink: 'true' } : {},
//           }}
//         />
//       );
//     case 'radio':
//       return (
//         <Box display="flex" alignItems="center">
//           <FormLabel id="buttons-group-label" style={{ marginRight: '16px' }}>
//             {label}
//           </FormLabel>
//           <FormControl>
//             <RadioGroup row aria-labelledby="buttons-group-label" name={id} defaultValue={value}>
//               {options.map((option) => (
//                 <FormControlLabel
//                   key={option.name}
//                   value={option.value}
//                   control={<Radio />}
//                   label={option.name}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </Box>
//       );

//     case 'checkbox':
//       return (
//         <Box display="flex" alignItems="start">
//           <FormControl component="fieldset">
//             <FormLabel component="legend">{label}</FormLabel>
//             <FormGroup row defaultChecked="option1">
//               {options.map((option) => (
//                 <FormControlLabel
//                   key={option.name}
//                   control={
//                     <Checkbox
//                       checked={value?.includes(option.value)}
//                       value={option.value}
//                       onChange={(e) => handleCheckboxChange(e, id)}
//                     />
//                   }
//                   label={option.name}
//                 />
//               ))}
//             </FormGroup>
//           </FormControl>
//           {/* <div>
//         <strong>Selected Values:</strong> {selectedValues.join(', ')}
//       </div> */}
//         </Box>
//       );
//     case 'select':
//       return (
//         <Autocomplete
//           id={id}
//           size="small"
//           options={options}
//           renderInput={(params) => <TextField name={id} {...params} label={label} variant="outlined" />}
//         />
//       );
//     default:
//       return null;
//   }
// }

// export default function CustomForm(props) {
//   const { elements, id, name, defaultValues } = props;
//   const initialFormData = elements.reduce(
//     (acc, element) => ({
//       ...acc,
//       [element.id]: defaultValues?.[element.id] ?? '',
//     }),
//     {},
//   );
//   console.log(initialFormData);
//   const [formData, setFormData] = useState(initialFormData);
//   console.log(formData);
//   return (
//     <Box component={Form} method="post" id={id} sx={{ mx: 'auto', mb: 10 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         {name}
//       </Typography>
//       <Grid container spacing={2}>
//         {elements.map((element) => (
//           <Grid
//             item
//             size={{ xs: 12, md: element.field === 'radio' || element.field === 'checkbox' ? 12 : 6 }}
//             key={element.id}
//           >
//             {renderElement(element, formData[element.id], setFormData)}
//           </Grid>
//         ))}{' '}
//         <Grid item container size={{ xs: 12 }}>
//           <Grid item>
//             <Button type="submit" variant="contained">
//               Save
//             </Button>{' '}
//           </Grid>
//           <Grid item>
//             <Button type="reset" variant="outlined">
//               Reset
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
