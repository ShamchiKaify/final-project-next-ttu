import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Router from 'next/router';
import { Alert } from '@mui/material';

export default function DoctorAppointmentList() {
    var [appointmentList, setAppointmentList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    //  Planning to show it when PATIENT is searched.
    const AppointmentList = () => {
        return (
            <Box sx={{
            // paddingRight: '25%',
            // paddingLeft: '25%',
            maxWidth: '100%',
            // display: 'flex'
            marginTop: '2%'
            }}>
            { appointmentListAccordion }
            </Box>
        );
    }

    const appointmentListAccordion = appointmentList.map((d) => {
        console.log(appointmentList.length)
        if (appointmentList?.length) {
        return <Accordion expanded={expanded === d.id} onChange={handleChange(d.id)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {d?.patientNid || 'John Doe'}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{d.dateOfAppointment || 'No Date Stamp Found'}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                    }}
                    >
                        <>
                        <ListItem
                            key={d.id} sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                Router.push({
                                    pathname: '/patient',
                                    query: {
                                        patientId: d?.patientNid
                                    }
                                })
                            }}
                        >
                                <ListItemText primary={d?.patientProfile?.userName} secondary={d?.patientNid} />
                            </ListItem>
                            <Divider component="li" />
                        </>
                    </List>
                </AccordionDetails>
                </Accordion>
        } else {
        return <span>Waiting..</span>;
        }
    });

    var [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        var startDate = new Date();
        var server = require('../../host.json');
        var host = server.auth;
        var doctorUserName = localStorage.getItem('userName');
        console.log(doctorUserName)
        
        axios.get(`${host}/appointment/get_doctor_appointment_list/${doctorUserName}`).then(data => {
          console.log(data.data);
            setAppointmentList(data.data);
            var endDate   = new Date();
            var seconds = (endDate.getTime() - startDate.getTime())
            setTimeTaken(seconds);
        });
    }, []);

    return (
        <Box
            sx={{
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
                Appointment List
            </Typography>
            <AppointmentList />
            <Alert style={{ marginTop: '1%' }} severity="info">Time: {timeTaken} ms</Alert>
        </Box>
    );
}