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
import AlternateMedicineModal from './AlternateMedicineModal';
import { Alert } from '@mui/material';

export default function PatientPrescriptionList() {
    var [prescriptionList, setPrescriptionList] = useState([]);
    var [timeTaken, setTimeTaken] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    //  Planning to show it when PATIENT is searched.
    const PrescriptionList = () => {
    return (
        <Box sx={{
        // paddingRight: '25%',
        // paddingLeft: '25%',
        maxWidth: '100%',
        // display: 'flex'
        marginTop: '2%'
        }}>
        { prescriptionListAccordion }
        </Box>
    );
    }

    const prescriptionListAccordion = prescriptionList.map((d) => {
        console.log(prescriptionList.length)
        if (prescriptionList?.length) {
        return <Accordion expanded={expanded === d.id} onChange={handleChange(d.id)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Doctor: {d?.doctor?.userName?.replace('@seu.edu.bd', '') || 'John Doe'}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{d.appointmentDate || 'No Date Stamp Found'}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                    }}
                    >
                    {
                    d?.listOfMedicine.map(med => {
                        return <>
                            <ListItem key={med.medicineId+med.medicineDosage}>
                                <ListItemText primary={med.medicineId} secondary={med.medicineDosage} />
                            </ListItem>
                            <Divider component="li" />
                            </>
                    })
                    }
                    </List>
                </AccordionDetails>
                </Accordion>
        } else {
        return <span>Waiting..</span>;
        }
    });


    useEffect(() => {
        var startDate = new Date();
        var server = require('../host.json');
        var host = server.auth;
        var patientId = localStorage.getItem('nid');
        console.log(patientId)
        
        axios.get(`${host}/prescription/get_list/${patientId}`).then(data => {
          console.log(data.data);
        setPrescriptionList(data.data);
        var endDate   = new Date();
        var seconds = (endDate.getTime() - startDate.getTime()) / 1000
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
                Prescription List
            </Typography>
            <PrescriptionList />
            <Alert style={{ marginTop: '1%' }} severity="info">Time: {timeTaken} seconds</Alert>
        </Box>
    );
}