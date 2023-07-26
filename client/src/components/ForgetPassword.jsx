import React, {useEffect, useState} from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink, useNavigate, useParams }  from 'react-router-dom'

const ForgetPassword = () => {
  const navigate = useNavigate()

  const {id, token} = useParams();

  const userValid = async () => {
    const res = await fetch(`http://localhost:5000/resetpassword/${id}/${token}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
      
     });

     const data = await res.json();

     if(data.status === 201){
      console.log('user valid')
     }else{
      navigate('')
     }

  }

  useEffect(() =>{
    userValid()
  },[])


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
              <h6 className="fw-bold fs-1 text-center mb-3" >Enter your New password </h6>
              <form action="" method="POST">
                
                <div className="mb-3">
                  <label className="form-label">New password :</label>
                  <input type="password" className='form-control w-75' name='password'  id='password'   autoComplete="off"/>
                </div>
                <button type="submit"  className="btn btn-primary">Send</button>
               

              </form>
              
            </div>
            
          </div>

        </div>
        
       </div>
     </section>
    </>
  )
}

export default ForgetPassword