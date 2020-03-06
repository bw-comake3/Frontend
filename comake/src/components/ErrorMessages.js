import React from 'react'

export default function ErrorMessages({ errors }) {
    return (
        <>
          {
              (errors.name !== undefined || errors.desc !== undefined || errors.city || errors.zip)&&(
                    <>
                        <div className="redText">
                            <div>{ (errors.name !== undefined) ? (Object.values(errors.name)[0]) : (null) }</div>    
                            <div>{ (errors.desc !== undefined) ? (Object.values(errors.desc)[0]) : (null) }</div>    
                            <div>{ (errors.city !== undefined) ? (Object.values(errors.city)[0]) : (null) }</div>    
                            <div>{ (errors.zip !== undefined) ? (Object.values(errors.zip)[0]) : (null) }</div>    
                        </div>
                    </>
              )
          }  
        </>
    )
}
