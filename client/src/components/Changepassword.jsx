import React, {useEffect, useState} from 'react'
import avatar from "../images/avatar_3.jpg"
import { NavLink, useNavigate, useParams  } from 'react-router-dom'

const Changepassword = () => {
    const navigate  = useNavigate();



    const [user, setUser] = useState({
      oldpassword:'', newpassword:'' 
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
  
      const { oldpassword, newpassword} = user;
      
      const res = await fetch('http://localhost:5000/changepassword', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
           oldpassword, newpassword
        }),
        credentials: "include"
  
      });
  
      const data = await res.json();
  
  
  
      if (res.status === 400 || !data ) {
        window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
      } else{
        window.alert("login successfull");
        console.log("login done");
        navigate('/')
       
        
  
        
      }
     
     }


     const callAboutPage = async () => {
        try {
          const res = await fetch('http://localhost:5000/changepassword',{
            method: 'GET',
            headers: {
               'Accept': 'application/json',
                "Content-Type" : 'application/json'
              },
              credentials: "include"
          });
    
          const data = await res.json();
          console.log(data);
          setUserData(data);
    
          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }
    
    
        } catch(err) {
          console.log(err);
          navigate('/login');
        }
      }
    
      useEffect(() => {
        callAboutPage();
      }, []);
     
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
                  <input type="password" className='form-control w-75' name='oldpassword'  id='oldpasword' value={user.oldpasswoed} onChange={handleInputs} autoComplete="off"/>
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