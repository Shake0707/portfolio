import { useEffect, FC } from 'react';
import CurvedScreen from './CurvedScreen';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
    setIsSysTyping,
    setIsUserTyping,
    setSysLine,
    setSysLineIndex,
    setSysTypedText,
    setUserInput,
    toggleBlink
} from '@/store/sileces/terminalSys';
// import { useRouter } from 'next/navigation';

const initialSystemLines = [
    "Что вы хотите сделать?",
    "1. Перейти в раздел About",
    "2. Посмотреть контакты",
    "3. Открыть Skills",
    ""
];

// Variansts
const sysOptions = {
    vars: [1, 2, 3],
    1: "about",
    2: "contacts",
    3: "skills"
};

interface QuestionTerminalProps {
    typingSpeed?: number;
    blinkDelay?: number;
    blinkInterval?: number;
}

const QuestionTerminal: FC<QuestionTerminalProps> = ({
    typingSpeed = 50,
    blinkDelay = 1000,
    blinkInterval = 500,
}) => {
    const {
        blinkOn,
        isTyping,
        printingSystem,
        sysLineIndex,
        sysTypedText,
        systemLines,
        userInput
    } = useAppSelector(state => state.terminalSys);
    const dispatch = useAppDispatch();
    // const router = useRouter();

    useEffect(() => {
        if (!printingSystem) {
            // Таймер мигания карета (общий для «системы» и пользователя)
            const blinkTimer = setInterval(() => {
                dispatch(toggleBlink());
            }, blinkInterval);

            return () => clearInterval(blinkTimer);
        }
    }, [blinkInterval, printingSystem]);

    // ------------------------------
    // 1. Логика печати «системы»
    // ------------------------------
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
            // Закончили печатать текущую системную строку
            // Сохраняем итоговую строку в systemLines
            dispatch(setSysLine([...systemLines, sysTypedText]));
            // Сбрасываем sysTypedText
            dispatch(setSysTypedText(''));
            dispatch(setSysLineIndex(sysLineIndex + 1));
        }
    }, [sysLineIndex, sysTypedText, typingSpeed]);

    // ------------------------------
    // 2. Логика ввода пользователя
    // ------------------------------

    useEffect(() => {
        let typingTimeout: NodeJS.Timeout | null = null;

        function handleKeyDown(e: KeyboardEvent) {
            if (printingSystem) return;

            typingTimeout = setTimeout(() => {
                console.log("ASDASD");
                dispatch(setIsUserTyping(false));
            }, blinkDelay);

            dispatch(setIsUserTyping(true));
            if (typingTimeout) clearTimeout(typingTimeout);

            if (e.key === 'Enter') {
                const userVariant = +userInput.trim();
                if (userVariant && sysOptions.vars.includes(userVariant)) {

                }
            } else if (e.key === 'Backspace') {
                dispatch(setUserInput(userInput.slice(0, -1)));
            } else if (e.key.length === 1) {
                dispatch(setUserInput(userInput + e.key));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (typingTimeout) clearTimeout(typingTimeout);
        };
    }, [printingSystem, blinkDelay, userInput]);

    // ------------------------------
    // 3. Формируем общий текст для экрана
    // ------------------------------

    const allSystemText = [...systemLines];

    const stillPrintingSystemLine = sysLineIndex < initialSystemLines.length && sysTypedText;
    if (stillPrintingSystemLine) {
        const systemCaret = blinkOn ? '|' : '';
        allSystemText.push(sysTypedText + systemCaret);
    }

    const systemText = allSystemText.join('\n');

    let finalText = systemText;
    if (!printingSystem) {
        finalText += '\n';
        const userCaret = isTyping ? '|' : blinkOn ? '|' : '';
        finalText += userInput + userCaret;
    }

    return (
        <group>
            <CurvedScreen text={finalText} />
        </group>
    );
};

export default QuestionTerminal;