import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITerminalSys {
    // --- Система ---
    systemLines: string[];
    sysLineIndex: number;
    sysTypedText: string;
    printingSystem: boolean;

    // --- Пользовательский ввод ---
    userInput: string;
    isTyping: boolean;

    // --- Мигание карета ---
    blinkOn: boolean;
}

const initialState: ITerminalSys = {
    printingSystem: true,
    sysLineIndex: 0,
    systemLines: [],
    sysTypedText: "",

    userInput: "",
    isTyping: false,

    blinkOn: true
}

export const termianlSysSlice = createSlice({
    name: "terminalSys",
    initialState,
    reducers: {
        setSysTypedText: (state, action: PayloadAction<string>) => {
            state.sysTypedText = action.payload;
        },
        setSysLineIndex: (state, action: PayloadAction<number>) => {
            state.sysLineIndex = action.payload;
        },
        setSysLine: (state, action: PayloadAction<string[]>) => {
            state.systemLines = action.payload;
        },
        setIsSysTyping: (state, action: PayloadAction<boolean>) => {
            state.printingSystem = action.payload;
        },

        setUserInput: (state, action: PayloadAction<string>) => {
            state.userInput = action.payload;
        },
        setIsUserTyping: (state, action: PayloadAction<boolean>) => {
            state.isTyping = action.payload;
        },

        toggleBlink: (state) => {
            state.blinkOn = !state.blinkOn;
        }
    }
});

export default termianlSysSlice.reducer;
export const {
    setSysTypedText,
    toggleBlink,
    setIsSysTyping,
    setIsUserTyping,
    setSysLine,
    setSysLineIndex,
    setUserInput
} = termianlSysSlice.actions;