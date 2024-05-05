import axios from 'axios';
import { useEffect,useState } from "react";

export default function Questionaire() {

    const [data,setData]=useState([]);
    const [systemUsed, setSystemUsed] = useState('');

    const  fetchQuestionData=  (questionData) => {
    
        if(questionData.answer_type ===1)
        {
            return ( 
           <>
            <label for={questionData.question}>{questionData.question} </label>
            <input type="number"
            name={questionData.question}
            placeholder={questionData.answers[0]}
            //value={companyID}
           // onChange={(e) => setCompanyID(e.target.value)}
            required/>
            </>
            )
        }
        else if(questionData.answer_type ===2)
        {
            return ( 
                <>
                <label for={questionData.question}>{questionData.question}</label>
                <select class="form-select" aria-label="Default select example" value ={systemUsed}  onChange={(e)=>setSystemUsed(e.target.value)}>
               {questionData.answers.map((answer, index) => {
                return(
                    <option value={answer} >{answer}</option>
                )
                
               })}  
                </select  > 
                 </>
                 )
        
        
        }
       
    }

    useEffect(()=>{
        const questionsUpdate=()=>
         {
          var companyID= localStorage.getItem('CompanyID');
        
          axios.get('http://localhost:3000/questions',{params:{companyID}}).then(res =>{
              console.log(res.data.questions.rows);
              setData(res.data.questions.rows);
            //   setUsers(res.data.questions.rows);
            //   setIsLoading(false);
            }).catch(err =>{
               console.log(err);
            });
         }
        //  questionsUpdateUpdate();
        questionsUpdate();
        
     },[])
    
    return (
        <>
        <div className="chart-container">
    {data.length > 0 && (
        <div >
           {data.map((questionData, index) => { // Skip the first column and its header
            return (
              <div key={index} className="chart-wrapper">
                {fetchQuestionData(questionData)}
              </div>
            );
          })}
        </div>
      )}
      </div>
        </>
        
    );

}