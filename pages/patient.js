import { useState, useEffect } from "react";
import loginChecker from "../src/loginChecker";
import DoctorDashboard from "../src/dashboards/doctor-dashboard";
import FullWidthTextField from "../src/Patient";


export default function FullWidthTextFieldPage() {
    var [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        var res = loginChecker();
        setIsLoggedIn(res);
    }, []);

    if (isLoggedIn) {
        return (
            <DoctorDashboard>
                <FullWidthTextField/>
            </DoctorDashboard>
        );
    } else {
        return <>Checking authority..</>
    }
}
