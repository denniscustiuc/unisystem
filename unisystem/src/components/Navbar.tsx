import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar () {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/degree">Degree</Link>
            <Link to="/cohort">Cohort</Link>
            <Link to="/module">Module</Link>
            <Link to="/student">Student</Link>
        </div>
    )

}
export default Navbar;