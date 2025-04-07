import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

function CreateNewDegree() {
    
    const [course_fullname, setFullName] = useState("");
    const [course_shortcode, setShortcode] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        const newDegree = {
            full_name: course_fullname,
            shortcode: course_shortcode,
        };

        try {
            const response = fetch("http://127.0.0.1:8000/api/degree/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDegree),
            });

            if (!response.ok) {
                throw new Error("Failed to create degree.");
            }

            const data = response.json();
            setMessage(`Degree created: ${data.full_name} (${data.shortcode})`);
            setFullName("");
            setShortcode("");

            setTimeout(() => navigate("/degree"), 1500);

        } catch (error) {
            console.error("Error creating degree:", error);
            setMessage("An error occurred while creating the degree.\nPerhaps this degree already exists.");
            setIsError(true);
        }
    };
    
    return (
        <div>
            <h1>Create a New Degree</h1>
            
            {message && (
                <div>
                    {message}
                </div>
            )}
            
            <div>
                <h2>Degree Details</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="course_fullname">
                            Full Name:
                        </label>
                        <input
                            id="course_fullname"
                            type="text"
                            value={course_fullname}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Computer Science"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="course_shortcode">
                            Shortcode:
                        </label>
                        <input
                            id="course_shortcode"
                            type="text"
                            value={course_shortcode}
                            onChange={(e) => setShortcode(e.target.value)}
                            placeholder="e.g. COMSCI"
                            maxLength={6}
                            required
                        />
                        <p>A unique identifier for this degree (max 5 characters)</p>
                    </div>
                    <div>
                        <Link to="/degree">Cancel</Link>
                        <button 
                            type="submit" 
                            disabled={!course_shortcode || !course_fullname}
                        >
                            Create Degree
                        </button>
                    </div>
                </form>
            </div>
        </div> 
    );
}

export default CreateNewDegree;
