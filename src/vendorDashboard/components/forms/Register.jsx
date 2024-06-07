import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {
  const [username, setUsername]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]= useState("");
  const [loading,setLoading]=useState(true);

  const handleSubmit=async(e)=>{
    e.preventDefault(); 
  try{
    const response=await fetch(`${API_URL}/vendor/register`,{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({username, email, password})
    })
    const data =await response.json();
    if(response.ok){
      console.log(data);
      alert("vendor register success")
      showLoginHandler()
    }

  }catch(error){
    console.error("Registration Failed",error);
    alert("Registration Failed")

  }
  }


  return (
    <div className="registerSection">
        <form class="formSection" onSubmit={handleSubmit}>
        <h3> Vendor Register</h3>
        <label>Username</label>
            <input type="text" name='usename' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='enter your name'/><br></br>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br></br>
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}placeholder='enter your password'/><br></br>
            <div className="btnSubmit">
                <button type='submit'>Submit</button><br></br><br></br>
            </div>
        </form>
    </div>
  )
}

export default Register