//import { useState, useEffect } from 'react';
//project imports
import FormModal from '../FormModal';

import PrintView from 'components/PrintView';

export default function PrintViewModal(props) {
  const { name, open, onclose, data } = props;
  const title = `${name} Details`;

  return (
    <div>
      <FormModal open={open} onClose={onclose} title={title}>
        <PrintView data={data} name={name} />
      </FormModal>
    </div>
  );
}
