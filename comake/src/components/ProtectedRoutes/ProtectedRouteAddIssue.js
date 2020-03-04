import React from 'react'
import { connect } from "react-redux";

import { addIssue } from "../../actions";
import useInput from "../../hooks/input";

const ProtectedRouteAddIssue = ({ history, addIssue }) => {
    const [name, handleName] = useInput("")
    const [desc, handleDesc] = useInput("")
    const [city, handleCity] = useInput("")
    const [zip, handleZip] = useInput("")
    
    const handleAddIssue = (e) => {
        e.preventDefault()
        addIssue({ issue: name, description: desc, city, zip })
        setTimeout(() => history.push("/dashboard"), 500) 
    }
return (
    <div>
        <form onSubmit={ handleAddIssue }>
            <button onClick={ () => history.push("/dashboard") }>Go Back</button>
            <p>Be sure to fill out all fields, if adding an issue.</p>
            <input required name="name" type="text" placeholder="Issue" onChange={ e => handleName(e.target.value) }  />
            <input required name="desc" type="text" placeholder="Description" onChange={ e => handleDesc(e.target.value) } />
            <input required name="city" type="text" placeholder="City" onChange={ e => handleCity(e.target.value) } />
            <input required name="zip" type="text" placeholder="Zip Code" onChange={ e => handleZip(e.target.value) } /> 
            <button type="submit">Add Issue</button>
        </form>
    </div>
)}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, { addIssue })(ProtectedRouteAddIssue)