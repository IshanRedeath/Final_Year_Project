import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Proptypes from 'prop-types';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

FormModal.propTypes = {
  children: Proptypes.node,
  open: Proptypes.bool,
  onClose: Proptypes.func,
  title: Proptypes.string,
};
export default function FormModal(props) {
  const { children, open, onClose, title } = props;
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onclose}>
        <DialogTitle sx={{ bgcolor: 'lightblue' }}>
          {title}
          <Button
            sx={{ right: 10, position: 'absolute', top: 8 }}
            onClick={onClose}
            variant="contained"
            color="error"
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
