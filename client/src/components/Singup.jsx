import React from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink } from 'react-router-dom'

const Singup = () => {
  return (
    <>
     <section>
       <div className="container mt-5">
        <div className="card rounded shadow p-5 ">
          <div className="row  align-items-center">
            <div className="col-7 ">
              <h3 className="fw-bold fs-1 text-center mb-3" >Sign up</h3>
              <form action="" >
                <div className="mb-3">
                  <label className="form-label">Name :</label>
                  <input type="text" className='form-control w-75' name='name'  id='name' autoComplete="off"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email :</label>
                  <input type="email" className='form-control w-75' name='email'  id='email' autoComplete="off"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone :</label>
                  <input type="text" className='form-control w-75' name='phone'  id='phone' autoComplete="off"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">work :</label>
                  <input type="text" className='form-control w-75' name='work'  id='work' autoComplete="off" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password :</label>
                  <input type="password" className='form-control w-75' name='password'  id='password' autoComplete="off"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Conform Password :</label>
                  <input type="password" className='form-control w-75' name='cpassword'  id='cpassword' autoComplete="off"/>
                </div>
                <button type="submit" className="btn btn-primary">Resistation</button>

              </form>
              
            </div>
            <div className="col-5 ">
              <img src={avatar} className="img-fluid mb-5"alt="" />
              <NavLink to="/login" className="text-decoration-none fs-4 text-danger">I am already resgister</NavLink>
            </div>
          </div>

        </div>
        
       </div>
     </section>
    </>
  )
}

export default Singup