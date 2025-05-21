import Image from "next/image";
import classes from "./style.module.css";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className={classes.container}>
            <div className={classes.frame}>
                <Image src={"/images/notFound.svg"} alt="Not found" width={400} height={400} priority />
                {/* <h1>Page not found</h1> */}
                <h1>This site on development!</h1>
                <button>
                    <Link href={"/"}>
                        Home
                    </Link>
                </button>
            </div>
        </div>
    )
}