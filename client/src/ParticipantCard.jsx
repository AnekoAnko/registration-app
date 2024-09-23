import React from 'react'

function ParticipantCard({participant}){
    return (
        <div className='card-item'>
            <p>{participant.full_name}</p>
            <p>{participant.email}l</p>
        </div>
)}

export default ParticipantCard;