import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SingleModulePage(){

    const { code } = useParams();
    const [module, setModule] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/${code}/`)
        .then((response) => response.json())
        .then((data) => setModule(data))
        .catch((error) => console.error('Error fetching degree:', error));
 
    }, []);
    console.log(module);   
 
    if(!module) {
        return <p>Loading module information...</p>
    }

    return (
        <div>
            <h1>{module.full_name}</h1>
            <p>Module Code: {module.code}</p>
            <p>CA Split: {module.ca_split}%</p>
            <p>Delivered to: {module.delivered_to.length} cohort{(module.delivered_to.length) > 1 ? "s" : ""} </p>
            <Link to={`/module/${module.code}/student`}>View Students</Link>
        </div> 
    )

}

export default SingleModulePage;