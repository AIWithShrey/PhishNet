import React, {useState} from 'react'
function Input({onSubmit}){
    const [urlInput, setUrlInput] = useState("");
    //handles changes when input field has objects inside
    const handleChange = (e) => {
        setUrlInput(e.target.value);
    }
    // Grabs input value when button is pressed and clears field
    const handleSubmit = () => {
        onSubmit(urlInput);
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