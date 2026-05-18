import { createAsyncThunk } from '@reduxjs/toolkit';
import { homeApi } from '../../utils/axios';

export const getValvesStatus = createAsyncThunk(
    'valves/getStatus',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await homeApi.get('valves/status');
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const valvesTogle = createAsyncThunk(
    'valves/togle',
    async ({ state, relay }, { rejectWithValue }) => {
        try {
            const { data } = await homeApi.post('valves', { state, relay });
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const startValveTimer = createAsyncThunk(
    'valves/startTimer',
    async ({ relay, minutes }, { rejectWithValue }) => {
        try {
            const { data } = await homeApi.post('valves/timer', {
                relay,
                minutes,
            });

            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const stopValve = createAsyncThunk(
    'valves/stop',
    async ({ relay }, { rejectWithValue }) => {
        try {
            const { data } = await homeApi.post('valves/stop', { relay });
            return {
                relay,
                state: false,
                data,
            };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);
