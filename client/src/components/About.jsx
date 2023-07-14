import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'

const About = () => {
  

  const navigate = useNavigate();
  const [useData, setUserData] = useState({});

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
    <form method="GET" >
    <p className="pt-5 text-center text-capitalize">WELCOME {useData.name} </p>
    <h1 className="text-center">We Are About Page</h1>
    </form>
    
    </>
  )
}

export default About