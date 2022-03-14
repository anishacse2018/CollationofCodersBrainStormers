import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import {
	BrowserRouter as Router,
	Link
  } from "react-router-dom";
import Leaderboard  from './Leaderboard';
import {db} from './firebase';
import { Navigate } from "react-router-dom";
import pic from './coc.jpeg';
function Home(){
	var codechefiduser;
	function callsignup(){
		const signUpButton =document.getElementById('signUp');
		const container = document.getElementById('container');
		signUpButton.addEventListener('click', () => {
			container.classList.add("right-panel-active");
		});
	}
	function callsignin(){
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');
		signInButton.addEventListener('click', () => {
			container.classList.remove("right-panel-active");
		});
	}
	var flag=false

	function submitrender(e){
		e.preventDefault();
		console.log(emaillogin);
		localStorage.setItem('email',emaillogin);
		var res=localStorage.getItem('email');
		console.log(res);
        db.collection('registeredusers').get().then(snapshot=>{
			var n=snapshot._delegate.docs.length;
			for(var i=0;i<n;i++){
			console.log(snapshot._delegate.docs[i]._document.data.value.mapValue.fields.email.stringValue);
			if(snapshot._delegate.docs[i]._document.data.value.mapValue.fields.email.stringValue==emaillogin){
				 
				if(passwordlogin==snapshot._delegate.docs[i]._document.data.value.mapValue.fields.password.stringValue){
					console.log(true); 
					setShowLeader(true);
					setClick(true);
					setEmailLogin("");
					setPasswordLogin("");
					codechefiduser=snapshot._delegate.docs[i]._document.data.value.mapValue.fields.codechefid.stringValue
				  
				}else{
					  alert("Please enter correct login details");
				  }
			  }}
			  
		}
		).catch(error=>console.log(error))
	
	}
	
     const [name,setName]=useState("");
	 const[email,setEmail]=useState("");
	 const[password,setPassword]=useState("");
	 const[codechefid,setCodechefId]=useState("");
	 const[codeforcesid,setCodeforcesId]=useState("");
	 const[emaillogin,setEmailLogin]=useState("");
	 const[passwordlogin,setPasswordLogin]=useState("");
	 const[showleader,setShowLeader]=useState(false);
	 const[leet,setLeet]=useState("");
	 const[click,setClick]=useState(false);
	 const[dept,setDept]=useState("");
	 const[o,setO]=useState(false);
	 const handleSubmit=(e)=>{
		e.preventDefault();
		db.collection("registeredusers").add({
			name:name,
			email:email,
			password:password,
			codechefid:codechefid,
			codeforcesid:codeforcesid,
			deptartment:dept,
		    leetcodeid:leet
		}).then(()=>{
			alert("Submitting form..Pls sign in to continue");
		}).catch((error)=>{
			alert(error.message);
		}

		);
		setName("");
		setEmail("");
		setPassword("");
		setCodechefId("");
		setPassword("");
		setCodeforcesId("");
		setDept("");
         setLeet("");
		 
	 };
      return(
		  <div>
			 
			  
        {!click &&
			( 
				<>
		<div style={{background:"linear-gradient(90deg, rgba(243, 72, 104,1) 20.328125854333244%,rgba(242, 71, 104,1) 20.328125854333244%,rgba(158, 0, 236,1) 80.32812823851904%)"}}>
		<img className="dis" src={pic} />
	<h1 style={{color:"white",fontSize:"50px",fontFamily:"Apple Chancery, cursive",marginLeft:"160px",marginTop:"-80px"}}>COLLATION OF CODERS</h1>
<div class="container" id="container">
	<div class="form-container sign-up-container">
	
		<form action="#" onSubmit={handleSubmit}>
			<h1>Create Account</h1>
			
			<input type="text" placeholder="Name" value={name} onChange={
				(e)=>setName(e.target.value)
			} />
			<input type="email" placeholder="Email" value={email} 
			  onChange={
				  (e)=>setEmail(e.target.value)
			  }
			/>
			<input type="password" placeholder="Password" value={password} 
			onChange={
				(e)=>setPassword(e.target.value)
			}
			/>
            <input type="text" placeholder="Leetcode Id" value={codechefid}
			onChange={
				(e)=>setCodechefId(e.target.value)
			}
			/>
            <input type="text" placeholder="SPOJ Id" value={codeforcesid}
			onChange={
				(e)=>setCodeforcesId(e.target.value)
			}/>
			
			<input type="text" placeholder="Codechef Id" value={leet}
			onChange={
				(e)=>setLeet(e.target.value)
			}/>
			
			
			<input type="text" placeholder="Department " value={dept}
			onChange={
				(e)=>setDept(e.target.value)
			}
			
			/>
			
			<button onClick={handleSubmit}>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form >
			<h1>Sign in</h1>
			
			<input type="email" placeholder="Email" value={emaillogin}
			onChange={
				(e)=>setEmailLogin(e.target.value)
			}
			/>
			<input type="password" placeholder="Password" value={passwordlogin}
			  onChange={
				  (e)=>setPasswordLogin(e.target.value)
			  }
			 
			/>
			<a href="#">Forgot your password?</a>
		<button onClick={submitrender}>Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn" onClick={callsignin}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp" onClick={callsignup}>Sign Up</button>
			</div>
		</div>
	</div>
</div>
</div>
</>)
}   
{showleader && (
	<>
	
	<Navigate to="/Leaderboard" replace={true} />
</>
)}

		 
		 </div>
      )
}
export default Home;