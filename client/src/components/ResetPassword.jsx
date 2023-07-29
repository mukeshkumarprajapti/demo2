import React, {useState} from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink, useNavigate  } from 'react-router-dom'

const ResetPassword = () => {
 
    const navigate  = useNavigate();



  const [user, setUser] = useState({
    email:''
   });

   let name,  value;

   const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
   }
   
   const sandLink = async (e) => {
    e.preventDefault();

    const { email} = user;
    
    const res = await fetch('http://localhost:5000/forgetpassword', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         email
      }),
      credentials: "include"

    });

    const data = await res.json();



    if (res.status === 400 || !data ) {
      window.alert("email  Id not exist");
      console.log("email  Id not exist");
    } else{
      window.alert("Email sent, please check your email");
      console.log("Email sent, please check your email");
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
              <h3 className="fw-bold fs-1 text-center mb-3" >Enter your Email </h3>
              <form action="" method="POST">
                
                <div className="mb-3">
                  <label className="form-label">Email :</label>
                  <input type="email" className='form-control w-75' name='email'  id='email' value={user.email} onChange={handleInputs} autoComplete="off"/>
                </div>
                <button type="submit" onClick={sandLink} className="btn btn-primary">Send</button>
               

              </form>
              
            </div>
            
          </div>

        </div>
        
       </div>
     </section>
    </>
  )
}

export default ResetPassword