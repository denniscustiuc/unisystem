import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function AllModules() {
    
    const { code } = useParams();
    const [modules, setModules] = useState([]);

    useEffect(() => {        
        fetch (`http://127.0.0.1:8000/api/module`)
        .then((response) => response.json())
        .then(data => setModules(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
    console.log(modules[0]);


    if(!modules) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <h1>All Modules:</h1>
            <ul>
                {modules.map((module) => (
                    <li key={module.code}>
                        {module.code} - {module.full_name}
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default AllModules;