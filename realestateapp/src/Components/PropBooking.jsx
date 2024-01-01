import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from '../Config/AxiosInstance';
import { BASE_URL } from '../Constants/constants';

const PropBooking = () => {
  const {id}=useParams()
  const[singlePropData, setSinglePropData] = useState({});

  useEffect(()=> {
    getSinglePropData();
  },[]);

  const getSinglePropData = () => {
    AxiosInstance.get('/user/single-prop',{params:{propId:id}}).then((res) => {
        // console.log(res);
        setSinglePropData(res.data);
        
       
    }).catch((error) => {
        console.log(error);
    })
  }

  return (    
    <div className='container-fluid propBanner'>
        <div className='row text-center align-content-center text-light singleProp' style={{backgroundImage:`URL(${BASE_URL}/properties/${singlePropData?.propImg})`}}>
            <div className='bannerText'>
                <h1>{singlePropData.propname}</h1>
                <h3 className='text-capitalize'>{singlePropData.state}</h3> 
            </div>                               
        </div>
        <div className='row justify-content-center'>
            <div className='propDetails d-flex mx-auto px-5 py-4 text-center'>            
                <p><strong>Location:</strong><br />{singlePropData.propaddress}</p>
                <p><strong>Type:</strong><br />{singlePropData.type}</p>
                <p><strong>Available no of units:</strong><br />{singlePropData.propcount}</p>                        
            </div>
        </div>        
    </div>
  )
}

export default PropBooking