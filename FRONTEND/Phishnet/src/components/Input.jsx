import React, { useState } from 'react';

function Input({ onSubmit }) {
  const [urlInput, setUrlInput] = useState("");

  const handleChange = (e) => {
    setUrlInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urlInput }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok'); 
      }

      const data = await response.json();
      console.log('Success:', data);
      // Call the onSubmit prop if it's provided
      onSubmit && onSubmit(data);

    } catch (error) {
      console.error('Error:', error);
      // Handle errors appropriately, e.g., display an error message
    } finally {
      // Clear the input field
      setUrlInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Wrap in a form */}
      <div className="text-box">
        <input 
          type="text"
          value={urlInput}
          onChange={handleChange}
          placeholder="What do you want to phish Today?"
        />
        <button type="submit" className="submit-button">🎣</button>
      </div>
    </form>
  );
}

export default Input;
