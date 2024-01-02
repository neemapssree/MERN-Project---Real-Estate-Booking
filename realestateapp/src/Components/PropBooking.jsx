import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from '../Config/AxiosInstance';
import { BASE_URL, TIMINGS } from '../Constants/constants';
import ModalView from './ModalView';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const PropBooking = () => {
  const {id}=useParams()
  const[singlePropData, setSinglePropData] = useState({});
  const[showModal, setShowModal]= useState();
  const[dateSlotData, setDateSlotData] = useState({startDate:'', endDate:''});  
  const[dropDownShow,setDropDownShow] = useState(false);    //time drop Down
  const[selectedTimings,setSelectedTimings] = useState([]);
  const[filterTimes, setFilterTimes] = useState();

  useEffect(()=> {
    getLatestFilterSlots();
  },[selectedTimings]);   //Dependent on the SelectedTimings changes

  useEffect(()=> {
    getSinglePropData();
  },[]);

  const getLatestFilterSlots = () => {
    if(selectedTimings.length===0){
      setFilterTimes(TIMINGS);
    }else {
      const tempArray = [];
      for(let slot of TIMINGS){
        let flag = false;
        for(let Sslot of selectedTimings){
          if(slot.id === Sslot.id){
            flag=true;
          }
        }
        if(!flag) {
          tempArray.push(slot);
        }
      }
      setFilterTimes(tempArray);
    }
  }
  
  const removeSelectedTiming = (index) => {
    const updatedSelectedTiming = [...selectedTimings];
    updatedSelectedTiming.splice(index,1);
    setSelectedTimings(updatedSelectedTiming);
  }

  const getSinglePropData = () => {
    AxiosInstance.get('/user/single-prop',{params:{propId:id}}).then((res) => {
        // console.log(res);
        setSinglePropData(res.data);        
       
    }).catch((error) => {
        console.log(error);
    })
  }

  const handleChangeDate = (e) => {
    setDateSlotData({...dateSlotData,[e.target.name]:e.target.value});
    console.log(dateSlotData);
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
      <p className='fw-bold'>Select Start Date</p>
      <input type='date' value={dateSlotData.startDate} name='startDate' onChange={handleChangeDate} />
      <p className='mt-3 fw-bold'>Select End Date</p>
      <input type='date' value={dateSlotData.endDate} name='endDate' onChange={handleChangeDate}  />
      <p className='mt-3 fw-bold'>Add Time Slots</p>
      <div className='cus-dropDown' onClick={()=>setDropDownShow(true)}>
        Select Timings
        {dropDownShow && (
          <div className='cus-options' onMouseLeave={() => setDropDownShow(false)}>
            <ul>
            {filterTimes.map((element, index)=>(
              <li onClick={(e)=>setSelectedTimings([...selectedTimings,element])}>{element.name}</li>              
            ))}
            </ul>
          </div>
        )}
      </div>
      <div className=''>
        {selectedTimings.length>0 ? (
          selectedTimings.map((element,index) => (
            <span  key={index} style={{margin:'5px',padding:'10px', border:'1px solid #000', borderRadius:'10px', backgroundColor:'#a5dbef'}}>
              {element.name}
              <button onClick={() => removeSelectedTiming(index)}>X</button>
            </span> 
          ))
          ) : (
          <span>No selected timings</span>
        )}
      </div>                                            

      <input type='submit' className='btn primaryBtn mt-4' value="Submit" />
    </ModalView>
    
    </>
  )
}

export default PropBooking