import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function CreateNewCohort() {
    const [id, setID] = useState("");
    const [year, setYear] = useState("");
    const [degree, setDegree] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [degrees, setDegrees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDegrees = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/degree/");
                if (!response.ok) {
                    throw new Error("Failed to fetch degrees");
                }
                const data = await response.json();
                setDegrees(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage("An error occurred while fetching degrees.");
                setIsError(true);
                setLoading(false);
            }
        };

        fetchDegrees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        const newCohort = {
            id: `${degree}${year}`,
            year: parseInt(year, 10),
            degree: `http://127.0.0.1:8000/api/degree/${degree}/`,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/cohort/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCohort),
            });

            if (!response.ok) throw new Error("Failed to create cohort.");

            const data = await response.json();
            setMessage(`Cohort created: ID ${data.id}`);
            setID("");
            setYear("");
            setDegree("");

            setTimeout(() => navigate("/cohort"), 1500);

        } catch (error) {
            setMessage("An error occurred while creating the cohort.");
            setIsError(true);
        }
    };

    return (
        <div>
            <h1>Create New Cohort</h1>

            {message && (
                <div>
                    {message}
                </div>
            )}

            <div>
                <div>
                    <h2>Cohort Details</h2>
                </div>
                <div>
                    {loading ? (
                        <p>Loading degrees...</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="degree">
                                    Degree:
                                </label>
                                <select
                                    id="degree"
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                    required
                                >
                                    <option value="">Select a degree</option>
                                    {degrees.map((deg) => (
                                        <option key={deg.shortcode} value={deg.shortcode}>
                                            {deg.full_name} ({deg.shortcode})
                                        </option>
                                    ))}
                                </select>
                                <p>Select the degree program for this cohort</p>
                            </div>

                            <div>
                                <label htmlFor="year">
                                    Year:
                                </label>
                                <input
                                    id="year"
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    placeholder="1-4"
                                    required
                                    min="1"
                                    max="4"
                                />
                                <p>Enter a value between 1 and 4</p>
                            </div>

                            {degree && year && (
                                <div>
                                    <p>
                                        Cohort ID will be: <strong>{degree}{year}</strong>
                                    </p>
                                </div>
                            )}

                            <div>
                                <Link to="/cohort">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={!year || !degree}
                                >
                                    Create Cohort
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateNewCohort;
