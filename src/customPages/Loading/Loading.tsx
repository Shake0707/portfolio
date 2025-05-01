"use client";

import { useEffect, useState } from "react";
import classes from "./style.module.css";

interface IProps {
    isCanvasLoader?: boolean;
    progress?: number;
    total?: number;
}

export default function LoadingComponent({ isCanvasLoader, progress, total }: IProps) {
    const [isClose, setIsClose] = useState<boolean>(false);

    useEffect(() => {
        if (total) {
            if (isCanvasLoader && progress === 100) {
                setIsClose(true);
            }
        } else {
            setIsClose(true);
        }
    }, [progress, isCanvasLoader, total]);

    return (
        <div className={isClose ? classes.container + " " + classes.close : classes.container}>
            <div className={classes.frame}>
                <div className={classes.loader}></div>
                <h1>Loading objects {progress}%</h1>
                <div className={classes.loader}></div>
            </div>
        </div>
    )
}
