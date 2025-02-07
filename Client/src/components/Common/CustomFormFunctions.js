export const detectChanges = (formData, defaultValues) => {
  const newChanges = Object.keys(formData).reduce((acc, objKey) => {
    // Check if the key exists in `defaultValues`
    if (Object.prototype.hasOwnProperty.call(defaultValues, objKey)) {
      const formValue = formData[objKey]; //get the new value
      const defaultValue = defaultValues[objKey]; //get the default value

      // Handle nested objects
      if (
        formValue &&
        typeof formValue === 'object' &&
        !Array.isArray(formValue) &&
        defaultValue &&
        typeof defaultValue === 'object' &&
        !Array.isArray(defaultValue)
      ) {
        const nestedChanges = detectChanges(formValue, defaultValue);
        return [...acc, ...nestedChanges]; // Merge nested changes into the accumulator
      }

      // Compare arrays or objects as JSON strings for display purposes
      const isObjectOrArray = (val) => typeof val === 'object' && val !== null; //check if the value is an object or an array
      const formValueString = isObjectOrArray(formValue) ? JSON.stringify(formValue) : formValue; //if new value is object or array convert to string
      const defaultValueString = isObjectOrArray(defaultValue) ? JSON.stringify(defaultValue) : defaultValue; //if default value is object or array convert to string

      // Compare values
      if (formValueString !== defaultValueString) {
        acc.push({ [objKey]: `${defaultValueString} => ${formValueString}` });
      }
    }
    return acc; // Always return the accumulator
  }, []); // Initial value as an empty array

  return newChanges;
};

export const validate = (formData, elements) => {
  const errors = {};

  elements.forEach((element) => {
    if (element.pattern) {
      // implement any regex pattern if have for a field
      if (!new RegExp(element.pattern).test(formData[element.id])) {
        console.log(element.pattern);
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
