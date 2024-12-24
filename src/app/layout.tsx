import type { Metadata } from "next";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/server/trpc/react";
import { Poppins } from "next/font/google";

const poppin = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "core-auth",
  description:
    "core-auth is a fullstack boilerplate with authentication using Auth.js , Next.js, tRPC and Drizzle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TRPCReactProvider>
        <body className={` ${poppin.className} antialiased`}>{children}</body>
      </TRPCReactProvider>
    </html>
  );
}
