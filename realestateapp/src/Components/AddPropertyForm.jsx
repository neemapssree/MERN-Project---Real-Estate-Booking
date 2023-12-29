import React, { useState } from 'react'
import AxiosInstance from '../Config/AxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddPropertyForm = () => {

    const [formValue, setFormValue] = useState({
        propname:'',
        state:'',
        type:'',
        propcount:'',
        propaddress:'',
    });

    const navigate = useNavigate();
    const [propImg, setPropImg] = useState('');
    
   const [selectedImage, setSelectedImage] = useState('');

    const onChange = (e) => {        
        setFormValue({...formValue, [e.target.name]:e.target.value });        
    }

    const addFileData = (e) => {        
        setPropImg(e.target.files[0]);
        e.target?.files[0]? setSelectedImage(URL?.createObjectURL(e.target?.files[0]) ?? null):setSelectedImage(null);
        
    }

    const addProperty = () => {            
        let fileData = new FormData();                            //changing the data into formdata format
        fileData.append('image', propImg);
        AxiosInstance.post('/admin/addProperty',fileData,{params:formValue},{headers:{"Content-Type" : 'multipart/form-data'}}).then((res) => {
            toast.success('Property added');
            navigate('/home');
        }).catch((err) => {
            console.log(err);
            toast.error('Property couldn\'t be Added');
        })
        
     }


  return (
    <div className='container my-5'>
        <form className="row gx-3 gy-2 align-items-center">
        <div className="col-sm-6">
            <label htmlFor="propname" className='mb-3'>Property Name</label>
            <input type="text" value={formValue.propname} onChange={onChange} className="form-control" id="propname" name="propname" placeholder="Enter Property Name"/>
        </div>
        <div className="col-sm-6">
            <label htmlFor="state" className='mb-3'>State</label>
            <select value={formValue.state} onChange={onChange} className="form-select" id="state" name="state">
            <option selected>Choose the state</option>
            <option value="dubai">Dubai</option>
            <option value="abu dhabi">Abu Dhabi</option>
            <option value="sharjah">Sharjah</option>
            </select>
        </div>
        <div className="col-sm-6">
            <label htmlFor="type" className='my-3'>Unit Type</label>
            <select value={formValue.type} onChange={onChange} className="form-select" id="type" name="type">
            <option selected>Choose the type</option>
            <option value="apartments">Apartments</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            </select>
        </div>
        <div className="col-sm-6">
            <label htmlFor="propcount" className='my-3'>Available Number of Units</label>
            <input type="number" onChange={onChange} value={formValue.propcount} className="form-control" id="propcount" name="propcount" placeholder="Available Number of Units" />
        </div>
        <div className="col-12">
            <label htmlFor="propaddress" className='my-3'>Location Address</label>
            <textarea className="form-control" onChange={onChange} value={formValue.propaddress} id="propaddress" name="propaddress" placeholder="Enter Property Address" />
        </div>
        <div className="col-12">
            <label htmlFor="propimage" className='my-3'>Property Featured Image</label>
            <input type="file" onChange={addFileData} className="form-control" id="propimage" name="propimage" placeholder="Upload Property Featured Image" />
            {selectedImage && <img src={selectedImage} style={{height: 'auto',width: '300px', marginTop:'30px'}}></img>}
        </div>
        
        {/* <div className="col-12">    
            <label className='my-3'>Budget</label>
            <div className='inputGroup'>
                <input type="number" className="form-control" id="minbudget" name="minbudget" placeholder="Min Budget" />
                <input type="number" className="form-control" id="maxbudget" name="maxbudget" placeholder="Max Budget" />
            </div>    
        </div> */}
        <div className="col-auto d-flex" style={{gap:'30px'}}>
            <button type="submit" className="btn primaryBtn mt-4" onClick={addProperty}>Submit</button>
            <button type="reset" className="btn btn-primary mt-4">Reset</button>
        </div>
        </form>        
    </div>
    
  )
}

export default AddPropertyForm