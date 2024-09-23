import React, { useEffect, useState } from 'react';
import ParticipantCard from './ParticipantCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Participants() {
    const [participants, setParticipants] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const limit = 16;
    const { id } = useParams();

    const getData = async (search = '') => {
        const response = await axios.get(`https://registration-app-eygm.onrender.com/views/${id}`, {
            params: { page: page, search: search }
        });
        return response.data;
    };

    const getTotalCount = async (search = '') => {
        const response = await axios.get(`https://registration-app-eygm.onrender.com/total-participants/${id}`, {
            params: { search: search }
        }); 
        return response.data.totalCount;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData(searchTerm);
                setParticipants(data);

                const count = await getTotalCount(searchTerm);
                setTotalPages(Math.ceil(count / limit));
            } catch (err) {
                console.log("Failed to make request", err);
            }
        };
        fetchData();
    }, [page, id, searchTerm]); 

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
                pageNumbers.push(
                    <button 
                        key={i} 
                        onClick={() => setPage(i)} 
                        className='page-button'
                    >
                        {i}
                    </button>
                );
            } else if (i === page - 2 || i === page + 2) {
                pageNumbers.push(<span key={i}>...</span>);
            }
        }
        return pageNumbers;
    };

    return (
        <div>
            <h3 className='participants-title'>Awesome Participants</h3>
            <input 
                type="text" 
                placeholder="Search by name or email" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <div className='participants-cards'>
                {participants.length > 0 ? (
                    participants.map(participant => (
                        <ParticipantCard key={participant.id} participant={participant} />
                    ))
                ) : (
                    <p>No participants available</p>
                )}
            </div>
            <div className="pagination">
                {renderPageNumbers()}
            </div>
        </div>
    );
}

export default Participants;
