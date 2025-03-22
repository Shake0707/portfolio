interface ITvText {
    pos: {
        x: number;
        y: number;
        z: number;
    }
    text: {
        wordVerticalWrap: number;
        maxWidth: number;
        pos: {
            x: number;
            y: number;
        }
    }
}

export const TvText: ITvText = {
    pos: {
        x: 0.56,
        y: 5.66,
        z: 4.2
    },
    text: {
        wordVerticalWrap: 19,
        maxWidth: 680,
        pos: {
            x: 100,
            y: 65
        },
    }
}