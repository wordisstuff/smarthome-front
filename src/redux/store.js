import { configureStore } from "@reduxjs/toolkit";
import { valvesReducer } from "./valves/slice";

export const store = configureStore({
    reducer:{
        valves:valvesReducer,
    }
})