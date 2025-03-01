import React, { useEffect, useState } from 'react';
import CustomForm from 'components/Common/CustomForm';
import { getEmployeeIds, getRolesNames, createUser } from 'api/userAPIs';

export default function AddUser() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const elements = [
    {
      type: 'objectSelect',
      id: 'employee',
      label: 'Select Employee',
      required: true,
      optionLabel: 'fullname',
      options: employees,
    },
    {
      type: 'text',
      pattern: '^[A-Za-z]+(?: [A-Za-z]+)*$',
      errorText: 'Only Alphabets and spaces are allowed',
      id: 'username',
      label: 'Username',
      required: true,
      props: {},
      inputAdornment: 'FullName',
    },
    {
      type: 'text',
      // eslint-disable-next-line no-useless-escape
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
      errorText: 'Invalid Email address',
      id: 'email',
      label: 'Email',
      required: true,
      props: {},
      inputAdornment: 'Email',
    },

    {
      type: 'password',
      id: 'password',
      label: 'Password',
      required: true,
      props: { confirmPassword: true },
    },
    {
      type: 'checkbox',
      id: 'roles',
      label: 'Roles',
      required: true,
      optionLabel: 'name',
      options: roles,
    },
  ];

  useEffect(() => {
    getEmployeeIds().then((res) => {
      setEmployees(res.data.data.employeeNames);
    });
    getRolesNames().then((res) => setRoles(res.data.data));
  }, []);

  const handleSubmit = (formData) => {
    try {
      console.log(formData);
      createUser(formData)
        .then((res) => {
          console.log('User Created', res);
        })
        .catch((err) => {
          console.error('Connection Error ', err);
        });
    } catch (e) {
      console.log('Error: ', e);
    }
  };
  return (
    <div>
      <CustomForm
        elements={elements}
        id="addUsers"
        name="Add User Form"
        onSubmit={handleSubmit}
        submitType="Create"
      />
    </div>
  );
}
