import React, {useEffect, useState} from 'react'

const Contact = () => {

  const [useData, setUserData] = useState({});

  const callContactPage = async () => {
    try {
      const res = await fetch('http://localhost:5000/getdata',{
        method: 'GET',
        headers: {
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
      setUserData(data);
    
    }
  }

  useEffect(() => {
    callContactPage();
  }, []);
 


  return (
    <>
    <form method='GET'>
    <p className="pt-5 text-center">WELCOME</p>
    <h1 className="text-center">We Are Contact page</h1>
    <h2 className="text-center">Mobile Number:  {useData.phone}</h2>
    <h2 className="text-center">Email  :  {useData.email}</h2>
    </form>
    </>
  )
}

export default Contact