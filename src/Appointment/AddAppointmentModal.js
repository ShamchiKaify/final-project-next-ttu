import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Alert } from '@mui/material';



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

export default function AddAppointmentModal({ handleOpen, handleClose, open, text, patientNid }) {
    const [payload, setPayload] = useState({});
    const [defaultValue, setDefaultValue] = useState('');
    
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);

    useEffect(() => {
        const today = new Date();
        var date = today.getDate();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const tempDefaultValue = `${year}-${month}-${date}`;

        setDefaultValue(tempDefaultValue);

        console.log(today, year, month, date)
        console.log(defaultValue)
        setPayload({
            ...payload,
            doctorUserName: text,
            patientNid,
            dateString: defaultValue
        })
        console.log(payload)
        setError(undefined);
        setSuccess(undefined);
    }, [open]);

    const saveAppointment = () => {
        setError(undefined);
        setSuccess(undefined);
        console.log(payload)
        var server = require('../../host.json');
        var host = server.auth;

        axios.post(`${host}/appointment/save`, payload).then(res => {
            console.log(res);
            setError(res.status === 204)
            if (res.status === 200) {
                setSuccess(true);
            }
        });
    };

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Doctor: {text}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Details/Speciality etc.
                </Typography>
                
                <Typography id="modal-modal-datepicker" sx={{ mt: 2 }}>
                    <TextField
                        id="date"
                        label="Appointment Date"
                        type="date"
                        defaultValue={defaultValue}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setPayload({ ...payload, dateString: e.target.value })
                            console.log(payload)
                        }}
                    />
                </Typography>
                
                <Typography id="modal-modal-datepicker" sx={{ mt: 2 }}>
                    <Button onClick={ saveAppointment } variant="outlined">Save</Button>
                </Typography>
                
                {
                    error &&
                    <Typography id="modal-modal-error" sx={{ mt: 2 }}>
                        <Alert severity="error">An appointment already exists on this date.</Alert>
                    </Typography>
                }
                
                {
                    success &&
                    <Typography id="modal-modal-error" sx={{ mt: 2 }}>
                        <Alert severity="success">Appointment taken successfully!</Alert>
                    </Typography>
                }
            </Box>
            </Modal>
        </div>
    );
}