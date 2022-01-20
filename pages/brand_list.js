import DoctorDashboard from "../src/dashboards/doctor-dashboard";
import loginChecker from "../src/loginChecker";
import BrandListTable from "../src/tables/BrandListTable";
import { useState, useEffect } from "react";

export default function BrandList() {
    var [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        var res = loginChecker();
        setIsLoggedIn(res);
    }, []);

    if (isLoggedIn) {
        return (
            <DoctorDashboard>
                <BrandListTable />
            </DoctorDashboard>
        );
    } else {
        return <>Checking authority..</>
    }
}