import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllDegreePage(){
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/degree/')
            .then((response) => response.json())
            .then((data) => setDegrees(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);


    return (
        <div>
            <h1>All Degrees:</h1>
            <ul>
                {degrees.map((degree) => (
                    <li key={degree.shortcode}>
                        {degree.shortcode} - {degree.full_name}
                        <Link to={`/degree/${degree.shortcode}`}> View Course</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllDegreePage;