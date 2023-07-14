import React, {useState} from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink, useNavigate  } from 'react-router-dom'

const Singup = () => {
  const navigate = useNavigate();
 

   const [user, setUser] = useState({
    name:'', email:'', phone:'', work:'', password:'', cpasswords:'' 
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

    const { name, email, phone, work, password, cpassword} = user;
    
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });

    const data = await res.json();

    if(res.status === 422 || !data ){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else{
      window.alert("Registration successfull");
      console.log("successfull Registration");
      navigate('/login');


      
    }
   
   }

   
  return (
    <>
     <section>
       <div className="container mt-5">
        <div className="card rounded shadow p-5 ">
          <div className="row  align-items-center">
            <div className="col-7 ">
              <h3 className="fw-bold fs-1 text-center mb-3" >Sign up</h3>
              <form action=" " method='POST' >
                <div className="mb-3">
                  <label className="form-label">Name :</label>
                  <input type="text" className='form-control w-75' name='name'  id='name' autoComplete="off" value={user.name} onChange={handleInputs}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email :</label>
                  <input type="email" className='form-control w-75' name='email'  id='email' autoComplete="off" value={user.email} onChange={handleInputs}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone :</label>
                  <input type="text" className='form-control w-75' name='phone'  id='phone' autoComplete="off" value={user.phone} onChange={handleInputs}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">work :</label>
                  <input type="text" className='form-control w-75' name='work'  id='work' autoComplete="off" value={user.work} onChange={handleInputs}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password :</label>
                  <input type="password" className='form-control w-75' name='password'  id='password' autoComplete="off" value={user.password} onChange={handleInputs}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Conform Password :</label>
                  <input type="password" className='form-control w-75' name='cpassword'  id='cpassword' autoComplete="off" value={user.cpassword} onChange={handleInputs}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={PostData} >Resistation</button>

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