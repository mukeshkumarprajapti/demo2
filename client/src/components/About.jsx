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
 

    
    
      const referralLink = `http://localhost:5173/singup?referralcode=${useData.referralCode}`
  return (
    <>
    <form method="GET" >
    <p className="pt-5 text-center text-capitalize">WELCOME {useData.name} </p>
    <h1 className="text-center mb-3">We Are About Page</h1>
    <h4 className="text-center mb-3">User Id : {useData.userId}</h4>
    <h4 className="text-center mb-3">Your referral link : <a href={referralLink} className="text-center">{referralLink}</a> </h4>
    <h4 className="text-center">Your referral code : {useData.referralCode} </h4>
    <h4 className="text-center">Your referral point : {useData.points} </h4>
    </form>
    
    </>
  )
}

export default About