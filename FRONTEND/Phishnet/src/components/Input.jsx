import React, {useState} from 'react'

function Input({onSubmit}){
    const [urlInput, setUrlInput] = useState("");
    //handles changes when input field has objects inside
    const handleChange = (e) => {
        setUrlInput(e.target.value);
    }
    // Grabs input value when button is pressed and clears field
    const handleSubmit = () => {
        fetch('/data', { // Update the URL and port to match your Express server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ urlInput }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle successful response if needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error if needed
        });

        // Clear the input field
        console.log("REachededededed")
        setUrlInput("");
    }
    return(
        <>
        <div className="text-box">
            <input 
                type="text"
                value={urlInput}
                onChange={handleChange}
                placeholder="What do you want to phish Today?"
                />
            <button
                className="submit-button"
                onClick={handleSubmit}
                >🎣</button>
        </div>
        </>
    )
}
export default Input