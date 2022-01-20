import { Alert, Button, IconButton, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import BasicModal from './Prescription';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import AlternateMedicineModal from './AlternateMedicineModal';


export default function FullWidthTextField() {
  var router = useRouter();
  var passedPatientId = router.query.patientId;
  var server = require('../host.json');
  var host = server.auth;
  var host_prescription = server.prescription;
  var [nid, setNid] = useState('');
  var [userProfile, setUserProfile] = useState({});
  var [userFound, setUserFound] = useState(false);
  var [patientId, setPatientId] = useState(passedPatientId || '');
  var [searchMedicine, setSearchMedicine] = useState('');
  var [open, setOpen] = useState(false);
  var [openAlternateMedicine, setOpenAlternateMedicine] = useState(false);
  const handleOpenAlternateMedicine = () => setOpenAlternateMedicine(true);
  const handleCloseAlternateMedicine = () => setOpenAlternateMedicine(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var [doctorUsername, setDoctorUserName] = useState('');
  var [prescriptionList, setPrescriptionList] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };  

  //  Planning to show it when PATIENT is searched.
  const PrescriptionList = () => {
    return (
      <Box sx={{
        paddingRight: '25%',
        paddingLeft: '25%',
        maxWidth: '100%',
        // display: 'flex'
        marginTop: '2%'
      }}>
        { prescriptionListAccordion }
      </Box>
    );
  }

  const prescriptionListAccordion = prescriptionList.map((d, idx) => {
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
                    d?.listOfMedicine.map((med,idx) => {
                      return <>
                        <ListItem
                          sx={{ cursor: 'pointer' }} key={idx}
                          onClick={() => {
                            setSearchMedicine(med.medicineId);
                            handleOpenAlternateMedicine();
                          }}
                        >
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
        return <></>;
      }
  });


  var [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('role') === 'DOCTOR') {
      setDoctorUserName(localStorage.getItem('userName'));
    }
    if (patientId !== '') {
      onClick()
    }
  }, [])

  const onClick = () => {
    var isOrient = JSON.parse(localStorage.getItem('isOrient'));
    if (isOrient === true) {
      host_prescription = server.orient;
    }
    setTimeTaken(0);
    var startDate = new Date();
    setUserFound(false);
    axios.get(`${host}/user_profile/get_patient_by_nid?nid=${patientId}`).then(res => {
      // console.log(res);
      if (res.status === 200) {
        setUserProfile(res.data);
        setUserFound(true);
        var endDate   = new Date();
        var seconds = (endDate.getTime() - startDate.getTime()) / 1000
        setTimeTaken(seconds);

        axios.get(`${host_prescription}/prescription/get_list/${patientId}`).then(data => {
          console.log(data)
          setPrescriptionList(data.data);
          endDate   = new Date();
          seconds = (endDate.getTime() - startDate.getTime()) / 1000
          setTimeTaken(seconds);
        });
      }
    });
  }

  const handlePatientIdClick = (e) => {
    setPatientId(e.target.value);
    // console.log(patientId)
  }

  return (
    <>
    <Box
      sx={{
        paddingRight: '25%',
        paddingLeft: '25%',
        maxWidth: '100%',
        display: 'flex'
      }}
    >
          <TextField autoComplete='off' fullWidth label="Patient ID" id="fullWidth" value={patientId} onChange={handlePatientIdClick} />
          <div style={{width: '5%'}}></div>
          <Button onClick={onClick} variant="outlined">Search</Button>
    </Box>
    {
        userFound &&
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            <ListItem>
              <ListItemText primary={userProfile?.dateOfBirth || 'N/A'} secondary="Date of Birth" />
            </ListItem>
            <Divider component="li" />
            <li>
              <Typography
                sx={{ mt: 0.5, ml: 2 }}
                color="text.secondary"
                display="block"
                variant="caption"
              >
              </Typography>
            </li>
            <ListItem>
              <ListItemText primary={userProfile?.nid || 'N/A'} secondary='NID' />
            </ListItem>
            <Divider component="li" variant="inset" />
            <li>
              <Typography
                sx={{ mt: 0.5, ml: 9 }}
                color="text.secondary"
                display="block"
                variant="caption"
              >
              </Typography>
            </li>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={userProfile?.userName || 'N/A'} secondary='username' />
            </ListItem>

            {
              doctorUsername?.length > 0 &&
              <ListItem>
                <Button onClick={handleOpen} variant="outlined">Add Prescription</Button>
              </ListItem>
            }
          </List>
        </Box>
    }
    {
        !userFound &&
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5%'
          }}
        >
          No Data Found.
        </Box>
    }

      <BasicModal open={open} handleClose={handleClose} patient={userProfile} doctor={doctorUsername} />
      {
        userFound &&
        <PrescriptionList />
      }
      <AlternateMedicineModal open={openAlternateMedicine} handleClose={handleCloseAlternateMedicine} medicineName={searchMedicine} />
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Alert style={{ width: '50%', marginTop: '1%' }} severity="info">Time: {timeTaken} seconds</Alert>
      </Box>
    </>
  );
}
