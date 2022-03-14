import React, { useState } from "react";
import axios from 'axios';
import {db} from './firebase';
import './Profile.css';
function Profile(){
    const[dis,setDis]=useState(false);
    const[total,setTotal]=useState([]);
    var names,codechefid,codeforcesid,leetcodeid;
    var count=0;
    async function renderob(codechefid,codeforcesid,leetcodeid,name){
     count=0;
     var obj={
       name:name,
       codechef:count,
       leetcode:count,
       spoj:count,
      countofproblems:count,
     }
     console.log(codeforcesid,codechefid,leetcodeid);
     var res= await axios.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${leetcodeid}`
     ).then(res=>{ 
         obj.codechef=res.data.fully_solved.count;
         obj.countofproblems=res.data.fully_solved.count;
         
      })
    var res= await axios.get(`https://competitive-coding-api.herokuapp.com/api/leetcode/${codechefid}`
     ).then(res=>{ 
         obj.leetcode=parseInt(res.data.easy_questions_solved)+parseInt(res.data.medium_questions_solved)+parseInt(res.data.hard_questions_solved)
         obj.countofproblems+=parseInt(res.data.easy_questions_solved)+parseInt(res.data.medium_questions_solved)+parseInt(res.data.hard_questions_solved)
         
      })
     var res= await axios.get(`https://competitive-coding-api.herokuapp.com/api/spoj/${codeforcesid}`
     ).then(res=>{ 
      console.log(res);
        obj.spoj=res.data.solved.length;
          obj.countofproblems+=res.data.solved.length;
          setTotal((data) => [
            ...data,obj
          ]);
        
      })
       }
    const disp=()=>{
        db.collection('registeredusers').get().then(snapshot=>{
            var n=snapshot._delegate.docs.length;
            setTotal([]);
            var resu=localStorage.getItem('email');
          for(var i=0;i<n;i++){
            
       if(resu==snapshot._delegate.docs[i]._document.data.value.mapValue.fields.email.stringValue){
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
    
  return(
     <>
  
    {!dis && (<button style={{backgroundColor:"white",color:'deeppink',fontWeight:"bold"}} onClick={disp}>CLICK TO VIEW PROFILE</button>)} 
    {dis && (<>
    <div style={{marginLeft:"40px"}}>
  <h1 style={{color:"white",fontFamily:"Apple Chancery, cursive",fontSize:"30px",textAlign:"center"}} >Profile</h1>
  <div className="grid-container">
  {total.map(finallist=><>
   <div className="item1" style={{fontFamily:"Apple Chancery, cursive"}}>{finallist.name}<br></br><img src="https://image3.mouthshut.com/images/imagesp/925716680s.jpg"></img></div>
  <div className="item2" style={{fontFamily:"Apple Chancery, cursive"}}><img className="img-thumbnaili" src="https://avatars1.githubusercontent.com/u/11960354?s=460&v=4"></img> <br></br>{finallist.codechef}</div>
  <div className="item3" style={{fontFamily:"Apple Chancery, cursive"}}><img className="img-thumbnaili" src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"></img><br></br>{finallist.leetcode}</div>  
  <div className="item4" style={{fontFamily:"Apple Chancery, cursive"}}><img className="img-thumbnaili" src="https://pbs.twimg.com/profile_images/568733328090480640/B1rm7i-y_400x400.jpeg"></img><br></br>{finallist.spoj}</div>
  <div className="item5" style={{fontFamily:"Apple Chancery, cursive"}}>Total<br></br>{finallist.countofproblems}</div>
  
   </>
   )}
   </div>
   </div>
   </>)
}
   
  </> )   
}
export default Profile;







