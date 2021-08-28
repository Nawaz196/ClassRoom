import React from 'react'
import './DateCard.css'

function DateCard({month,date}) {


    return (
        <div className="card" >
            <p style={{textAlign :"center"}} >{/* {month }  */}{date}</p>


        <div className="info">            
            <p>2 Assignments</p>
            <p>3 Classes</p>
        </div>

       

      </div>
    )
}

export default DateCard
