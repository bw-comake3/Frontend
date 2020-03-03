import React, { useEffect } from "react";

import axiosWithAuth from "../../utils/axiosWithAuth";

export default function ProtectedRouteDashboard() {
    useEffect( () => {
        axiosWithAuth()
            .get("/api/issues")
            .then(res => console.log("these are issues", res))
    } ,[])
    return (
        <div>
            issue, description, vote, city
            
        </div>
    )
}
