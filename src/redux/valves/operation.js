import { createAsyncThunk } from "@reduxjs/toolkit";
import { homeApi } from "../../utils/axios";

export const getValvesStatus = createAsyncThunk(
'valves/getStatus',
async (_,{rejectWithValue}) => {
    try{
        const {data} = await homeApi.get('valves/status')
        return data;
    }
    catch(err){
        return rejectWithValue(err.message)
    }
}
)
export const valvesTogle = createAsyncThunk(
'valves/togle',
async ({state,relay},{rejectWithValue}) => {
    try{
        const {data} = await homeApi.post(`valves?state=${state}&relay=${relay}`)
        return data;
    }
    catch(err){
        return rejectWithValue(err.message)
    }
}
)