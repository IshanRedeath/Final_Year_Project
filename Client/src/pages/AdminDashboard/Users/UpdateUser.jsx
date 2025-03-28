import { useEffect, useState } from 'react';

import { getEmployeeIds, getRolesNames, patchUser, getOneUser } from 'api/userAPIs';
import UseAPI from 'hooks/useAPI';
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from 'components/Common/CustomForm';
export default function UpdateUser({ Id }) {
  const { id } = useParams();

  if (!Id) {
    Id = id;
  }
  console.log(Id);
  const { fetchData, updateData } = UseAPI();
  const [employees, setEmployees] = useState([]);
  const [defaultValues, setDefaultValues] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const elements = [
    {
      type: 'objectSelect',
      id: 'user',
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
    const fetchArray = [
      { function: getRolesNames, setFunction: setRoles },
      { function: getEmployeeIds, setFunction: setEmployees },
      { function: () => getOneUser(Id), setFunction: setDefaultValues },
    ];

    fetchData(fetchArray);
  }, []);
  const handleSubmit = (data) => {
    navigate('/admin-dashboard/users');
    updateData(patchUser, Id, data);
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
        updateId={Id}
      />
    </div>
  );
}
