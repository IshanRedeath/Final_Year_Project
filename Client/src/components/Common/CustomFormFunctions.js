// export const detectChanges = (formData, defaultValues) => {
//   const newChanges = Object.keys(formData).reduce((acc, objKey) => {
//     // Check if the key exists in `defaultValues`
//     if (Object.prototype.hasOwnProperty.call(defaultValues, objKey)) {
//       const formValue = formData[objKey]; //get the new value
//       const defaultValue = defaultValues[objKey]; //get the old value

//       // Handle nested objects
//       if (
//         formValue &&
//         typeof formValue === 'object' && //new value is an object
//         !Array.isArray(formValue) && //new value is not an array
//         defaultValue &&
//         typeof defaultValue === 'object' && //old value is an object
//         !Array.isArray(defaultValue) //old value is not an array
//       ) {
//         const nestedChanges = detectChanges(formValue, defaultValue); // Recursively check for changes in nested objects
//         return [...acc, ...nestedChanges]; // Merge nested changes into the accumulator
//       }

//       // Compare arrays or objects as JSON strings for display purposes
//       const isObjectOrArray = (val) => typeof val === 'object' && val !== null; //check if the value is an object or an array
//       const formValueString = isObjectOrArray(formValue) ? JSON.stringify(formValue) : formValue; //if new value is object or array convert to string
//       const defaultValueString = isObjectOrArray(defaultValue) ? JSON.stringify(defaultValue) : defaultValue; //if old value is object or array convert to string

//       // Compare values
//       if (formValueString !== defaultValueString) {
//         acc.push({ [objKey]: `${defaultValueString} => ${formValueString}` });
//       }
//     }
//     return acc; // Always return the accumulator
//   }, []); // Initial value as an empty array

//   return newChanges;
// };
export const detectChanges = (formData, defaultValues) => {
  const newChanges = Object.keys(formData).reduce((acc, objKey) => {
    if (Object.prototype.hasOwnProperty.call(defaultValues, objKey)) {
      const formValue = formData[objKey]; // New value
      const defaultValue = defaultValues[objKey]; // Old value

      // Handle nested objects
      if (
        formValue &&
        typeof formValue === 'object' && // Check if the new value is an object
        !Array.isArray(formValue) && // Check if the new value is not an array
        defaultValue &&
        typeof defaultValue === 'object' && // Check if the old value is an object
        !Array.isArray(defaultValue) // Check if the old value is not an array
      ) {
        const nestedChanges = detectChanges(formValue, defaultValue); // Recursively check for changes

        if (Object.keys(nestedChanges).length > 0) {
          acc[objKey] = nestedChanges; //  Store nested changes inside parent key
        }
        return acc;
      }

      // Compare arrays or objects as JSON strings for display purposes
      const isObjectOrArray = (val) => typeof val === 'object' && val !== null;
      const formValueString = isObjectOrArray(formValue) ? JSON.stringify(formValue) : formValue; //  Convert to string if new value object or array
      const defaultValueString = isObjectOrArray(defaultValue) ? JSON.stringify(defaultValue) : defaultValue; //  Convert to string if old value object or array

      // Compare values
      if (formValueString !== defaultValueString) {
        acc[objKey] = `${defaultValueString} => ${formValueString}`; //  Store changes inside the key
      }
    }
    return acc;
  }, {}); //  Use an object instead of an array

  return newChanges;
};
// export const detectChanges = (formData, defaultValues = {}) => {
//   const newChanges = {};

//   Object.keys(defaultValues).forEach((key) => {
//     const formValue = formData[key]; // New value
//     const defaultValue = defaultValues[key]; // Old value

//     if (formValue === defaultValue) return; // Skip if values are the same

//     // Handle nested objects
//     if (typeof formValue === 'object' && formValue !== null && !Array.isArray(formValue)) {
//       const nestedChanges = detectChanges(formValue, defaultValue || {});
//       if (Object.keys(nestedChanges).length > 0) {
//         newChanges[key] = nestedChanges;
//       }
//     }
//     // Track changes for primitive values & arrays
//     else {
//       newChanges[key] = `${defaultValue} => ${formValue}`;
//     }
//   });

//   return newChanges;
// };

export const validate = (formData, elements) => {
  const errors = {};

  elements.forEach((element) => {
    if (element.pattern) {
      // implement any regex pattern if have for a field
      if (!new RegExp(element.pattern).test(formData[element.id])) {
        errors[element.id] = element.errorText || 'Invalid value'; //custom error message
      }
    }

    // Check if the field is required and if it is empty
    if (element.required && (formData[element.id] === null || formData[element.id].length === 0)) {
      errors[element.id] = 'Required';
    }
  });

  return errors;
};
