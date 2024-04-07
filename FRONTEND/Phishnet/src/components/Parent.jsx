import React, {useState} from "react";
import Input from "./Input";
import Result from './Result';
function Parent() {
    const [data, setData] = useState(null);
  
    const handleUrlInput = (urlInputData) => {
      setData(urlInputData); 
    };
  
    return (
      <div> 
        <Input onSubmit={handleUrlInput} />
        <Result data={data} /> 
      </div>
    );
  }
  
  export default Parent;