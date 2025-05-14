import { createSlice } from '@reduxjs/toolkit';
import { getValvesStatus, valvesTogle } from './operation';

const valvesSlice = createSlice({
    name: 'valves',
    initialState: {
        valves: { valve1: false, valve2: false },
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getValvesStatus.fulfilled, (state, action) => {
                console.log(action.payload.relay1);
                console.log(action.payload.relay2);
                state.valves.valve1 =
                    action.payload.relay1 === 'on' ? true : false;
                state.valves.valve2 =
                    action.payload.relay2 === 'on' ? true : false;
            })
            .addCase(valvesTogle.fulfilled, (state, action) => {
                state.valves.valve1 =
                    action.payload.relay1 === 'on' ? true : false;
                state.valves.valve2 =
                    action.payload.relay2 === 'on' ? true : false;
            });
    },
});

export const valvesReducer = valvesSlice.reducer;
