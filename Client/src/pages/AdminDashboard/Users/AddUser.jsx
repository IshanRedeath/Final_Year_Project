import React from 'react';
import UserForm from './UserForm';
import { redirect, useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import CustomForm from 'components/Common/CustomForm';
import { max } from 'lodash';
const defaultValues = {
  username: 'Ishan',
  email: 'jsdjg@gasg',
  bd: '2222-12-12',
  password: 'sdfsdf',
  gender: 'female',
  checkbox: ['option1'],
  selectedRoles1: ['Admin', 'receptionist'],
  selectedRoles2: ['Admin'],
  selectedRoles3: [{ name: 'Admin' }, { name: 'doctor' }],
  selectedRoles4: { name: 'Admin' },
};
const elements = [
  { field: 'textInput', id: 'username', label: 'Username', required: true, props: {} },
  { field: 'textInput', id: 'email', label: 'Email', required: true, props: {} },
  {
    field: 'textInput',
    type: 'date',
    id: 'bd',
    label: 'Birth Date',
    required: true,
  },
  {
    field: 'checkbox',
    id: 'checkbox',
    label: 'Checkbox',
    required: true,
    options: [
      { id: 1, name: 'Option 1', value: 'option1', defaultChecked: true },
      { id: 2, name: 'Option 2', value: 'option2' },
    ],
  },
  {
    field: 'textInput',
    type: 'password',
    id: 'password',
    label: 'Password',
    required: true,
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
    field: 'radio',
    id: 'gender',
    label: 'Gender',
    required: true,
    options: [
      { name: 'Male', value: 'male' },
      { name: 'Female', value: 'female' },
    ],
  },

  {
    field: 'select',
    id: 'selectedRoles1',
    label: 'Roles1',
    required: true,
    props: { multiple: true },
    options: ['Admin', 'receptionist', 'doctor', 'nurse'],
  },
  {
    field: 'select',
    id: 'selectedRoles2',
    label: 'Roles2',
    required: true,

    options: ['Admin', 'receptionist', 'doctor', 'nurse'],
  },
  {
    field: 'objectSelect',
    id: 'selectedRoles3',
    label: 'Roles3',
    required: true,
    props: { multiple: true },
    optionLabel: 'name',
    options: [{ name: 'Admin' }, { name: 'receptionist' }, { name: 'doctor' }, { name: 'nurse' }],
  },
  {
    field: 'objectSelect',
    id: 'selectedRoles4',
    label: 'Roles4',
    required: true,

    optionLabel: 'name',
    options: [{ name: 'Admin' }, { name: 'receptionist' }, { name: 'doctor' }, { name: 'nurse' }],
  },
];

export default function AddUser() {
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
        //defaultValues={defaultValues}
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
