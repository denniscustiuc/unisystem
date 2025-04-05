import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SingleStudentPage(){

    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${id}`)
        .then((response) => response.json())
        .then((data) => setStudent(data))
        .catch((error) => console.error('Error fetching degree:', error)); // Error handling
    }, []); // Dependency array: fetch again only if `id` changes
    console.log(student);

    if(!student) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <p>Name: {student.first_name} {student.last_name}</p>
            <p>Email: {student.email}</p>
            <p>Student ID: {student.student_id}</p>
        </div>
    )
}

export default SingleStudentPage;