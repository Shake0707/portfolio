import { configureStore } from "@reduxjs/toolkit";
import { termianlSysSlice } from "./sileces/terminalSys";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        terminalSys: termianlSysSlice.reducer
    }
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;