import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';                       //will export all reducer from the file
import propReducer from './propertySlice';                   //this is not using now

export const store = configureStore({
    reducer:{
        user:userReducer,
        property:propReducer,
    }
})
