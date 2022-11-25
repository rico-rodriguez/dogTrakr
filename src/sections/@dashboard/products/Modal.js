import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { alpha, styled } from '@mui/material/styles';

const style = {
  borderRadius: '2%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 10,
  p: 4,
};
// ----------------------------------------------------------------------

BasicModal.propTypes = {
  modaltitle: PropTypes.string,
  modalLinkText: PropTypes.string,
};
export default function BasicModal({ modaltitle, modalLinkText, modalContent }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{modalLinkText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        modaltitle={modaltitle}
        modalLinkText={modalLinkText}
        modalContent={modalContent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modaltitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
