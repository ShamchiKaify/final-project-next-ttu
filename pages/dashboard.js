import { Alert } from '@mui/material';
import DoctorDashboard from '../src/dashboards/doctor-dashboard';
import { useRouter } from 'next/router';
import PharmacistDashboard from '../src/dashboards/pharmacist-dashboard';
import PatientDashboard from '../src/dashboards/patient-dashboard';
import loginChecker from '../src/loginChecker';
import { useState, useEffect } from 'react';
import DemoTable from '../src/tables/DemoTable';
import PatientPrescriptionList from '../src/PatientPrescriptionList';
import DoctorAppointmentList from '../src/Appointment/AppointmentList';

const DoctorDash = (props) => {
    return (
        <DoctorDashboard>
            <Alert severity="info">{props.banner}</Alert>
            <DoctorAppointmentList/>
        </DoctorDashboard>
    );
}

const PharmacistDash = (props) => {
    return (
        <PharmacistDashboard>
            <Alert severity="info">{props.banner}</Alert>
            <DemoTable/>
        </PharmacistDashboard>
    );
}

const PatientDash = (props) => {
    return (
        <PatientDashboard>
            <Alert severity="info">{props.banner}</Alert>
            <PatientPrescriptionList/>
        </PatientDashboard>
    );
}

export default function Dashboard(props) {
    var router = useRouter();
    var { userName, role } = router.query;
    var [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!userName && typeof window !== 'undefined') {
        userName = localStorage.getItem('userName');
    }

    if (!role && typeof window !== 'undefined') {
        role = localStorage.getItem('role');
    }

    console.log(userName, role)

    useEffect(() => {
        var res = loginChecker();
        setIsLoggedIn(res);
    }, []);

    if (isLoggedIn) {
        var banner = '';
        if (role === 'PHARMACIST') {
            banner = 'Welcome to your pharmacist dashboard!'
            return <PharmacistDash banner={banner}/>
        } else if (role === 'DOCTOR') {
            banner = 'Welcome to your doctor dashboard!'
            return <DoctorDash banner={banner}/>
        } else {
            banner = 'Welcome to your patient dashboard!'
            return <PatientDash banner={banner}/>
        }
    } else {
        return <>Checking authority..</>
    }
}