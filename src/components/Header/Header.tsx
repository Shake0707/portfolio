"use client";

import Link from "next/link";
import classes from "./style.module.css";
import { EEndPoints } from "@/types/pages.type";
import { usePathname } from "next/navigation";

export default function Header() {
    const path = usePathname();
    console.log(path);

    return (
        <header className={classes.container}>
            <div className={classes.frame}>
                <div className={classes.links}>
                    <Link className={path.endsWith(EEndPoints.about) ? classes.active : ""}
                        href={EEndPoints.about}>About</Link>
                    <Link className={path.endsWith(EEndPoints.projects) ? classes.active : ""}
                        href={EEndPoints.projects}>Projects</Link>
                    <Link className={path.endsWith(EEndPoints.contact) ? classes.active : ""}
                        href={EEndPoints.contact}>Contact me</Link>
                </div>
            </div>
        </header>
    )
}
