import { useEffect, useState } from 'react';
import Card from './Card';
import './index.css';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12;
  const [sortBy, setSortBy] = useState('id'); 

  const getData = async () => {
    const response = await axios.get(`https://registration-app-eygm.onrender.com/`, { 
      params: { page: page, sortBy: sortBy } 
    });
    return response.data;
  };

  const getTotalCount = async () => {
    const response = await axios.get('https://registration-app-eygm.onrender.com/total-events');
    return response.data.totalCount;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setEvents(data);

        const count = await getTotalCount();
        setTotalPages(Math.ceil(count / limit));
      } catch (err) {
        console.log("Failed to make request", err);
      }
    };
    fetchData();
  }, [page, sortBy]); 

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
    <>
      <h3 className='events'>Events</h3>
      <div className="sort-options">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Title</option>
          <option value="event_date">Event Date</option>
          <option value="organizer">Organizer</option>
        </select>
      </div>
      <div className='container'>
        {events.length > 0 ? ( 
          events.map(event => (
            <Card key={event.id} event={event} />
          ))
        ) : (
          <p>Connecting to database</p>
        )}
      </div>
      <div className="pagination">
        {renderPageNumbers()}
      </div>
    </>
  );
}

export default App;
