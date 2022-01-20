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

export default function AlternateMedicineModal({ open, handleClose, medicineName }) {
    var server = require('../host.json');
    var host = server.url_dev;
    var [alternateList, setAlternateList] = useState([]);
    var [timeTaken, setTimeTaken] = useState(0);


    useEffect(() => {
        console.log
        // console.log('OPEN changed')
        if (open) {
            var startDate = new Date();
            axios.get(`${host}/medicine/get_alternative_medicine/${medicineName}`, { validateStatus: false }).then(res => {
                if (res.status === 404) {
                    setAlternateList([]);
                } else {
                    setAlternateList(res.data || []);
                }
                var endDate   = new Date();
                var seconds = (endDate.getTime() - startDate.getTime()) / 1000
                setTimeTaken(seconds);
            });
        }
    }, [open]);

    const listItems = alternateList?.map((d) => {
        return  <>
                <ListItem key={d?.medicineId+d?.medicineDosage}>
                    <ListItemText primary={d?.brandName} secondary={`${d?.form} (${d?.strength})`} />
                </ListItem>
                <Divider component="li" />
                </>
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box>
                    <Typography variant="overline" display="block" gutterBottom>
                        Alternate Medicines
                    </Typography>
                </Box>
                
                <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    maxHeight: '500px',
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                }}
                >
                    { listItems }
                </List>

                {
                    alternateList?.length === 0 &&
                    <>You may have to wait a bit. If it's taking too long, there might not be any alternative medicine available at this moment.</>
                }
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Alert style={{ width: '100%', marginTop: '5%' }} severity="info">Time: { timeTaken } seconds</Alert>
                </Box>
            </Box>
        </Modal>
    );
}