import React from 'react';
import UserForm from '../UserForm';
import { redirect, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import CustomForm from 'components/Common/CustomForm';
import { max } from 'lodash';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { InputAdornment } from '@mui/material';

const elements = [
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
    id: 'email',
    label: 'Email',
    required: true,
    props: {},
    inputAdornment: <EmailTwoToneIcon />,
  },
  {
    type: 'file',
    id: 'file',
    label: 'File Upload',
    options: { multiple: true, onChange: (e) => console.log(e.target.files) },

    props: {},
    inputAdornment: <EmailTwoToneIcon />,
  },
  {
    type: 'date',
    id: 'bd',
    label: 'Birth Date',
    required: true,
    // inputProps: { inputProps: { min: '2003-12-31', max: '2025-10-1' } },
  },
  {
    type: 'checkbox',
    id: 'checkbox',
    label: 'Checkbox',
    required: true,
    options: [
      { id: 1, name: 'Option 1', value: 'option1', defaultChecked: true },
      { id: 2, name: 'Option 2', value: 'option2' },
    ],
  },
  {
    type: 'number',
    id: 'number',
    label: 'Number',
    // required: true,
    inputAdornment: <EmailTwoToneIcon />,
    inputProps: { inputProps: { max: 10 } },
  },
  {
    type: 'password',
    id: 'password',
    label: 'Password',
    required: true,
    props: { confirmPassword: true },

    //props: { multiline: true, maxRows: 3 },
  },
  // {
  //   name: 'confirmPassword',
  //   field: 'textInput',
  //   type: 'password',
  //   id: 'confirmPassword',
  //   label: 'Confirm Password',
  //   required: true,
  //   props: {},
  // },
  {
    type: 'radio',
    id: 'gender',
    label: 'Gender',
    required: true,
    options: [
      { name: 'Male', value: 'male' },
      { name: 'Female', value: 'female' },
    ],
  },

  {
    type: 'select',
    id: 'selectedRoles1',
    label: 'Roles1',
    required: true,
    props: { multiple: true },
    options: ['Admin', 'receptionist', 'doctor', 'nurse'],
  },
  {
    type: 'select',
    id: 'selectedRoles2',
    label: 'Roles2',
    required: true,

    options: ['Admin', 'receptionist', 'doctor', 'nurse'],
  },
  {
    type: 'objectSelect',
    id: 'selectedRoles3',
    label: 'Roles3',
    required: true,
    props: { multiple: true }, // for multiple select
    optionLabel: 'name', // must specify the key to be displayed
    options: [{ name: 'Admin' }, { name: 'receptionist' }, { name: 'doctor' }, { name: 'nurse' }],
  },
  {
    type: 'objectSelect',
    id: 'selectedRoles4',
    label: 'Roles4',
    required: true,

    optionLabel: 'name', // must specify the key to be displayed
    options: [{ name: 'Admin' }, { name: 'receptionist' }, { name: 'doctor' }, { name: 'nurse' }],
  },
];

export default function AddUser(defaultValues = {}) {
  const errors = useActionData();
  // const data = useLoaderData();
  const { state } = useNavigation();
  const isSubmitting = state === 'submitting';
  return (
    <div>
      {/* <UserForm errors={errors} submitType="add" isSubmitting={isSubmitting} /> */}
      <CustomForm
        elements={elements}
        id="addUsers"
        name="Add User Form"
        //ssd
        defaultValues={defaultValues}
      />
    </div>
  );
}

function loader() {}
async function action({ request }) {
  const formData = await request.formData();

  const formDataObject = Object.fromEntries(formData.entries());
  JSON.stringify(formData);
  console.log(formDataObject);
  return redirect('/admin-dashboard/users');
}

export const addUserRoutes = {
  action,
  element: <AddUser />,
};
