import React, {useState} from "react";
import Input from './Input'
import convertToJSON from "./DataHandler";

function Result(){
    const [jsonData, setJsonData] = useState(null);
    const [submitted, setSubmitted] = useState(false);

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