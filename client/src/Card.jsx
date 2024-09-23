function Card({event}) {
    return (
        <div className='item'>
            <div className="content">
                <p>{event.title}</p>
                <p>{event.description}</p>
            </div>
            <div className="item-buttons">
                <a href={`/signup/${event.id}`}>Registration</a>
                <a href={`/view/${event.id}`}>View</a>
            </div>
        </div>
    );
}

export default Card;
