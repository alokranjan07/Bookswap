import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './Booklist.css'
function Booklist() {
  const [state,setState]=useState([]);

  useEffect(()=>{
   const fetchApi=async()=>{
    try {
      const res=await axios.fetch();
      const data=res.data.data;
      setState(data);

      
    } catch (error) {
      console.log(error,"error occured while fetching api")
    }
   }
    fetchApi();

  },[])
 


  return (
    <div> 
      <div className="heading">Booklist</div>
      <div className="card">
        {state.map((item)=>(
          div

        ))}

      </div>
    </div>
  )
}

export default Booklist