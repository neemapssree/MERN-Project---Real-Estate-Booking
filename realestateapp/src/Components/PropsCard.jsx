import React from 'react'
import { BASE_URL } from '../Constants/constants'

const PropsCard = ({data}) => {
  return (
    <div className='col-md-4'>
      <div className="card propsCard">
        <div style={{backgroundImage:`URL(${BASE_URL}/properties/${data.propImg})`,backgroundSize:'cover'}} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title mb-3">{data?.propname}</h3>
          <p className='fw-bold'>{data?.propaddress}</p>
          <p><span className='fw-bold'>State:</span> {data?.state}</p>
          <p><span className='fw-bold'>Type:</span> {data?.type}</p>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          <a href="#" className="btn primaryBtn">More Details</a>
        </div>
      </div>
    </div>
  )
}

export default PropsCard