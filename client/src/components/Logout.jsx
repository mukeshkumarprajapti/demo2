import React, { useEffect } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate();
 
    useEffect(() => {
        fetch('http://localhost:5000/logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type" : "application/json"
            },
            credentials: "include"
        }).then((res) => {
            navigate('/login');
            if(res.status != 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        });
    })

  return (
    <>
    
    <h1 className="pt-5 text-center">We Are Logout</h1>
    </>
  )
}

export default Logout