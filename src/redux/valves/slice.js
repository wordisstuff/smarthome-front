import { createSlice } from '@reduxjs/toolkit';
import {
    getValvesStatus,
    valvesTogle,
    startValveTimer,
    stopValve,
} from './operation';

const valvesSlice = createSlice({
    name: 'valves',
    initialState: {
        valves: { valve1: false, valve2: false },
        activeSessions: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getValvesStatus.fulfilled, (state, action) => {
                state.valves.valve1 = action.payload.data.relay1;
                state.valves.valve2 = action.payload.data.relay2;
                state.activeSessions = action.payload.activeSessions || [];
            })

            .addCase(valvesTogle.fulfilled, (state, action) => {
                if (action.payload.relay === 1)
                    state.valves.valve1 = action.payload.state;
                if (action.payload.relay === 2)
                    state.valves.valve2 = action.payload.state;
            })

            .addCase(startValveTimer.fulfilled, (state, action) => {
                if (action.payload.relay === 1) state.valves.valve1 = true;
                if (action.payload.relay === 2) state.valves.valve2 = true;
            })

            .addCase(stopValve.fulfilled, (state, action) => {
                if (action.payload.relay === 1) state.valves.valve1 = false;
                if (action.payload.relay === 2) state.valves.valve2 = false;
                state.activeSessions = state.activeSessions.filter(
                    session => session.relay !== action.payload.relay,
                );
            });
    },
});

export const valvesReducer = valvesSlice.reducer;
