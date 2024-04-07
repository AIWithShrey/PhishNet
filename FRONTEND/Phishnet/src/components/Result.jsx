import React, {useState} from "react";
import Input from './Input'
import convertToJSON from "./DataHandler";

function Result(){
    const [jsonData, setJsonData] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleUrlInput= (urlInput)=>{
        
        setSubmitted(true);
    }

    return(
        <>
        <Input onSubmit={handleUrlInput}/>
        {submitted && jsonData&& (
            <div>
                <h1> Here are Your results: </h1>
                <p>Based on our search it looks like <u></u> is </p>
                <h2> Heres more information on your results:</h2>
                <hr/>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )}
        </>
    )

}


export default Result