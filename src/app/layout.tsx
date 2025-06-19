// app/layout.tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import WrapperComponent from "./components/WraperComponent";
import { ClerkProvider } from "@clerk/nextjs";

const be_Vietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Gym Management",
  description: "Fitness supplements and management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${be_Vietnam.variable} antialiased`}  cz-shortcut-listen="true">
          <WrapperComponent>{children}</WrapperComponent>
        </body>
      </html>
    </ClerkProvider>
  );
}