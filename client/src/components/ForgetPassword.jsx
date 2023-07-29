import React, {useEffect, useState} from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink, useNavigate, useParams }  from 'react-router-dom'

const ForgetPassword = () => {
  const navigate = useNavigate()

  const {id, token} = useParams();

  const [password, setPassword] = useState("");

  const [massage, setMassage] = useState('');


  const userValid = async () => {
    const res = await fetch(`http://localhost:5000/forgetpassword/${id}/${token}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
      
     });

     const data = await res.json();

     if(data.status === 201){
      console.log('user valid')
     }else{
      navigate('')
     }

  }

  

   const handleInputs = (e) => {
    setPassword(e.target.value)
   }


   const sendpassword = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/${id}/${token}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         password
      }),
      credentials: "include"

    });

    const data = await res.json();

     if(data.status === 201){
      setPassword("")
      setMassage(true)
     }else{
      res.status(401).json({status:401, error:"token Expired generate new Link"})
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

                {massage ? <p style={{color: 'green', fontWeight: 'bold'}}>password Successfully Update</p>: " "}
                
                <div className="mb-3">
                  <label className="form-label">New password :</label>
                  <input type="password" className='form-control w-75' name='password'  id='password' value={password} onChange={handleInputs} autoComplete="off"/>
                </div>
                <button type="submit" onClick={sendpassword} className="btn btn-primary">Send</button>
               

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