import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITerminalSys {
    allText: string;

    // --- System init ---
    systemLines: string[];
    sysLineIndex: number;
    sysTypedText: string;
    printingSystem: boolean;

    // --- System --- 
    sysFinalText: string;
    sysIsTyping: boolean;

    // --- user ---
    userInput: string;
    isTyping: boolean;

    // --- Corret ---
    blinkOn: boolean;
}

const initialState: ITerminalSys = {
    allText: "",
    printingSystem: true,
    sysLineIndex: 0,
    systemLines: [],
    sysTypedText: "",

    sysFinalText: "",
    sysIsTyping: false,

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
            state.allText += action.payload;
        },
        setUserText: (state, action: PayloadAction<string>) => {
            state.userInput = action.payload;
        },
        delUserWord: (state) => {
            state.allText = state.allText.slice(0, -1);
            state.userInput = state.userInput.slice(0, -1);
        },
        setIsUserTyping: (state, action: PayloadAction<boolean>) => {
            state.isTyping = action.payload;
        },

        toggleBlink: (state) => {
            state.blinkOn = !state.blinkOn;
        },

        //! All txt
        setAllText: (state, action: PayloadAction<string>) => {
            state.allText = action.payload;
        },
        setBlinkOn: (state, action: PayloadAction<boolean>) => {
            state.blinkOn = action.payload;
        },
        //! All txt

        //! Single typing
        toggleSingleSysIsTyping: (state) => {
            state.sysIsTyping = !state.sysIsTyping;
        },

        setSysFinalText: (state, action: PayloadAction<string>) => {
            state.sysFinalText = action.payload;
        }
        //! Single typing
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
    setUserInput,
    toggleSingleSysIsTyping,
    setSysFinalText,
    setAllText,
    delUserWord,
    setBlinkOn,
    setUserText
} = termianlSysSlice.actions;