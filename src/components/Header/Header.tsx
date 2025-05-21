"use client";

import Link from "next/link";
import classes from "./style.module.css";
import { EEndPoints } from "@/types/pages.type";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Volume from "../Volume/Volume";

export default function Header() {
    const path = usePathname();
    return (
        <header className={classes.container}>
            <div className={classes.frame}>
                <div className={classes.logo}>
                    <Link href="/">
                        <Image src={"/images/logo.png"} alt="" width={0} height={0} style={{
                            width: "100%",
                            height: "100%",
                        }}
                            unoptimized
                        />
                    </Link>
                </div>
                <div className={classes.links}>
                    <Link className={path.endsWith(EEndPoints.about) ? classes.active : ""}
                        href={EEndPoints.about}>About</Link>
                    <Link className={path.endsWith(EEndPoints.projects) ? classes.active : ""}
                        href={EEndPoints.projects}>Projects</Link>
                    <Link className={path.endsWith(EEndPoints.contact) ? classes.active : ""}
                        href={EEndPoints.contact}>Contact me</Link>
                </div>
                <div className={classes.right}>
                    <Volume />
                </div>
            </div>
        </header>
    )
}
