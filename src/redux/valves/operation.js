import { createAsyncThunk } from '@reduxjs/toolkit';
import { homeApi } from '../../utils/axios';

export const getValvesStatus = createAsyncThunk(
    'valves/getStatus',
    async (_, { rejectWithValue }) => {
        try {
            console.log('getValvesStatus');
            const { data } = await homeApi.get('valves/status');
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);
export const valvesTogle = createAsyncThunk(
    'valves/togle',
    async ({ state, relay }, { rejectWithValue }) => {
        try {
            const { data } = await homeApi.post(`valves`, { state, relay });
            console.log(data);
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);
