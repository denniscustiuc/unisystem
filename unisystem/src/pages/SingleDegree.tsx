import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SingleDegreePage(){

    const { shortcode } = useParams();
    const [degree, setDegree] = useState(null);
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/${shortcode}/`)
        .then((response) => response.json())
        .then((data) => setDegree(data))
        .catch((error) => console.error('Error fetching degree:', error));
        
        fetch (`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`)
        .then((response) => response.json())
        .then(data => setCohorts(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!degree) {
        return <p>Loading degree information...</p>
    }
    

    return (
        <div>
            <p>Name: {degree.full_name}</p>
            <p>Shortcode: {degree.shortcode}</p>
            <ul>
                {cohorts.map((cohort) => (
                    <li key={cohort.id}>
                        {cohort.id} - {cohort.name} - {cohort.year}
                        <Link to={`/cohort/${cohort.id}`}> View Cohort</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SingleDegreePage;