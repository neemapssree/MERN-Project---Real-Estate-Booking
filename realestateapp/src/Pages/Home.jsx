import React, { useEffect, useState } from 'react';
import '../main.css';
import HomeBanner from '../Components/HomeBanner';
import AxiosInstance from '../Config/AxiosInstance';
import PropsCard from '../Components/PropsCard';

const Home = () => {
  
  const [propData,setPropData] = useState([]);

  useEffect (() => {
    getAllProperties()
  },[])  

const getAllProperties =()=> {
    AxiosInstance.get('/user/getAllProperties').then((response) => {
        setPropData(response.data);
    }).catch((err) => {

    })
}

  return (
    <>
    <HomeBanner />
    <div className='container my-5'>
      <h2 className='my-4'>Latest Projects</h2>   
      <div className='row'>
        {propData.map((prop)=> <PropsCard data={prop} />) }
      </div>
    </div> 
    </>
    
  )
}

export default Home