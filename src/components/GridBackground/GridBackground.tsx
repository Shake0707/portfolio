import { ReactNode } from 'react'
import classes from "./style.module.css";

export default function GridBackground({ children }: { children: ReactNode }) {
    return (
        <div className={classes.overlay}>
            {children}
            <div className={classes.circle}></div>
        </div>
    )
}
