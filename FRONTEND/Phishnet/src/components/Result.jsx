import React, {useState} from "react";
import Input from './Input'
import convertToJSON from "./DataHandler";

function Result(){
    const [jsonData, setJsonData] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            fetch('/data') // Assuming this is the endpoint for fetching data from your Express.js backend
                .then(response => response.json())
                .then(data => {
                    console.log('Data from server:', data);
                    setJsonData(data); // Set the received data to state
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [submitted]);
    
    const handleUrlInput= (urlInput)=>{
        const jsonData = convertToJSON(urlInput);
        setJsonData(jsonData);
        setSubmitted(true);
    }

    return(
        <>
        
        <Input onSubmit={handleUrlInput}/>
        {submitted && jsonData&& (
            <div>
                <h1> Here are Your results: </h1>
                <p>Based on our search it looks like <u>{jsonData.suspect}</u> is {jsonData.result}</p>
                <h2> Heres more information on your results:</h2>
                <hr/>
                <ul>
                    <li>{jsonData.reason1}</li>
                    <li>{jsonData.reason2}</li>
                    <li>{jsonData.reason3}</li>
                </ul>
            </div>
        )}

        </>
    )

}


export default Result