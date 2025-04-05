import { useState, useEffect } from 'react';

function Student() {
    const [student, setStudent] = useState(null); // Holds the student data

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch('http://127.0.0.1:8000/api/student/99966356/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);  // Log the data to the console (optional)
                setStudent(data);  // Set student data from the API
            })
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div>
            <h1>Student Information</h1>
            {student ? (
                <div>
                    <p><strong>ID:</strong> {student.student_id}</p>
                    <p><strong>Name:</strong> {student.first_name}</p>
                    <p><strong>Age:</strong> {student.last_name}</p>
                    <p><strong>Course:</strong> {student.email}</p>
                </div>
            ) : (
                <p>No student data available.</p>
            )}
        </div>
    );
}

export default Student;
