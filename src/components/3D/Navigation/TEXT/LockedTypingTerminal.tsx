import { useAppSelector } from '@/store/store';
import CurvedScreen from './CurvedScreen';
import { useTerminalTyping } from '@/hooks/terminalTyping';
import TetrisGame from '@/components/Tetris/TetrisGame';

function QuestionTerminal() {
    const { finalText } = useTerminalTyping({});
    const isGame = useAppSelector(state => state.terminalSys.isGame);

    return (
        <group>
            {
                isGame ? <TetrisGame /> : <CurvedScreen text={finalText} />
            }
        </group>
    );
};

export default QuestionTerminal;