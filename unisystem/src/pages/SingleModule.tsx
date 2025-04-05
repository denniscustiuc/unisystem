import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SingleModulePage(){

    const { id } = useParams();
    const [cohort, setCohort] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {        
        fetch (`http://127.0.0.1:8000/api/cohort/${id}`)
        .then((response) => response.json())
        .then(data => setCohort(data))
        .catch((error) => console.error('Error fetching data:', error));
    
        fetch(`http://127.0.0.1:8000/api/student/?cohort=${id}`)
        .then((response) => response.json())
        .then(data => setStudents(data))
        .catch((error) => console.error('Error fetching data:', error));

    }, []);
 
    if(!cohort) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <p>Name: {cohort.name}</p>
            <p>Year: {cohort.year}</p>
            <p>Code: {cohort.id}</p>
            <Link to={`/module/${id}`}>View Modules</Link>
            <h3>Students Enrolled:</h3>
            <ul>
                {students.map((student) => (
                    <li key={student.student_id}>
                        Name: {student.first_name} {student.last_name} <br/>
                        Email: {student.email}
                        <Link to={`/student/${student.student_id}`}> View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SingleModulePage;