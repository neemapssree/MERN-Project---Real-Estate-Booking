import React, { useState } from 'react'

const AddPropertyForm = () => {

    const [formValue, setFormValue] = useState({
        propname:'',
        state:'',
        type:'',
        propcount:'',
        propaddress:'',
        propimage:null,
    });

    const [selectedImage, setSelectedImage] = useState('');

    const onChange = (e) => {        
        setFormValue({...formValue, [e.target.name]:e.target.value });
        if(e.target.name === 'propimage'){
            e.target?.files[0]? setSelectedImage(URL?.createObjectURL(e.target?.files[0])):selectedImage(null);
        }
    }

  return (
    <div className='container my-5'>
        <form className="row gx-3 gy-2 align-items-center">
        <div className="col-sm-6">
            <label for="propname" className='mb-3'>Property Name</label>
            <input type="text" value={formValue.propname} onChange={onChange} className="form-control" id="propname" name="propname" placeholder="Enter Property Name"/>
        </div>
        <div className="col-sm-6">
            <label for="state" className='mb-3'>State</label>
            <select className="form-select" id="state" name="state">
            <option selected>Choose the state</option>
            <option value="dubai">Dubai</option>
            <option value="abu dhabi">Abu Dhabi</option>
            <option value="sharjah">Sharjah</option>
            </select>
        </div>
        <div className="col-sm-6">
            <label for="type" className='my-3'>Unit Type</label>
            <select className="form-select" id="type" name="type">
            <option selected>Choose the type</option>
            <option value="apartments">Apartments</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            </select>
        </div>
        <div className="col-sm-6">
            <label for="propcount" className='my-3'>Available Number of Units</label>
            <input type="number" value={formValue.propcount} className="form-control" id="propcount" name="propcount" placeholder="Enter Property Name" />
        </div>
        <div className="col-12">
            <label for="propaddress" className='my-3'>Location Address</label>
            <textarea className="form-control" value={formValue.propaddress} id="propaddress" name="propaddress" placeholder="Enter Property Address" />
        </div>
        <div className="col-12">
            <label for="propimage" className='my-3'>Property Featured Image</label>
            <input type="file" onChange={onChange} className="form-control" id="propimage" name="propimage" placeholder="Upload Property Featured Image" />
        </div>
        {/* <div className="col-12">    
            <label className='my-3'>Budget</label>
            <div className='inputGroup'>
                <input type="number" className="form-control" id="minbudget" name="minbudget" placeholder="Min Budget" />
                <input type="number" className="form-control" id="maxbudget" name="maxbudget" placeholder="Max Budget" />
            </div>    
        </div> */}
        <div className="col-auto d-flex" style={{gap:'30px'}}>
            <button type="submit" className="btn primaryBtn mt-4">Submit</button>
            <button type="reset" className="btn btn-primary mt-4">Reset</button>
        </div>
        </form>
        {selectedImage && <img src={selectedImage} style={{height: '100px'},{width: '100px'}}></img>}
    </div>
    
  )
}

export default AddPropertyForm