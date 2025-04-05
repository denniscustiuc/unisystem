import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllCohortPage(){
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cohort/')
            .then((response) => response.json())
            .then((data) => setCohorts(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);


    return (
        <div>
            <h1>All cohorts:</h1>
            <ul>
                {cohorts.map((cohort) => (
                    <li key={cohort.id}>
                        {cohort.name} - {cohort.year}
                        <Link to={`/cohort/${cohort.id}`}> View Cohort</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllCohortPage;