import React, {useState} from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink, useNavigate  } from 'react-router-dom'

const Login = () => {
  const navigate  = useNavigate();


  const [user, setUser] = useState({
    email:'', password:'' 
   });

   let name,  value;

   const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
   }
   
   const PostData = async (e) => {
    e.preventDefault();

    const { email, password} = user;
    
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         email, password
      })
    });

    const data = await res.json();

    if (data.status === 400 || !data ) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else{
      window.alert("login successfull");
      console.log("login done");
      navigate('/')
      

      
    }
   
   }

  return (
    <>
     <section>
       <div className="container mt-5">
        <div className="card rounded shadow p-5 ">
          <div className="row  align-items-center">
          <div className="col-7 text-center">
              <img src={avatar} className="img-fluid mb-5"alt="" /><br />
              <NavLink to="/singup" className="text-decoration-none fs-4 text-danger ">Creat an Account</NavLink>
            </div>
            <div className="col-5 ">
              <h3 className="fw-bold fs-1 text-center mb-3" >Sign In</h3>
              <form action="" method="POST">
                
                <div className="mb-3">
                  <label className="form-label">Email :</label>
                  <input type="email" className='form-control w-75' name='email'  id='email' value={user.email} onChange={handleInputs} autoComplete="off"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password :</label>
                  <input type="password" className='form-control w-75' name='password'  id='password' value={user.password} onChange={handleInputs} autoComplete="off"/>
                </div>
                <button type="submit" onClick={PostData} className="btn btn-primary">Log In</button>

              </form>
              
            </div>
            
          </div>

        </div>
        
       </div>
     </section>
    </>
  )
}

export default Login