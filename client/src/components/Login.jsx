import React from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink } from 'react-router-dom'

const Login = () => {
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
              <form action="" >
                
                <div className="mb-3">
                  <label className="form-label">Email :</label>
                  <input type="email" className='form-control w-75' name='email'  id='email' autoComplete="off"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password :</label>
                  <input type="password" className='form-control w-75' name='password'  id='password' autoComplete="off"/>
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>

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