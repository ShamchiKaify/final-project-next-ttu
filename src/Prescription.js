import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import axios from 'axios';
import { useRef } from 'react';

const filter = createFilterOptions();

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

export default function BasicModal({ open, handleClose, patient, doctor }) {
    var medicineIdRef = useRef();
    var medicineDosageRef = useRef();
    var [medicineId, setmedicineId] = useState('');
    var [medicineDosage, setmedicineDosage] = useState('');
    var [medicineList, setMedicineList] = useState([]);
    var [dateToday, setDateToday] = useState(new Date().toDateString());

    var server = require('../host.json');
    var host = server.prescription;

    useEffect(() => {
    var isOrient = JSON.parse(localStorage.getItem('isOrient'));
    console.log(isOrient)
        if (isOrient === true) {
        host = server.orient;
        }
    }, [])

    useEffect(() => {
        // console.log('OPEN changed')
        if (!open) {
            setmedicineId('');
            setmedicineDosage('');
            setMedicineList([]);
        }
    }, [open]);

    const onDosageClick = () => {
        setmedicineDosage(medicineDosageRef.current.value)
    }

    const onIdClick = () => {
        setmedicineId(medicineIdRef.current.value);
    }

    const savePrescription = () => {
        var isOrient = JSON.parse(localStorage.getItem('isOrient'));
        if (isOrient === true) {
            host = server.orient;
        }
        console.log(patient, doctor)
        const postable = {
            patientNid: patient?.nid,
            doctorUserName: doctor,
            listOfMedicine: medicineList,
            appointmentDate: dateToday
        }
        axios.post(`${host}/prescription/add`, postable).then(res => {
            console.log(res);
            if (res.status === 200) {
                handleClose();
            }
        });
    }

    const onClick = () => {
        var foundList = [...medicineList];
        foundList.push({ medicineId, medicineDosage });
        setMedicineList(foundList);
        console.log(medicineList);
        setmedicineId('');
        setmedicineDosage('');
    }

    const listItems = medicineList.map((d) => {
        return  <>
                <ListItem key={d.medicineId+d.medicineDosage}>
                    <ListItemText primary={d.medicineId} secondary={d.medicineDosage} />
                </ListItem>
                <Divider component="li" />
                </>
    });


    //  5874695
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box>
                    <TextField autoComplete='off' sx={{ width: '100%' }} id="standard-basic" label="Medicine" variant="standard" inputRef={medicineIdRef} value={medicineId} onChange={onIdClick} />
                    <TextField autoComplete='off' sx={{ width: '100%' }} id="standard-basic" label="Dosage" variant="standard" inputRef={medicineDosageRef} value={medicineDosage} onChange={onDosageClick} />
                    <Button disabled={!medicineId.length || !medicineDosage.length} sx={{ marginTop: '2%' }} onClick={onClick} variant="outlined">Add</Button>
                    <Typography variant="overline" display="block" gutterBottom>
                        {dateToday}
                    </Typography>
                </Box>
                
                <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                >
                    { listItems }
                </List>
                <Button disabled={!medicineList?.length} sx={{marginTop: '2%'}} onClick={savePrescription} variant="outlined">Save</Button>
            </Box>
        </Modal>
    );
}