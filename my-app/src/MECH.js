import React, { useState } from 'react';
import axios from 'axios';
import {db} from './firebase';
import './CSE.css';
function MECH(){
    const[total,setTotal]=useState([]);
    const[dis,setDis]=useState(false);
    var count=0;
    var names,codechefid,codeforcesid,leetcodeid;
  
   async function renderob(codechefid,codeforcesid,leetcodeid,name){
    count=0;
    var obj={
      name:name,
     countofproblems:count,
    }
    console.log(codeforcesid,codechefid,leetcodeid);
    var res= await axios.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${leetcodeid}`
    ).then(res=>{ 
        
        obj.countofproblems=res.data.fully_solved.count;
        
     })
   var res= await axios.get(`https://competitive-coding-api.herokuapp.com/api/leetcode/${codechefid}`
    ).then(res=>{ 
        
        obj.countofproblems+=parseInt(res.data.easy_questions_solved)+parseInt(res.data.medium_questions_solved)+parseInt(res.data.hard_questions_solved)
        
     })
    var res= await axios.get(`https://competitive-coding-api.herokuapp.com/api/spoj/${codeforcesid}`
    ).then(res=>{ 
     console.log(res);
      
         obj.countofproblems+=res.data.solved.length;
       
        
        
         setTotal((data) => [
           ...data,obj
         ]);
       
     })
      }
      const display=()=>{
        setTotal([]);
    db.collection('registeredusers').get().then(snapshot=>{
      var n=snapshot._delegate.docs.length;
   
	for(var i=0;i<n;i++){
 if('MECH'==snapshot._delegate.docs[i]._document.data.value.mapValue.fields.deptartment.stringValue){
    codeforcesid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.codeforcesid.stringValue;
    codechefid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.codechefid.stringValue;
    names=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.name.stringValue;
    leetcodeid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.leetcodeid.stringValue;
    renderob(codechefid,codeforcesid,leetcodeid,names);
     
      
   
  
  
   
  }
  }}
).catch(error=>console.log(error))
setDis(true);
}
total.sort((a, b) => {
    return b.countofproblems - a.countofproblems;
  });
 
    return(
        <>
{!dis && (<button style={{backgroundColor:"white",color:'deeppink',fontWeight:"bold"}} onClick={display}>CLICK TO VIEW MECH LEADERBOARD</button>)}   
  {dis && (<>
  <div style={{marginRight:"600px"}}>
  <h1 style={{color:"white",fontFamily:"Apple Chancery, cursive",fontSize:"30px",marginLeft:"250px"}} >MECH LEADERBOARD</h1>

 <table id='f'>
    <thead>
    <tr>
    <th style={{color:"black"}}>Rank</th> 
<th style={{color:"black"}}>Name</th>  
<th style={{color:"black"}}>No. of problems solved</th> 
</tr>
                 {total.map(finallist =>
                 <tr key={finallist.name}>
                   <td>{count=count+1}</td>
                  <td>{finallist.name}</td>
                  <td >{finallist.countofproblems}</td>
                  
                  </tr>
                    )}
                    </thead>
                    </table>
                    </div>
                    </>
                    )}
                    
               </>    
                    
    )
}
export default MECH;