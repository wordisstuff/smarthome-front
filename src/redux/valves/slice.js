import { createSlice } from "@reduxjs/toolkit";
import { getValvesStatus } from "./operation";

const valvesSlice = createSlice({
    name:'valves',
    initialState:{
        valves:{valve1:"off", valve2:"off"}
},
    reducers:{},
    extraReducers: builder => {
        builder 
        .addCase(getValvesStatus.fulfilled,(state,action)=>{
            state.valves = action.payload
        })
    }
    
})

export const valvesReducer = valvesSlice.reducer;