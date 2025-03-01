import { useEffect, useState } from 'react';
import CustomForm from 'components/Common/CustomForm';
import { getEmployeeIds, getRolesNames, patchUser, getOneUser } from 'api/userAPIs';

export default function UpdateUser({ id }) {
  const [employees, setEmployees] = useState([]);
  const [defaultValues, setDefaultValues] = useState(null);
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
      required: false,
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
    async function fetchData() {
      await getEmployeeIds().then((res) => {
        setEmployees(res.data.data.employeeNames);
      });
      await getRolesNames().then((res) => setRoles(res.data.data));
      await getOneUser(id).then((res) => {
        setDefaultValues(res.data.data);
      });
    }
    fetchData();
  }, []);
  console.log('default: ', defaultValues, 'id: ', id);
  const handleSubmit = (formData) => {
    try {
      patchUser(id, formData)
        .then((res) => {
          console.log('User Updated', res);
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
        key={JSON.stringify(defaultValues)} // to re-render the form
        elements={elements}
        id="updateUsers"
        name="Update User Form"
        onSubmit={handleSubmit}
        submitType="Update"
        defaultValues={defaultValues}
      />
    </div>
  );
}
