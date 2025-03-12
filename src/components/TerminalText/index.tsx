import { FC } from 'react';
import { Text } from '@react-three/drei';

interface TerminalTextProps {
    fullText: string;
    typingSpeed?: number;
    position?: [number, number, number];
}

const TerminalText: FC<TerminalTextProps> = ({
    fullText,
    position = [0, 0, 0]
}) => {
    return (
        <Text
            position={position}
            // font='/fonts/Orbitron_Regular.json'
        >{fullText}</Text>
    );
};

export default TerminalText;