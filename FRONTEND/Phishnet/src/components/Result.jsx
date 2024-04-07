import React from "react";


function Result({data}){
    return(
        <>
        {data && (
             <div>
             <h1> Here are Your results: <u>{data[0].VALID}</u>: </h1>
             <h2> Heres more information on your results:</h2>
             <hr/>
             <p>To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them. To die—to sleep,
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to: 'tis a consummation
Devoutly to be wish'd. To die, to sleep;
To sleep, perchance to dream—ay, there's the rub:
For in that sleep of death what dreams may come,
When we have shuffled off this mortal coil,
Must give us pause—there's the respect
That makes calamity of so long life.</p>
         </div>
            
        )}
 
           
        
        </>
    )

}


export default Result