import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from '../Config/AxiosInstance';
import { BASE_URL } from '../Constants/constants';
import ModalView from './ModalView';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PropBooking = () => {
  const {id}=useParams()
  const[singlePropData, setSinglePropData] = useState({});
  const[showModal, setShowModal]= useState();
  const[timeSlotData, setTimeSlotData] = useState({startDate:'', endDate:''});  


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

  const handleChangeDate = (e) => {
    setTimeSlotData({...timeSlotData,[e.target.name]:e.target.value});
    console.log(timeSlotData);
  }

  return (
    <>    
    <div className='container-fluid propBanner'>
        <div className='row text-center align-content-center text-light singleProp' style={{backgroundImage:`URL(${BASE_URL}/properties/${singlePropData?.propImg})`}}>
            <div className='bannerText'>
                <h1>{singlePropData.propname}</h1>
                <h3 className='text-capitalize'>{singlePropData.state}</h3>
                <button className='btn primaryBtn mt-5 py-3 px-5' onClick={()=>setShowModal(true)}>Add Time Slot for Booking Views</button>
            </div>                               
        </div>
        <div className='row justify-content-center'>
            <div className='propDetails d-flex mx-auto px-5 py-4 text-center'>
              <div>       
                <h4 className='text-capitalize'>Location:</h4>
                <p>{singlePropData.propaddress}</p>
              </div>
              <div> 
                <h4 className='text-capitalize'>Type:</h4>
                <p>{singlePropData.type}</p>
              </div>
              <div> 
                <h4 className='text-capitalize'>No of units:</h4>
                <p>{singlePropData.propcount}</p>
              </div>                       
            </div>
        </div>        
    </div>
    <ModalView showModal={showModal} setShowModal={setShowModal} propname={singlePropData.propname}>
      <p>Select Start Date</p>
      <input type='date' value={timeSlotData.startDate} name='startDate' onChange={handleChangeDate} />
      <p>Select End Date</p>
      <input type='date' value={timeSlotData.endDate} name='endDate' onChange={handleChangeDate}  />
    </ModalView>
    
    </>
  )
}

export default PropBooking