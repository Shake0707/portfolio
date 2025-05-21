import Home from '@/customPages/Home/Home';
import { userAgent } from 'next/server';
import { headers } from "next/headers";

export default async function HomePage() {
  const { device } = userAgent({ headers: await headers() });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";

  return <Home deviceType={deviceType} />;
}