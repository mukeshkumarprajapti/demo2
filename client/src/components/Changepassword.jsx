import React, {useEffect, useState} from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink, useNavigate, useParams  } from 'react-router-dom'

const Changepassword = () => {
  const navigate  = useNavigate();

  const [user, setUser] = useState({
    currentpassword:'', newpassword:'' 
   });

   let name,  value;

   const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
   }
   
   const changePassword = async (e) => {
    e.preventDefault();

    const { currentpassword, newpassword} = user;
    const token = localStorage.getItem('jwtoken');
    try {
         // Get the stored token
        const response = await fetch('http://localhost:5000/updatepassword', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Include the JWT token in the request headers
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            currentpassword,
            newpassword,
          }),
          credentials: "include"
        });
  
        const data = await response.json();
        console.log(data.message);
        navigate('/');
      } catch (error) {
        console.error('An error occurred:', error);
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
              <h3 className="fw-bold fs-1 text-center mb-3" >Change your password </h3>
              <form action="" method="POST">
                
                <div className="mb-3">
                  <label className="form-label">Current Password :</label>
                  <input type="password" className='form-control w-75' name='currentpassword'  id='currentpassword' value={user.currentpassword} onChange={handleInputs} autoComplete="off"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password :</label>
                  <input type="password" className='form-control w-75' name='newpassword'  id='newpasword' value={user.newpasswoed} onChange={handleInputs} autoComplete="off"/>
                </div>
                <button type="submit" onClick={changePassword} className="btn btn-primary">Send</button>
               

              </form>
              
            </div>
            
          </div>

        </div>
        
       </div>
     </section>
    </>
  )
}

export default Changepassword