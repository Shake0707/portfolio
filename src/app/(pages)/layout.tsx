import Header from "@/components/Header/Header";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
