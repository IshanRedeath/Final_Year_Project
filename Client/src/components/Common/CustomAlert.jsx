import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
//Rect-confirm-alert package
import { confirmAlert } from 'react-confirm-alert';

export const customAlert = (resolve, reject, props) => {
  const { title, objects, message } = props;
  //const object = JSON.parse(JSON.stringify(objects)); //support  object duplication but not nesteD
  //const object = {...objects}; //support  object duplication but not nestea
  const object = structuredClone(objects); //support  object duplication evern deep nested
  const RenderObject = ({ data }) => {
    if (!data || typeof data !== 'object') {
      return <span style={{ color: 'grey' }}>{data}</span>;
    }

    return (
      <ul style={{ paddingLeft: '15px', margin: 0 }}>
        {Object.keys(data).map((key) => (
          <li key={key}>
            <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
              {key}:{' '}
              <span style={{ color: 'grey', fontWeight: 'normal' }}>
                {Array.isArray(data[key]) ? (
                  ` ${data[key].join(', ')}`
                ) : typeof data[key] === 'object' ? (
                  <RenderObject data={data[key]} /> // Recursively render nested objects
                ) : key === 'password' ? (
                  'xxxx'
                ) : key !== '_id' ? (
                  data[key]
                ) : (
                  delete data[key]
                )}
              </span>
            </Typography>
          </li>
        ))}
      </ul>
    );
  };

  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <React.Fragment>
          <Dialog
            open={open}
            onClose={() => {
              onClose();
              reject("User didn't agree");
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
                <br />
                {object && <RenderObject data={object} />}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  onClose();
                  reject("User didn't agree");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  resolve();
                }}
                autoFocus
              >
                Accept
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    },
  });
};
