import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ModulesForCohort(){

    const { code } = useParams();
    const [modules, setModules] = useState(null);

    useEffect(() => {        
        fetch (`http://127.0.0.1:8000/api/module/?delivered_to=${code}`)
        .then((response) => response.json())
        .then(data => setModules(data))
        .catch((error) => console.error('Error fetching data:', error));

    }, []);
    console.log(modules);


    if(!modules) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{code} Modules:</h1>
            <ul>
                {modules.map((module) => (
                    <li key={module.code}>
                        {module.code} - {module.full_name} - <Link to={`/module/${module.code}`}> View Module</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ModulesForCohort;