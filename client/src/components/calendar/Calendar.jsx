import React from 'react'
import DateCard from '../dateCard/DateCard'
import './Calendar.css'

const Calendar = () => {

    let days =30;

    return (
        <div>
            <h1>The Student Calendar is here bitches!</h1>

            <div className="monthContainer">

                {
                    [...Array(days)].map(()=>{
                        return(
                            <DateCard month="January" date="1" />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Calendar
