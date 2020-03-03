import React, { useEffect } from "react";

import axiosWithAuth from "../../utils/axiosWithAuth";

export default function ProtectedRouteDashboard({ history }) {
    useEffect( () => {
        axiosWithAuth()
            .get("/api/issues")
            .then(res => console.log("these are issues", res))
    } ,[])
    const logout = () => {
        localStorage.removeItem("token")
        history.push("/")
    }
    return (
        <div>
            issue, description, vote, city
            <button onClick={ logout }>Log Out</button>
        </div>
    )
}
