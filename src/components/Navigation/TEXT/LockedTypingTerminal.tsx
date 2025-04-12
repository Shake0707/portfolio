import CurvedScreen from './CurvedScreen';
import { useTerminalTyping } from '@/hooks/terminalTyping';

function QuestionTerminal() {
    const { finalText } = useTerminalTyping({});

    return (
        <group>
            <CurvedScreen text={finalText} />
        </group>
    );
};

export default QuestionTerminal;