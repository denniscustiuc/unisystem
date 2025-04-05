const SetGrades = () => {
    const { student_id } = useParams();
    const navigate = useNavigate();
    
    const [student, setStudent] = useState(null);
    const [existingGrades, setExistingGrades] = useState([]);
    const [availableModules, setAvailableModules] = useState([]);
    const [cohortModules, setCohortModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Form state for adding a new grade
    const [newGrade, setNewGrade] = useState({
        module: '',
        ca_mark: 0,
        exam_mark: 0,
        student: `http://127.0.0.1:8000/api/student/${student_id}/`,
        cohort: ''
    });
    
    // Form state for editing existing grades
    const [editedGrades, setEditedGrades] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch student details
            console.log(student_id)
            const studentResponse = await fetch(`http://127.0.0.1:8000/api/student/${student_id}/`);
            if (!studentResponse.ok) throw new Error('Failed to fetch student data');
            const studentData = await studentResponse.json();
            setStudent(studentData);
            
            // Get cohort ID from student's cohort URL
            const cohortId = studentData.cohort.split('/').filter(Boolean).pop();
            
            // Fetch existing grades for the student
            const gradesResponse = await fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`);
            if (!gradesResponse.ok) throw new Error('Failed to fetch grades data');
            const gradesData = await gradesResponse.json();
            setExistingGrades(gradesData);
            
            // Initialize edited grades state with existing grades
            const grades = {};
            gradesData.forEach(grade => {
            grades[grade.id] = {
                ca_mark: grade.ca_mark,
                exam_mark: grade.exam_mark
            };
            });
            setEditedGrades(grades);
            
            // Fetch modules delivered to the student's cohort
            const cohortModulesResponse = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortId}`);
            if (!cohortModulesResponse.ok) throw new Error('Failed to fetch cohort modules');
            const cohortModulesData = await cohortModulesResponse.json();
            setCohortModules(cohortModulesData);
            
            // Determine modules without grades (available for adding new grades)
            const gradedModuleCodes = gradesData.map(grade => {
            // Extract module code from URL
            return grade.module.split('/').filter(Boolean).pop();
            });
            
            const modulesWithoutGrades = cohortModulesData.filter(module => 
            !gradedModuleCodes.includes(module.code)
            );
            
            setAvailableModules(modulesWithoutGrades);
            
            // Set cohort in new grade state
            setNewGrade(prev => ({
            ...prev,
            cohort: studentData.cohort
            }));
            
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Error loading data. Please try again.');
            setLoading(false);
        }
        };
        
        fetchData();
    }, [student_id]);
    
    const handleUpdateGrade = async (gradeId) => {
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/grade/${gradeId}/`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedGrades[gradeId])
        });
        
        if (!response.ok) throw new Error('Failed to update grade');
        
        setError('');
        
        // Refresh grades data
        const gradesResponse = await fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`);
        if (!gradesResponse.ok) throw new Error('Failed to refresh grades data');
        const gradesData = await gradesResponse.json();
        setExistingGrades(gradesData);
        
        // Update message
        alert('Grade updated successfully!');
        } catch (err) {
        console.error('Error updating grade:', err);
        setError('Failed to update grade. Please try again.');
        }
    };
    
    const handleAddNewGrade = async (e) => {
        e.preventDefault();
        
        if (!newGrade.module) {
            setError('Please select a module');
            return;
        }
        
        try {
        const response = await fetch('http://127.0.0.1:8000/api/grade/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGrade)
        });
        
        if (!response.ok) throw new Error('Failed to add new grade');
        
        setError('');
        alert('New grade added successfully!');
        
        // Reset form
        setNewGrade({
            module: '',
            ca_mark: 0,
            exam_mark: 0,
            student: `http://127.0.0.1:8000/api/student/${student_id}/`,
            cohort: student.cohort
        });
        
        // Refresh data
        const gradesResponse = await fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`);
        if (!gradesResponse.ok) throw new Error('Failed to refresh grades data');
        const gradesData = await gradesResponse.json();
        setExistingGrades(gradesData);
        
        // Update available modules
        const gradedModuleCodes = gradesData.map(grade => {
            return grade.module.split('/').filter(Boolean).pop();
        });
        
        const modulesWithoutGrades = cohortModules.filter(module => 
            !gradedModuleCodes.includes(module.code)
        );
        
        setAvailableModules(modulesWithoutGrades);
        } catch (err) {
        console.error('Error adding grade:', err);
        setError('Failed to add grade. Please try again.');
        }
    };
    
    const handleInputChange = (gradeId, field, value) => {
        // Ensure value is within valid range (0-100)
        const numValue = parseInt(value);
        const validValue = isNaN(numValue) ? 0 : Math.min(100, Math.max(0, numValue));
        
        setEditedGrades(prev => ({
        ...prev,
        [gradeId]: {
            ...prev[gradeId],
            [field]: validValue
        }
        }));
    };
    
    const handleNewGradeChange = (field, value) => {
        // Ensure value is within valid range for marks (0-100)
        if (field === 'ca_mark' || field === 'exam_mark') {
        const numValue = parseInt(value);
        const validValue = isNaN(numValue) ? 0 : Math.min(100, Math.max(0, numValue));
        
        setNewGrade(prev => ({
            ...prev,
            [field]: validValue
        }));
        } else {
        setNewGrade(prev => ({
            ...prev,
            [field]: value
        }));
        }
    };
    
    const goBack = () => {
        navigate(`/student/${student_id}`);
    };
