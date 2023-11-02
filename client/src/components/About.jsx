import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'


const About = () => {
  

  const navigate = useNavigate();
  const [userData, setuserData] = useState([]);
  const [users, setusers] = useState([]);

 
  const callAboutPage = async () => {
    try {
      const res = await fetch('http://localhost:5000/about',{
        method: 'GET',
        headers: {
           'Accept': 'application/json',
            "Content-Type" : 'application/json'
          },
          credentials: "include"
      });

      const data = await res.json();
      setuserData(data);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }


    } catch(err) {
      console.log(err);
      navigate('/login');
    }

    const res = await fetch('http://localhost:5000/users', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
      
     });

     const data = await res.json();
     setusers(data)

     if(data.status === 201){
      console.log('user valid')
     }

  }
  
  

  useEffect(() => {
    callAboutPage();
  }, []);
 

    
    
      const userLink = `http://localhost:5173/singup?referralcode=${userData.referralCode}`;
  return (
    <>
    <form method="GET" >
    <p className="pt-5 text-center text-capitalize">WELCOME {userData.name} </p>
    <h1 className="text-center mb-3">We Are About Page</h1>
    <h4 className="text-center mb-3">user Id : {userData.userId}</h4>
    <h4 className="text-center mb-3">Your user link : <a href={userLink} className="text-center">{userLink}</a> </h4>
    <h4 className="text-center">Your referralcode : {userData.referralCode} </h4>
    <h4 className="text-center">Your referral point : {userData.points} </h4>
    
    <table className="table">
        <thead>
          <tr>
            <th>userId</th>
            <th>name</th>
            <th>Email</th>
            <th>referredBy</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.referredUserId}</td> 
            </tr>
          ))}
        </tbody>
      </table>
   
      
    </form>
    
    </>
  )
  
}

export default About

