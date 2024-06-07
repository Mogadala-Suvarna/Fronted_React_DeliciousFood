import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomeHandler}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const loginHandler=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
      })
      const data=await response.json();
      if(response.ok){
        alert('login success');
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken',data.token)   
        showWelcomeHandler()
      }
     
    }catch(error){
      console.error(error);


    }

  }
  return (
    <div className="loginSection">
      
        <form class="formSection" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br></br>
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br></br>
            <div className="btnSubmit">
                <button type="submit">Submit</button><br></br><br></br>
            </div>
        </form>
    </div>
  )
}

export default Login