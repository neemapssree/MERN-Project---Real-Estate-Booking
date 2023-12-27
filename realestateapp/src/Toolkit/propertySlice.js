import { createSlice } from "@reduxjs/toolkit";


const propertySlice = createSlice({                      //Similar as [state, setState]=useState(); method
    name: 'property',
    initialState: {
        propDetails:{},
        propStatus:''
    },
    reducers:{
        setPropDetails:(state,action)=>{
            state.userDetails={name:'sample'}
        },
        setPropStatus:(state,action)=>{
            state.propStatus='sold'
        }      
    }
})

export const {setPropDetails,setPropStatus}=propertySlice.actions  //exporting reducers
export default propertySlice.reducer