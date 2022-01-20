import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import AddAppointmentModal from './AddAppointmentModal';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function GutterlessList() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [passableText, setPassableText] = useState('');
    const [doctorList, setDoctorList] = useState([]);
    const [doctorNid, setDoctorNid] = useState('');
    const [patientNid, setPatientNid] = useState('');

    useEffect(() => {
        const nid = localStorage.getItem('nid');
        setPatientNid(nid);

        var server = require('../../host.json');
        var host = server.auth;
        axios.get(`${host}/user_profile/get_all_by_role/DOCTOR`).then(res => {
            console.log(res.data);
            setDoctorList(res.data);
        })
    }, []);

    return (
    <Box
        sx={{
            display: 'flex', justifyContent: 'center', flexDirection: 'column',
            paddingRight: '25%',
            paddingLeft: '25%',
            maxWidth: '100%',
            marginTop: '2%'
        }}
    >
        <Typography
            sx={{ mt: 0.5, display: 'flex', justifyContent: 'center' }}
            style={{backgroundColor: 'aliceblue'}}
            color="text.secondary"
            display="block"
            variant="subtitle2"
        >
            Doctor List
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center'  }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {doctorList?.map((value) => (
                <>
                    <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                        <IconButton onClick={() => {
                                handleOpen();
                                setPassableText(`${value.userName}`);
                        }}
                    >
                            <AddCircleTwoToneIcon/>
                        </IconButton>
                        }
                    >
                        <ListItemText primary={`Doctor: ${value.userName}`} />
                    </ListItem>
                    <Divider/>
                </>
                ))}
            </List>
        </Box>
            <AddAppointmentModal handleOpen={handleOpen} handleClose={handleClose} open={open} text={passableText} patientNid={patientNid}/>
    </Box>
    );
}