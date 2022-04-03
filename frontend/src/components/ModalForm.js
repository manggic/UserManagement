import  React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalForm({create = false,isModalOpen, dataToEdit, handleClose, handleChange, fillRandomData, onSaveButtonClick}) {


    
// console.log('data mine', data)
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField  style={{padding: '10px', display: 'flex' }} name='name'  onChange={handleChange} value={dataToEdit.name} label="Name" color="secondary" focused />
          <TextField  style={{padding: '10px',  display: 'flex'  }} name='email'  onChange={handleChange} value={dataToEdit.email} label="Email" color="secondary" focused />
        
        <TextField type='number'  style={{padding: '10px',  display: 'flex'  }} onChange={handleChange} name='mobile' value={dataToEdit.mobile} label="Mobile" color="secondary" focused />
        <TextField type='number'  style={{padding: '10px',  display: 'flex'  }} name='age' onChange={handleChange} value={dataToEdit.age} label="Age" color="secondary" focused />
        <TextField type="date" style={{padding: '10px',  display: 'flex'  }} name='DOB' onChange={handleChange} value={dataToEdit.DOB} label="DOB" color="secondary" focused /><br />
        
        <div style={{padding: '0px 10px' }}>
        <Button  style={{padding: '10px', width: '100%' }}  onClick={onSaveButtonClick}  variant='contained' color='info'>Save</Button>
        </div>
        <div style={{padding: '0px 10px' , marginTop:'10px'  }}>
        {create? <Button  style={{padding: '10px', width: '100%' }}  onClick={fillRandomData}  variant='contained' color='info'>Fill Random</Button>:'' }

        </div>
        </Box>
      </Modal>
    </div>
  );
}
