interface IProps {
    isActive: boolean;
    hMaxValue: number;
    yMinValue: number;
    dur: number;
    index: number;
}

export default function Item({ dur, hMaxValue, isActive, yMinValue, index }: IProps) {
    return (
        <rect x={index * 5} y="6.5" width="2" height={2} fill="currentColor">
            {
                isActive ? <>
                    <animate attributeName="height" values={`2;${hMaxValue};2`} dur={dur} repeatCount="indefinite" />
                    <animate attributeName="y" values={`6.5;${yMinValue};6.5`} dur={dur} repeatCount="indefinite" />
                </> : ""
            }
        </rect>
    )
}
