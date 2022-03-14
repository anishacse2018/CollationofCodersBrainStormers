import React from 'react';
import {useState,useEffect,useRef} from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import axios from 'axios';
import './Leaderboard.css';
import {db} from './firebase';
import Navbars from './Navbars';
function Leaderboard(){
  var codechefid,codeforcesid,name,leetcodeid;
  const[dis,setDis]=useState(false);
  const [li,setLi]=useState([]);
  const[nli,setNli]=useState([]);
  const[dist,setDist]=useState(false);
  const[dista,setDista]=useState(false);
  const[di,setDi]=useState(false);
  const[lim,setLim]=useState([]);
  const[total,setTotal]=useState([]);
  const[lima,setLima]=useState(false);
  const[o,setO]=useState(false);
  var count=0;
 
  function renderobj(codechefid,name){
    console.log(codechefid);
         axios.get(`https://competitive-coding-api.herokuapp.com/api/leetcode/${codechefid}`
     ).then(res=>{ 
       console.log(res);
         var obj={
           name:name,
           easy:res.data.easy_questions_solved,
           medium:res.data.medium_questions_solved,
           hard:res.data.hard_questions_solved,
           totalsolved:parseInt(res.data.easy_questions_solved)+parseInt(res.data.medium_questions_solved)+parseInt(res.data.hard_questions_solved)
         }
         console.log(obj);
          setLi((data) => [
            ...data,obj
          ]);
        
      })
  }
  function renderobjs(codeforcesid,name){
    axios.get(`https://competitive-coding-api.herokuapp.com/api/spoj/${codeforcesid}`
).then(res=>{ 
  console.log(res);
    var obj={
      name:name,
      score:res.data.rank,
      totalsolved:res.data.solved.length
    }
    console.log(obj);
     setNli((data) => [
       ...data,obj
     ]);
   
 })
}
function renderobss(leetcodeid,name){
  axios.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${leetcodeid}`
  ).then(res=>{ 
    console.log(res);
      var obj={
        name:name,
        rating:res.data.highest_rating,
        solved:res.data.fully_solved.count
      }
      console.log(obj);
       setLim((data) => [
         ...data,obj
       ]);
     
   })
}
const displaycf=()=>{
  setLim([]);
  db.collection('registeredusers').get().then(snapshot=>{
    var n=snapshot._delegate.docs.length;
   console.log(snapshot);
    for(var i=0;i<n;i++){
  leetcodeid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.leetcodeid.stringValue;
  name=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.name.stringValue;
  renderobss(leetcodeid,name);
 
}
}
).catch(error=>console.log(error))
setLima(true);
setDis(false);
setDist(false);
setDista(false);

}
 
  const display=()=>{
    setLi([]);
    db.collection('registeredusers').get().then(snapshot=>{
      var n=snapshot._delegate.docs.length;
     console.log(snapshot);
			for(var i=0;i<n;i++){
    codechefid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.codechefid.stringValue;
    name=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.name.stringValue;
    renderobj(codechefid,name);
   
  }
}
).catch(error=>console.log(error))

 setDis(true);
 setLima(false);
setDist(false);
setDista(false);

  }
  li.sort((a, b) => {
    return b.totalsolved - a.totalsolved;
  });
  const displays=()=>{
    setNli([]);
    db.collection('registeredusers').get().then(snapshot=>{
      var n=snapshot._delegate.docs.length;
     console.log(snapshot);
			for(var i=0;i<n;i++){
    codeforcesid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.codeforcesid.stringValue;
    name=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.name.stringValue;
    renderobjs(codeforcesid,name);
   
  }
}
).catch(error=>console.log(error))

 setDist(true);
 setLima(false);
setDis(false);
setDista(false);

  }
  async function renderob(codeforcesid,codechefid,leetcodeid,name){
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
  const displaysto=()=>{
    setTotal([]);
    db.collection('registeredusers').get().then(snapshot=>{
      var n=snapshot._delegate.docs.length;
   
      for(var i=0;i<n;i++){
    codeforcesid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.codeforcesid.stringValue;
    codechefid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.codechefid.stringValue;
    name=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.name.stringValue;
    leetcodeid=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.leetcodeid.stringValue;
    renderob(codeforcesid,codechefid,leetcodeid,name);
   
  }}
).catch(error=>console.log(error))

 setDista(true);
 setLima(false);
setDis(false);
setDist(false);

  }
  total.sort((a, b) => {
    return b.countofproblems - a.countofproblems;
  });
  
  lim.sort((a, b) => {
    return b.rating - a.rating;
  });
  nli.sort((a, b) => {
    return a.score - b.score;
  });


      return(
 <>
<div className='navbar'>
 <button className='coloring' onClick={display}>Leetcode</button>
 <button className='colorings' onClick={displays}>SPOJ</button>
 <button className='coloringsto' onClick={displaycf}>Codechef</button>
 <button className='coloringstoo' onClick={displaysto}>Leaderboard</button>
 
<Link to="/Profile"><button className='coloringstooo'>Profile</button></Link>
<Link to="/All" ><button className='colorkk'>Department</button></Link>
   
  
</div>


 {dist && (
   <>  
   <div style={{width:200,marginRight:"400px"}}>   
  <h1 style={{color:"white",fontFamily:"Apple Chancery, cursive",fontSize:"30px",marginLeft:"180px"}} >Spoj</h1>
  <img className="img-thumbnaills" src="https://pbs.twimg.com/profile_images/568733328090480640/B1rm7i-y_400x400.jpeg"></img>
 <table id="c">
    <thead>
    <tr>
    <th style={{color:"black"}}>Rank</th> 
<th style={{color:"black"}}>Name</th>  
<th style={{color:"black"}}>Global Rank</th>  
<th style={{color:"black"}}>Problems Solved</th> 
</tr>
                 {nli.map(finallist =>
                 <tr key={finallist.name}>
                   <td>{count=count+1}</td>
                   <td>{finallist.name}</td>
                  <td>{finallist.score}</td>
                  <td >{finallist.totalsolved}</td>
                  
                  </tr>
                    )}
                    </thead>
                    </table>
                    </div>
                    </>)}
                    {dis && (
   <>  
    <div style={{width:"200px",marginRight:"400px"}}>   
  <h1 style={{color:"white",fontFamily:"Apple Chancery, cursive",fontSize:"30px",marginLeft:"200px"}} >Leetcode</h1>
 <img className="img-thumbnails" src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"></img>
 <table id='c'>
    <thead>
    <tr>
    <th style={{color:"black"}}>Rank</th> 
<th style={{color:"black"}}>Name</th>  
<th style={{color:"black"}}>Easy</th> 
<th style={{color:"black"}}>Medium</th> 
<th style={{color:"black"}}>Hard</th> 
<th style={{color:"black"}}>Problems Solved</th> 
</tr>
                 {li.map(finallist =>
                 <tr key={finallist.name}>
                   <td>{count=count+1}</td>
                  <td>{finallist.name}</td>
                  <td>{finallist.easy}</td>
                  <td>{finallist.medium}</td>
                  <td>{finallist.hard}</td>
                  <td >{finallist.totalsolved}</td>
                  
                  </tr>
                    )}
                    </thead>
                    </table></div></>)}
                    {dista && (
   <>     
   <div style={{width:200,marginRight:"300px"}}> 
  <h1 style={{color:"white",fontFamily:"Apple Chancery, cursive",fontSize:"30px",marginLeft:"90px"}} >Leaderboard</h1>

 <table id='c'>
    <thead>
    <tr>
    <th style={{color:"black"}}>Rank</th> 
<th style={{color:"black"}}>Name</th>  
<th style={{color:"black"}}>Problems solved</th> 
</tr>
                 {total.map(finallist =>
                 <tr key={finallist.name}>
                   <td>{count=count+1}</td>
                  <td>{finallist.name}</td>
                  <td >{finallist.countofproblems}</td>
                  
                  </tr>
                    )}
                    </thead>
                    </table></div></>)}
                    {lima && (
   <>     
   <div style={{width:"200px",marginRight:"400px"}}> 
  <h1 style={{color:"white",fontFamily:"Apple Chancery, cursive",fontSize:"30px",marginLeft:"200px",marginTop:"100px"}} >Codechef</h1>
  <img className="img-thumbnail" src="https://avatars1.githubusercontent.com/u/11960354?s=460&v=4"/>
 <table id='c'>
    <thead>
    <tr>
    <th style={{color:"black"}}>Rank</th> 
<th style={{color:"black"}}>Name</th>  
<th style={{color:"black"}}>Rating</th> 
<th style={{color:"black"}}>Problems Solved</th>
</tr>
                 {lim.map(finallist =>
                 <tr key={finallist.name}>
                   <td>{count=count+1}</td>
                  <td>{finallist.name}</td>
                  <td >{finallist.rating}</td>
                  <td>{finallist.solved}</td>
                  </tr>
                    )}
                    </thead>
                    </table></div></>)}
 </>
      )
}
export default Leaderboard;