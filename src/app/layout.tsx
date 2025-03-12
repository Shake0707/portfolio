import type { Metadata } from "next";
import { Orbitron, Rajdhani, 
  // Press_Start_2P
 } from "next/font/google";
import "./globals.css";


//? for terminal text
// const pressStart2P = Press_Start_2P({
//   subsets: ["latin"],
//   weight: "400",
// })

//? for futuristic text
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

//? for common text
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Shakh's Portfolio",
  description: "Shakh's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.className} ${orbitron.className}`}>
        {children}
      </body>
    </html>
  );
}
