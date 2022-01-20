import { useState, useEffect } from "react";
import loginChecker from "../src/loginChecker";
import FullWidthTextField from "../src/Patient";
import PatientDashboard from "../src/dashboards/patient-dashboard";
import Appointment from "../src/Appointment/Appointment";


export default function FullWidthTextFieldPage() {
    var [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        var res = loginChecker();
        setIsLoggedIn(res);
    }, []);

    if (isLoggedIn) {
        return (
            <PatientDashboard>
                <Appointment/>
            </PatientDashboard>
        );
    } else {
        return <>Checking authority..</>
    }
}
