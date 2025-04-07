import { useState } from "react";

function HomePage () {
    const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected:', event.target.value);
  };

  return (
    <div>
      <label htmlFor="options">Choose an option:</label>
      <select id="options" value={selectedOption} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
}

export default HomePage;