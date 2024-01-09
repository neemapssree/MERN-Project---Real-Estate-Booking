import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from '../Config/AxiosInstance';
import { BASE_URL, BOOKING_CHARGE, TIMINGS } from '../Constants/constants';
import ModalView from './ModalView';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const PropBooking = () => {
  const {id}=useParams()
  const[singlePropData, setSinglePropData] = useState({});   //object 
  const[showModal, setShowModal]= useState();
  const[todayDate, setTodayDate]= useState();
  const[tomorrowDate, setTomorrowDate]= useState();
  const[dateSlotData, setDateSlotData] = useState({
    startDate:'', 
    endDate:''
  });  
  const[dropDownShow,setDropDownShow] = useState(false);    //time drop Down
  const[selectedTimings,setSelectedTimings] = useState([]);      //Array
  const[filterTimes, setFilterTimes] = useState(TIMINGS);
  const[inputDate, setInputDate] = useState();
  const[displaySlotData, setDisplaySlotData]=useState([]);
  const[bookingModal,setBookingModal]=useState(false);
  const[selectedSlot, setSelectedSlot]=useState(null);

  const getTodayDate = () => {
    const today = new Date();
    const tommorow = new Date();
    tommorow.setDate(today.getDate()+1);
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTomorrowDate = tommorow.toISOString().split('T')[0];
    setTodayDate(formattedDate);  
    setTomorrowDate(formattedTomorrowDate);    
  };  

  useEffect(()=> {
    getLatestFilterSlots();
  },[selectedTimings]);   //Dependent on the SelectedTimings changes

  useEffect(()=> {
    getSinglePropData();
    getTodayDate();
    getTimeSlotData(new Date());    
  },[]);

  const getTimeSlotData = (date=new Date()) => {
    AxiosInstance.get('/user/dayWiseTimeSlot',{params:{propId:id,date:date}}).then((res)=>{
      setDisplaySlotData(res.data);
      
    }).catch((err)=>{

    });
  }

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

  const createTimeSlot = () => {
    try{
      AxiosInstance.post('/admin/addTimeSlotData', {...dateSlotData,selectedTimings,propId:id}).then((res) => {
        setShowModal(false);
        setDateSlotData({
          startDate:'', 
          endDate:''
        });
        setSelectedTimings([]);
        toast.success("Slot added successfully");        
      })
    }catch(err){

    }
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

    <div className='container-fluid'>         
      <div className='w-50 mx-auto my-5 px-5 pt-3 pb-5' style={{border:"2px solid #000",borderRadius:"20px",background:"#04004d"}}>
        <h2 className='mb-5 text-light'>View Available Slots</h2>
        <div className='d-flex mb-4' style={{gap:"30px"}}>
          <button className='btn nullBtn w-50' onClick={()=>getTimeSlotData(todayDate)}>Get Today's Slots</button>
          <button className='btn nullBtn w-50' onClick={()=>getTimeSlotData(tomorrowDate)}>Get Tomorrow's Slots</button>
        </div>
        <h5 className='mt-5 mb-4 text-light'>Get Day Wise Time Slots</h5>
        <div className='d-flex mb-4' style={{gap:"30px"}}>
          <input type="text" className="w-50 dateStyle" placeholder="Select a Date"  value={inputDate} onChange={(e)=>setInputDate(e.target.value)} onFocus={(e)=>(e.target.type="date")} onBlur={(e)=>(e.target.type="text")}/>
          <button className="btn btn-light w-50" onClick={()=>inputDate && getTimeSlotData(new Date(inputDate))}>Search Time Slots</button>
        </div>
        <div className='slotView mt-5'>
          { displaySlotData.map((slot)=><span className={'slots'} key={slot.id} onClick={()=>{setBookingModal(true);setSelectedSlot(slot)}}>{slot.slot.name}</span> ) }
        </div>
        {/* {displaySlotData && displaySlotData.length > 0 && (
          <button className="btn primaryBtn mt-4">Book Now</button>   //show button only if theres slots
        )} */}
      </div>
    </div>

    {/* Booking Modal */}
    <ModalView showModal={bookingModal} setShowModal={setBookingModal} propname={singlePropData.propname} title={"Book Viewing for"}>
      <div className='modalProp mb-3' style={{backgroundImage:`URL(${BASE_URL}/properties/${selectedSlot?.property?.propImg})`,height:"250px",width:"100%"}}></div>    
          <div><strong>Property Name:</strong> {selectedSlot?.property?.propname}</div>          
          <div><strong>State:</strong> {selectedSlot?.property?.state}</div>
          <div><strong>Location:</strong> {selectedSlot?.property?.propaddress}</div>
          <div><strong>Date:</strong> {new Date(selectedSlot?.date).toString().slice(0,15)}</div>
          <div><strong>Time:</strong> {selectedSlot?.slot?.name}</div>
          <div><strong>Booking Charge:</strong> {BOOKING_CHARGE} AED</div>
          <button className="btn primaryBtn mt-4">Book Now</button>
    </ModalView>
  

    {/* Admin only */}
    <ModalView showModal={showModal} setShowModal={setShowModal} propname={singlePropData.propname} title={"Set Time Slots for Viewing"}>
      
      <p className='fw-bold'>Select Start Date</p>
      <input type='date' value={dateSlotData.startDate} min={todayDate} name='startDate' onChange={handleChangeDate} />
      <p className='mt-3 fw-bold'>Select End Date</p>
      <input type='date' value={dateSlotData.endDate} min={dateSlotData.startDate} name='endDate' onChange={handleChangeDate}  />
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
      <div className='selectedTimes'>
        {selectedTimings.length>0 ? (
          selectedTimings.map((element,index) => (
            <span  key={index} style={{margin:'5px',padding:'10px', border:'1px solid #000', borderRadius:'10px', backgroundColor:'#a5dbef'}}>
              {element.name}
              <button onClick={() => removeSelectedTiming(index)}>X</button>
            </span> 
          ))
          ) : (
          <span className='w-100'>No selected timings</span>
        )}
      </div>                                            

      <input type='submit' className='btn primaryBtn mt-4' value="Submit" onClick={createTimeSlot} />
    </ModalView>
    {/*End of Admin only */}
    
    </>
  )
}

export default PropBooking