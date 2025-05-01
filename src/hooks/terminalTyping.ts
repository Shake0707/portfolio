/* eslint-disable */

import { Terminal } from "@/services/terminal/terminalText.service";
import { delUserWord, setAllText, setBlinkOn, setIsSysTyping, setIsUserTyping, setSysFinalText, setSysLine, setSysLineIndex, setSysTypedText, setUserInput, setUserText, toggleBlink, toggleSingleSysIsTyping, togglIsGame } from "@/store/sileces/terminalSys";
import { store, useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useCamer } from "../utils/useCamer";
import { Vector3 } from "three";
import { ETerminalTextSysResponse, ETerminalUrls } from "@/types/terminal.type";
import { useRouter } from "next/navigation";

interface IProps {
    blinkInterval?: number;
    blinkDelay?: number;
    typingSpeed?: number;
}

const initialSystemLines = [
    "Hi, do you want to know about me?",
    `1. ${ETerminalUrls.about} me`,
    `2. My ${ETerminalUrls.tetris}`,
    `3. ${ETerminalUrls.contacts}`,
    ""
];

let redirectUrl = "";

export function useTerminalTyping({
    typingSpeed = 50,
    blinkDelay = 1000,
    blinkInterval = 500,
}: IProps): { finalText: string } {
    const {
        allText,
        printingSystem,
        sysLineIndex,
        sysTypedText,
        systemLines,
        isTyping,
        sysIsTyping,
        blinkOn,
        sysFinalText,
        userInput
    } = useAppSelector(state => state.terminalSys);
    const dispatch = useAppDispatch();
    const { startSmoothChangePos, status: cameraStatus } = useCamer({});
    const router = useRouter();
    const TerminalText = new Terminal();

    //! SYS INIT LINES
    useEffect(() => {
        if (sysLineIndex >= initialSystemLines.length) {
            dispatch(setIsSysTyping(false));
            return;
        }

        const currentFullLine = initialSystemLines[sysLineIndex];
        if (sysTypedText.length < currentFullLine.length) {
            const timer = setTimeout(() => {
                dispatch(setSysTypedText(sysTypedText + currentFullLine[sysTypedText.length]));
            }, typingSpeed);
            return () => clearTimeout(timer);
        } else {
            dispatch(setSysLine([...systemLines, sysTypedText]));
            dispatch(setSysTypedText(''));
            dispatch(setSysLineIndex(sysLineIndex + 1));
        }
    }, [sysLineIndex, sysTypedText, typingSpeed]);

    const allSystemText = [...systemLines];

    const stillPrintingSystemLine = sysLineIndex < initialSystemLines.length && sysTypedText;
    if (stillPrintingSystemLine) {
        allSystemText.push(sysTypedText);
    }
    useEffect(() => {
        if (printingSystem) {
            dispatch(setAllText(allSystemText.join('\n')));
        } else {
            dispatch(setAllText(allText.trim() + "\n \n"));
        }
    }, [printingSystem, sysTypedText]);
    //! SYS INIT LINES

    //! SYS single text
    useEffect(() => {
        if (sysFinalText) {
            dispatch(setUserText(""));
            dispatch(setUserInput("\n \n"));
            dispatch(toggleSingleSysIsTyping());

            // WRITE
            let ind = 0;
            const timer = setInterval(() => {
                if (ind < sysFinalText.length) {
                    dispatch(setUserInput(sysFinalText[ind]));
                    ind++;
                } else {
                    clearInterval(timer);
                }
            }, typingSpeed);

            //! LOGICK FOR NEXT page
            if (sysFinalText === ETerminalTextSysResponse.ifCorrect) {
                setTimeout(() => {
                    startSmoothChangePos(new Vector3(30, 20, 10));
                    document.getElementById("overlayForChangeZoom")!.style.display = "block";

                    setTimeout(() => {
                        router.push(redirectUrl);
                        redirectUrl = "";
                    }, 1000);
                }, 1000);
            } else if (sysFinalText === ETerminalTextSysResponse.ifGame) {
                // startSmoothChangePos(new Vector3(10.5, 7, 4));
                
                setTimeout(() => {
                    dispatch(togglIsGame());
                }, 1700);
            }
            //! LOGICK FOR NEXT page

            dispatch(setSysFinalText(""));

            // DELETE
            setTimeout(() => {
                const deleteLineIndex = allText.lastIndexOf(initialSystemLines[4]) - userInput.length;
                const interval = setInterval(() => {
                    const text = store.getState().terminalSys.allText;
                    if (text.length > deleteLineIndex) {
                        dispatch(delUserWord());
                    } else {
                        clearInterval(interval);
                        dispatch(toggleSingleSysIsTyping());
                    }
                }, typingSpeed);
            }, 3000);
        }
    }, [sysFinalText]);
    //! SYS single text

    //! CORRET ANIMATION ENABLE OR DISABLE
    useEffect(() => {
        if (isTyping) {
            dispatch(setBlinkOn(true));
        }
        if (!printingSystem && !isTyping && !sysIsTyping) {
            const timer = setInterval(() => {
                dispatch(toggleBlink());
            }, blinkInterval);
            return () => clearInterval(timer);
        }
    }, [printingSystem, blinkInterval, isTyping, sysIsTyping]);
    //! CORRET ANIMATION ENABLE OR DISABLE

    //!USER
    const typingTimeoutRef = useRef<NodeJS.Timeout>(null);
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (printingSystem) return;

            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

            dispatch(setIsUserTyping(true));

            typingTimeoutRef.current = setTimeout(() => {
                dispatch(setIsUserTyping(false));
            }, blinkDelay);

            const currentUserInput = store.getState().terminalSys.userInput;

            if (e.key === 'Enter') {
                const userText = currentUserInput.trim();
                TerminalText.setAnswer(userText);
                dispatch(setSysFinalText(TerminalText.system));
                redirectUrl = TerminalText.redirectUrl as string;
            } else if (e.key === 'Backspace') {
                if (currentUserInput.length === 0) return;
                dispatch(delUserWord());
            } else if (e.key.length === 1) {
                if (currentUserInput.length === 32) return;
                dispatch(setUserInput(e.key));
                dispatch(setUserText(currentUserInput + e.key));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
    }, [printingSystem, blinkDelay]);
    //!USER

    return { finalText: allText + (blinkOn ? "|" : "") }
}