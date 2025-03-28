import React from 'react';
import PriviledgeForm from './PriviledgeForm';
import { createPriviledge } from 'api/priviledgesAPIs';

import UseAPI from 'hooks/useAPI';

export default function AddPriviledge() {
  const { createData } = UseAPI();
  const handleSubmit = (data) => {
    createData(createPriviledge, data);
  };

  return (
    <div>
      <PriviledgeForm onSubmit={handleSubmit} />
    </div>
  );
}
