import { useState, useEffect } from 'react';
import CurvedScreen from './CurvedScreen';

const initialSystemLines = [
    "Что вы хотите сделать?",
    "1. Перейти в раздел About",
    "2. Посмотреть контакты",
    "3. Открыть Skills",
    ""
];

interface QuestionTerminalProps {
    typingSpeed?: number;  
    blinkDelay?: number;
    blinkInterval?: number;
}

const QuestionTerminal: React.FC<QuestionTerminalProps> = ({
    typingSpeed = 50,
    blinkDelay = 1000,
    blinkInterval = 500,
}) => {
    // --- Система ---
    const [systemLines, setSystemLines] = useState<string[]>([]);
    const [sysLineIndex, setSysLineIndex] = useState(0);
    const [sysTypedText, setSysTypedText] = useState('');
    const [printingSystem, setPrintingSystem] = useState(true);

    // --- Пользовательский ввод ---
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // --- Мигание карета ---
    const [blinkOn, setBlinkOn] = useState(true);

    useEffect(() => {
        if (!printingSystem) {
            // Таймер мигания карета (общий для «системы» и пользователя)
            const blinkTimer = setInterval(() => {
                setBlinkOn((prev) => !prev);
            }, blinkInterval);

            return () => clearInterval(blinkTimer);
        }
    }, [blinkInterval, printingSystem]);

    // ------------------------------
    // 1. Логика печати «системы»
    // ------------------------------
    useEffect(() => {
        if (sysLineIndex >= initialSystemLines.length) {
            // Все строки системы напечатаны
            setPrintingSystem(false);
            return;
        }

        const currentFullLine = initialSystemLines[sysLineIndex];
        if (sysTypedText.length < currentFullLine.length) {
            const timer = setTimeout(() => {
                setSysTypedText((prev) => prev + currentFullLine[prev.length]);
            }, typingSpeed);
            return () => clearTimeout(timer);
        } else {
            // Закончили печатать текущую системную строку
            // Сохраняем итоговую строку в systemLines
            setSystemLines((prev) => [...prev, sysTypedText]);
            // Сбрасываем sysTypedText
            setSysTypedText('');
            setSysLineIndex((prev) => prev + 1);
        }
    }, [sysLineIndex, sysTypedText, typingSpeed]);

    // ------------------------------
    // 2. Логика ввода пользователя
    // ------------------------------
    useEffect(() => {
        let typingTimeout: NodeJS.Timeout | null = null;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Пока система печатает — игнорируем пользовательский ввод
            if (printingSystem) return;

            setIsTyping(true);
            if (typingTimeout) clearTimeout(typingTimeout);

            typingTimeout = setTimeout(() => {
                setIsTyping(false);
            }, blinkDelay);

            if (e.key === 'Enter') {
                setUserInput((prev) => prev + '\n');
            } else if (e.key === 'Backspace') {
                setUserInput((prev) => prev.slice(0, -1));
            } else if (e.key.length === 1) {
                setUserInput((prev) => prev + e.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (typingTimeout) clearTimeout(typingTimeout);
        };
    }, [printingSystem, blinkDelay]);

    // ------------------------------
    // 3. Формируем общий текст для экрана
    // ------------------------------

    let allSystemText = [...systemLines];

    const stillPrintingSystemLine = sysLineIndex < initialSystemLines.length && sysTypedText;
    if (stillPrintingSystemLine) {
        const systemCaret = blinkOn ? '|' : '';
        allSystemText.push(sysTypedText + systemCaret);
    }

    const systemText = allSystemText.join('\n');

    let finalText = systemText;
    if (!printingSystem) {
        finalText += '\n';
        const userCaret = isTyping ? '|' : (blinkOn ? '|' : '');
        finalText += userInput + userCaret;
    }

    return (
        <group>
            <CurvedScreen text={finalText} />
        </group>
    );
};

export default QuestionTerminal;