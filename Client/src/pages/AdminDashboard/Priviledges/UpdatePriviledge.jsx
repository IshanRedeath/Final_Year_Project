import React, { useEffect, useState } from 'react';
import PriviledgeForm from './PriviledgeForm';
import { updatePriviledge, getOnePriviledge } from 'api/priviledgesAPIs';

import UseAPI from 'hooks/useAPI';
import { useParams } from 'react-router-dom';

export default function UpdatePriviledge() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { updateData, fetchOne } = UseAPI();

  useEffect(() => {
    fetchOne(getOnePriviledge, id, setData);
  }, []);
  //   const formattedData = data.permissions?.map(({ module, priviledges }) => ({
  //     module,
  //     priviledges: {
  //       create: priviledges.includes('create'),
  //       read: priviledges.includes('read'),
  //       update: priviledges.includes('update'),
  //       delete: priviledges.includes('delete'),
  //     },
  //   }));
  //   setData({ ...data, permissions: formattedData });
  const handleSubmit = (data) => {
    updateData(updatePriviledge, id, data);
  };

  return (
    <div>
      <PriviledgeForm onSubmit={handleSubmit} existingPriviledge={data} />
    </div>
  );
}
