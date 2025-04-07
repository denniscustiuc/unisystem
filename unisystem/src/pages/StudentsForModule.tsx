import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentsForModule() {
    const { code } = useParams();
    const [module, setModule] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchModule = await fetch(`http://127.0.0.1:8000/api/module/${code}/`);
            if (!fetchModule.ok) {
                throw new Error('Error fetching module data');
            }

            const moduleData = await fetchModule.json(); 
            setModule(moduleData);

            const cohortUrls = moduleData.delivered_to ? moduleData.delivered_to : [];
            const cohortData = await Promise.all(
                cohortUrls.map((cohort) => 
                    fetch(cohort)
                        .then(response => response.json()
                ))
            );

            const studentData = await Promise.all(
                cohortData.map(cohort =>
                    fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort.id}`)
                        .then(response => response.json())
                )
            );

            const allStudents = studentData.flat();
            setStudents(allStudents);

        };

        fetchData();
    }, [code]);

    return (
        <ul>
            {students.map((student) => (
                    <li key={student.student_id}>
                        Name: {student.first_name} {student.last_name} <br/>
                        Email: {student.email}
                    
                    </li>
                ))}
        </ul>
    )

}

export default StudentsForModule;